import * as app from 'express'
import dotenv from 'dotenv'
dotenv.config()

import controllers from '../../controllers/index.js'

const { Router } = app
const { studentController } = controllers

const router = Router()

// student creating endpoint
router.post('/',(req, res)=>{

    studentController.create(req, res)
})

// findlist endpoint
router.get('/',(req, res) => {
    studentController.findList(req, res)
})

// student update endpoint
router.patch('/:id',(req, res) => {
    studentController.update(req, res)
})

// student deleting endpoint
router.delete('/:id',(req, res) => {
    studentController.delete(req, res)
})
export default router