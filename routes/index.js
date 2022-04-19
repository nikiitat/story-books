import { Router } from 'express'

import { ensureAuth, ensureGuest } from '../middleware/auth.js'
import Story from '../models/Story.js'

const router = new Router()

router.get('/', ensureGuest, (req, res) => {
    res.render('Login', { layout: 'login' })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

export default router
