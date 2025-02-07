const express = require('express');
const blog = require('../models/blog.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let blogs = await blog.find();
        if (blogs.length === 0) {
            console.error('no blogs found')
        }
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

router.post('/', async (req, res) => {
    try {
        const newblog = new blog(req.body);
        let response = await newblog.save()
        res.status(201).json(response)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        let update = await blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!update) res.status(404).json({ message: 'blog not found' })
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let deletee = await blog.findByIdAndDelete(req.params.id);
        if (!deletee) res.status(404).json({ message: 'blog not found' });
        res.status(200).json(deletee)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router