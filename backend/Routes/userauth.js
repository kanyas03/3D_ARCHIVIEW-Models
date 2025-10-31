import express from 'express';
import multer from 'multer';
import Model from '../model/Model.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userauth = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname
        cb(null, uniqueName)
    }
});

const upload = multer({ storage: storage });

userauth.post("/upload", upload.single("model"), async (req, res) => {
    try {
        const { title, description } = req.body
        const file = req.file

        if (!file) {
            return res.status(400).json({ error: "No model file uploaded" })
        }

        const newModel = new Model({
            title,
            description,
            fileData: file.filename,
            fileType: file.mimetype
        })

        await newModel.save()
        res.status(201).json({ message: "Model uploaded successfully", id: newModel._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


userauth.get("/model/:id", async (req, res) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) return res.status(404).json({ error: "Model not found" });

        const filePath = path.join(__dirname, "../upload", model.fileData);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found on server" });
        }

        res.set("Content-Type", model.fileType);
        fs.createReadStream(filePath).pipe(res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


userauth.get("/models", async (req, res) => {
    try {
        const models = await Model.find().select("-__v");
        res.status(200).json(models);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export { userauth }