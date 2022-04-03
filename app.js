import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { engine } from 'express-handlebars';
import path from 'path'

import connectDB from './config/db.js'
import router from './routes/index.js'

dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

const __dirname = new URL('.', import.meta.url).pathname
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))