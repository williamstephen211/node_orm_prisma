import services from '../services/index.js'
import prismaClient from '@prisma/client'

const { PrismaClient } = prismaClient

const { examService } = services
export default class ExamController{


    /**
	 * create - exam creating
	 * method: POST
	 * path: /v2/exam	 	 
	 */ 
    static create(req, res) {

        try {

            const { studentId,bookId } = req.body
            
            const prisma = new PrismaClient()
            const exam = examService.create({sId:parseInt(studentId),bId:parseInt(bookId)},prisma)
            prisma.$disconnect()


            // create response
			const response = {
				success: true,
				data: {
					exam,
				},
			}
			res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

   /**
	 * findList - exam list
	 * method: GET
	 * path: /v2/exam	 	 
	 */ 
    static async findList(req, res) {
        
     
        try{

            const { studentId,bookId } = req.body
            
            // get exam list
            const prisma = new PrismaClient()
            const exam = await examService.findList({studentId,bookId},prisma)
            prisma.$disconnect()
            // create response
            const response = {
                success: true,
                data: {
                    total: exam.length,
                    exam:exam
                }
            }
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

    /**
	 * update - exam update
	 * method: PATCH
	 * path: /v2/exam/:id	 	 
	 */ 
    static async update(req, res) {
        
        try {
            const { id } = req.params
            const { studentId, bookId } = req.body

            const prisma = new PrismaClient()
            const updateBooks = await examService.updateById(id,{
                studentId, bookId
            },prisma)
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
	 * delete - exam deleting
	 * method: DELETE
	 * path: /v2/exam/:id	 	 
	 */
     static async delete(req, res) {
		
		try {
			
			const { id } = req.params

			
			// deleting exam info
            const prisma = new PrismaClient()
			await examService.Deleting(id,prisma)
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