const FileService = require('../services/FileService');

const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const Readable = require("stream").Readable;


let bucket;
mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});


class FileController {
     static async upload(req, res) {
        
        const readableStream = new Readable();
        readableStream.push(file.data);
        readableStream.push(null);

        let uploadStream = bucket.openUploadStream(filename, { contentType, metadata });
        readableStream.pipe(uploadStream);

        let message;
        uploadStream.on("error", () => {
            message = "Error when uploading";
            res.status(500).json({ message });
        });

        uploadStream.on("finish", async () => {
            try {
                message = "File uploaded";
                let fileInfo = await FileService.findFileById(uploadStream.id);
                res.status(201).json({ message, fileInfo });
            } catch(err) {
                res.status(500).json(err);
            }
        });
     }

    static async getFiles(req, res) {
        try {
            files = await FileService.findFilesByOwnerId(req.payload._id);
        } catch (err) {
            return res.status(500).json(err);
        }

        let message = "Sending files";
        return res.status(200).send({ files, message });        
    }
}

module.exports = FileController;