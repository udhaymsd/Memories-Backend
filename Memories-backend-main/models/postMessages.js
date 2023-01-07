const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    message: String,
    creator: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: []
})

const PostMessage = mongoose.model("postMessage", postSchema)

module.exports = PostMessage;