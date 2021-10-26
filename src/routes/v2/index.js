import { Router } from 'express'

import studentRouter from './student'
import booksRouter from './books'
import examRouter from './exam'

const router = Router()

router.use('/student',studentRouter)
router.use('/books',booksRouter)
router.use('/exam',examRouter)

export default router