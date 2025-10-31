import mongoose from 'mongoose';

const architectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    fileData: { type: String, required: true },
    fileType: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Model", architectureSchema);
