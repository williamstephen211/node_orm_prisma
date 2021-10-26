import { Router } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { booksController } from '../../controllers'

const router = Router()

// book creating endpoint
router.post('/',(req, res)=>{

    booksController.create(req, res)
})

// findlist endpoint
router.get('/',(req, res) => {
    booksController.findList(req, res)
})

// book update endpoint
router.patch('/:id',(req, res) => {
    booksController.update(req, res)
})

// book deleting endpoint
router.delete('/:id',(req, res) => {
    booksController.delete(req, res)
})