const express = require("express")

const router = express.Router()

const {find,findById,insert,update,remove,findPostComments,findCommentById,
    insertComment} = require("../data/db")

router.get("/", (req,res) =>{
    find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({message: "No posts found!"})
    })
})

router.get("/:id", (req,res) => {
    const id = Number(req.params.id)
    find()
    .then(posts => {
        const post = posts.filter(post => post.id === id)
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({message: "No post found!"})
    })
})

router.post("/", (req,res) => {
    insert(req.body)
    .then(res.status(200).json(req.body))
    .catch(err => {
        console.log(err)
    })
})

router.post("/:id/comments", (req,res) => {
    insertComment(req.body)
    .then(res.status(200).json(req.body))
    .catch(err => {
        console.log(err)
        res.status(404).json({message: "Cant post comment!"})
    })
})

router.get("/:id/comments", (req,res) => {
    findPostComments(Number(req.params.id))
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({message: "No Comments found!"})
    })
})

router.delete("/:id", (req,res) => {
    remove(Number(req.params.id))
    .then(res.status(200).json({message: "The post has been deleted!"}))
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error removing the post"})
    })
})

router.put("/:id", (req,res) => {
    const id = Number(req.params.id)
    update(id, req.body)
    .then(post => {
        res.status(200).json(req.body)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Change can not be made!"})
    })
})

module.exports = router