const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;

const fileSchema = new mongoose.Schema({
    length: { type: Number, required: true },
    chunkSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
    md5: { type: String, required: true },
    contentType: { type: String, required: true },
    metadata: {
        owner: { type: objectId, ref: "Recipe", required: true }
    }
}, { strict: false });

const chunkSchema = new mongoose.Schema({
    files_id: { type: objectId, required: true },
    n: { type: Number, required: true },
    data: { type: Buffer }
}, { strict: false });

mongoose.model("File", fileSchema, "fs.files");
mongoose.model("Chunk", chunkSchema, "fs.chunks");