import express from 'express'
import logger from 'morgan'
import routers from './routes/index.js'
import createLocaleMiddleware from 'express-locale'
import cors from 'cors'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(createLocaleMiddleware())
app.use(cors({ credentials: true }))

// routers
app.use(routers)

app.listen(/* process.env.PORT */3000, () => console.log(`App listening on port 3000`))

