import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { engine } from 'express-handlebars'
import path from 'path'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import connectDB from './config/db.js'
import router from './routes/index.js'
import auth from './routes/auth.js'
import stories from './routes/stories.js'

import { formatDate } from './utils/hbs.js'

import passConfig from './config/passport.js'

dotenv.config({ path: './config/config.env' })
passConfig(passport)

connectDB()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs', helpers: { formatDate } }))
app.set('view engine', '.hbs')

const __dirname = new URL('.', import.meta.url).pathname
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)
app.use('/auth', auth)
app.use('/stories', stories)

const PORT = process.env.PORT

app.listen(PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
