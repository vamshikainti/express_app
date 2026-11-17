import express from "express";
import fs from "fs";
const app = express();
const readData = () => {
    return JSON.parse(
        fs.readFileSync("./data/faculty.json", "utf8")
    );
};
const writeData = (data) => {
    fs.writeFileSync(
        "./data/faculty.json",
        JSON.stringify(data, null, 2),
        "utf8"
    );
};
app.use(express.json());
app.get("/faculty", (req, res) => {
    const faculty = readData();
    res.status(200).json({
        message: "All faculty fetched successfully",
        data: faculty
    });
});
app.post("/api/v1/faculty", (req, res) => {
    const faculty = readData();
    const newFaculty = {
        id: faculty.length > 0
            ? faculty[faculty.length - 1].id + 1
            : 1,
        ...req.body
    };
    faculty.push(newFaculty);
    writeData(faculty);
    res.status(201).json({
        message: "Faculty created successfully",
        data: newFaculty
    });
});
app.get("/api/v1/faculty", (req, res) => {
    const faculty = readData();
    res.status(200).json({
        message: "All faculty fetched successfully",
        data: faculty
    });
});
app.get("/api/v1/faculty/:id", (req, res) => {
    const facultyId = parseInt(req.params.id);
    const faculty = readData();
    const facultyDetails = faculty.find(
        fac => fac.id === facultyId
    );
    if (facultyDetails) {
        res.status(200).json({
            message: "Faculty details fetched successfully",
            data: facultyDetails
        });
    } else {
        res.status(404).json({
            message: "Faculty not found"
        });
    }
});
app.get("/api/v1/faculty", (req, res) => {
    const dept = req.query.dept;
    let faculty = readData();
    if (dept) {
        faculty = faculty.filter(
            fac => fac.dept === dept
        );
    }
    res.status(200).json({
        data: faculty
    });
});
app.put("/api/v1/faculty/:id", (req, res) => {
    const facultyId = parseInt(req.params.id);
    const faculty = readData();
    const index = faculty.findIndex(
        fac => fac.id === facultyId
    );
    if (index !== -1) {
        const updatedFaculty = {
            ...faculty[index],
            ...req.body
        };
        faculty[index] = updatedFaculty;
        writeData(faculty);
        res.status(200).json({
            message: "Faculty updated successfully",
            data: updatedFaculty
        });
    } else {
        res.status(404).json({
            message: "Faculty not found"
        });
    }
});
app.delete("/api/v1/faculty/:id", (req, res) => {
    const facultyId = parseInt(req.params.id);
    const faculty = readData();
    const index = faculty.findIndex(
        fac => fac.id === facultyId
    );
    if (index !== -1) {
        const deletedFaculty = faculty.splice(index, 1)[0];
        writeData(faculty);
        res.status(200).json({
            message: "Faculty deleted successfully",
            data: deletedFaculty
        });
    } else {
        res.status(404).json({
            message: "Faculty not found"
        });
    }
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});