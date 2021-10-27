import * as app from 'express'

import studentRouter from './student.js'
import booksRouter from './books.js'
import examRouter from './exam.js'

const { Router } = app

const router = Router()

router.use('/student',studentRouter)
router.use('/books',booksRouter)
router.use('/exam',examRouter)

export default router