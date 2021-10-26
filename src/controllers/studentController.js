import {studentService} from '../services'
import { PrismaClient } from '@prisma/client'



export default class StudentController{


    /**
	 * create - student creating
	 * method: POST
	 * path: /v2/students	 	 
	 */ 
    static create(req, res) {

        try {

            const { name } = req.body
            const prisma = new PrismaClient()
            const student = studentService.create({name},prisma)
            prisma.$disconnect()
            
            // create response
			const response = {
				success: true,
				data: {
					student,
				},
			}
			res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

   /**
	 * findList - student list
	 * method: GET
	 * path: /v2/students	 	 
	 */ 
    static async findList(req, res) {
        
     
        try{

            const { name } = req.query
    
            // get student list
            const prisma = new PrismaClient()

            const students = await studentService.findList({keyword:name},prisma)
            prisma.$disconnect()
    
            // create response
            const response = {
                success: true,
                data: {
                    total: students.count,
                    students:students.rows
                }
            }
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

    /**
	 * update - student update
	 * method: PATCH
	 * path: /v2/students/:id	 	 
	 */ 
    static async update(req, res) {
        const { language } = req.locale

        try {
            const { id, changeName } = req.params
            const prisma = new PrismaClient()

            const updateStudent = await studentService.updateById(id,{
                name:changeName
            },prisma)
            prisma.$disconnect()

            // create response
            const response = {
                success: true,
                data: {
                    student: updateStudent
                }
            }
            res.send(response)
        } catch(e) {
            res.send(e)
        }
    }

    /**
	 * delete - student deleting
	 * method: DELETE
	 * path: /v2/students/:id	 	 
	 */
     static async delete(req, res) {
		const { language } = req.locale

		try {
			
			const { id } = req.params

			
			// deleting student info
            const prisma = new PrismaClient()

			await studentService.Deleting(id,prisma)
            prisma.$disconnect()

			// create response
			const response = {
				success: true,
			}

			res.send(response)
		} catch (e) {
			res.send(createErrorResponse(e, language))
		}
	}
}