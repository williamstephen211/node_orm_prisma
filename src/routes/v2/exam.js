import * as app from 'express'
import dotenv from 'dotenv'
dotenv.config()

import controllers from '../../controllers/index.js'
const { Router } = app
const { examController } = controllers

const router = Router()

// exam creating endpoint
router.post('/',(req, res)=>{

    examController.create(req, res)
})

// findlist endpoint
router.get('/',(req, res) => {
    examController.findList(req, res)
})

// exam update endpoint
router.patch('/:id',(req, res) => {
    examController.update(req, res)
})

// exam deleting endpoint
router.delete('/:id',(req, res) => {
    examController.delete(req, res)
})
export default router