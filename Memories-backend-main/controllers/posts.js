const mongoose = require("mongoose");
const PostMessage = require("../models/postMessages");

const getPosts = async(req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ message: error.message })
    }
}

const createPost = async(req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error.message)
        res.status(409).json({ message: error.message })
    }
}

const updatePost = async(req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send("No post found with that Id");
    }
    const response = await PostMessage.findByIdAndUpdate(id, updateData, { new: true });
    res.json(response);
}

const deletePost = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send("No post found with that Id");
    }
    const response = await PostMessage.findByIdAndDelete(id);
    res.json(response);
}

const likePost = async(req, res) => {
    const id = req.params.id;
    const likeType = req.body.type;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send("No post found with that Id");
    }

    const updateLikeCount = await PostMessage.findById(id);
    likeType === "LIKE" ? updateLikeCount.likeCount++ : updateLikeCount.likeCount--;

    const response = await PostMessage.findByIdAndUpdate(id, updateLikeCount, { new: true })
    res.json(response);
}

module.exports = { getPosts, createPost, updatePost, deletePost, likePost }