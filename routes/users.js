const { Router } = require('express')
const User = require('../models/user')
const Text = require('../models/text')
const router = Router()

router.get('/user', async (req, res) => {
    const foundUser = await User.findOne({ name: req.query.name })
    const foundText = await Text.findOne({user_id: req.query.user_id})
    
    res.render('user', {
        title: 'User',
        isUser: true,
        foundUser,
        foundText
    })
})

router.get('/users', async (req, res) => {
    const users = await User.find({})
    const texts = await Text.find({})

    res.render('users', {
        title: 'Users',
        isUsers: true,
        users,
        texts
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create User',
        isCreate: true
    })
})

router.get('/create_text', (req, res) => {
    res.render('create_text', {
        title: 'Create text',
        isCreateText: true
    })
})

router.post('/create', async (req, res) => {
    const user = new User({
        name: req.body.name
    })

    await user.save()

    res.redirect('/users')
})

router.post('/create_text', async (req, res) => {
    const text = new Text({
        user_id: req.body.user_id,
        text: req.body.text
    })

    await text.save()

    res.redirect('/users')
})

module.exports = router