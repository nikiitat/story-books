import { Router } from "express";

import { ensureAuth, ensureGuest } from "../middleware/auth.js";

const router = Router()

router.get('/', ensureGuest, (req, res) => {
    res.render('Login', { layout: 'login' })
})

router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard')
})

export default router