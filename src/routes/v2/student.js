import { Router } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { studentController } from '../../controllers'

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