import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.render('Login', { layout: 'login' })
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

export default router