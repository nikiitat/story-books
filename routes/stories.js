import { Router } from 'express'

import { ensureAuth } from '../middleware/auth.js'
import Story from '../models/Story.js'

const router = new Router()

router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        console.log(req.body)
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

export default router
