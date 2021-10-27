import services from '../services/index.js'
import prismaClient from '@prisma/client'

const { PrismaClient } = prismaClient

const {booksService} = services

export default class BooksController{


    /**
	 * create - book creating
	 * method: POST
	 * path: /v2/books	 	 
	 */ 
    static async create(req, res) {

        try {

            const { studentId,title } = req.body
            
            const prisma = new PrismaClient()
            const book = await booksService.create(studentId,title,prisma)
            prisma.$disconnect()

            // create response
			const response = {
				success: true,
				data: {
					book,
				},
			}
			res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

   /**
	 * findList - book list
	 * method: GET
	 * path: /v2/books	 	 
	 */ 
    static async findList(req, res) {
        
     
        try{

            const { title,studentId } = req.query
            // get book list
            console.log(title,studentId)
            const prisma = new PrismaClient()
            const books = await booksService.findList({title,studentId},prisma)
            prisma.$disconnect()
    
            // create response
            const response = {
                success: true,
                data: {
                    total: books.length,
                    books:books
                }
            }
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

    /**
	 * update - book update
	 * method: PATCH
	 * path: /v2/books/:id	 	 
	 */ 
    static async update(req, res) {
       
        try {
            const { id } = req.params
            const { studentId, title} = req.body
            const prisma = new PrismaClient()
            const updateBooks = await booksService.updateById(id,
                {studentId,title},prisma
            )
            prisma.$disconnect()
            // create response
            const response = {
                success: true,
                data: {
                    books: updateBooks
                }
            }
            res.send(response)
        } catch(e) {
            res.send(e)
        }
    }

    /**
	 * delete - book deleting
	 * method: DELETE
	 * path: /v2/books/:id	 	 
	 */
     static async delete(req, res) {
		
		try {
			
			const { id } = req.params

			
			// deleting book info
            const prisma = new PrismaClient()
			await booksService.Deleting(id,prisma)
            prisma.$disconnect()

			// create response
			const response = {
				success: true,
			}

			res.send(response)
		} catch (e) {
			res.send(e)
		}
	}
}