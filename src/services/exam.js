

// import models
import { Json } from 'sequelize/types/lib/utils'
import { Exam } from '../models'


// singleton instance
let instance = null

class ExamService {
    constructor() {
        if (!instance) {
            console.log('ExamService Create' + this)
        }
        return instance
    }

    // exam create
    async create(info,prisma) {

        return await prisma.exam.create({data:info}) // info - {sId, bId}
     }

    // student findlist
    async findList({orderBy = 'desc',isDeleted = false,studentId,bookId},prisma) { // sId, bId
        // query options 
        let options  = {
            order: [['id',orderBy]],
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                sId: studentId,bId: bookId
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options))
        
        return await prisma.exam.findAndCountAll(options)
    }

    async findById(id) {
		return await Exam.findUnique({where:{id}})
	}

    async updateById(id, uInfo,prisma) {
        
		const {studentId, bookId} = uInfo
        const info = {sId: studentId ? studentId : undefined, bId: bookId ? bookId : undefined}

        // removing undefine
        const realInfo = JSON.parse(JSON.stringify(info))

		// update user
		const updateExam = await prisma.books.update( {
			where: { id, isDeleted: false },data:realInfo,
		})

		

		// return updated Exam
		return updateExam
	}

    async count(where,prisma) {
		const count = await prisma.exam.count({
			where,
		})
		return count
	}

    async Deleting(id,prisma) {
		const book = await prisma.exam.findUnique({where:{id}})

		// [ERROR] Exam_NOT_FOUND
		if (book === null) throw Error('Exam_NOT_FOUND')

		// [ERROR] Exam_DELETED
		if (book.isDeleted) throw Error('Exam_DELETED')

		

		// deleting exam in Exam
		await prisma.exam.delete({where: { sId: id}})

	}
}
export default ExamService()