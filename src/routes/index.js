import * as app from 'express'

import v2Router from './v2/index.js'
const { Router } = app
const router = Router()

// app

router.use('/v2', v2Router)

export default router