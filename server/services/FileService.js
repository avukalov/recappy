const mongoose = require("mongoose");
const File = mongoose.model("File");
const Chunk = mongoose.model("Chunk");

const objectId = mongoose.Types.ObjectId;

class FileService {
    static async findFileById(id) {
        let _id = objectId(id);
        return await File.findOne({ _id }).exec();
    }

    static async findFilesByOwnerId(id) {
        return await File.find({ "metadata.recipe": id}).exec();
    }
}

module.exports = FileService;