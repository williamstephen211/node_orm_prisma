
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

        return await prisma.exams.create({data:info}) // info - {sId, bId}
     }

    // student findlist
    async findList({orderBy = 'desc',studentId,bookId},prisma) { // sId, bId
        
        // query options 
        
        let options  = {
            orderBy: {'id': orderBy},
            where:{
                
                sId: studentId ? parseInt(studentId) : undefined,
                bId: bookId ? parseInt(bookId) : undefined
            }
        }
        console.log(studentId,bookId)
        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options.where))
        return await prisma.exams.findMany(options)
    }

    async findById(id) {
		return await prisma.exam.findUnique({where:{id:parseInt(id)}})
	}

    async updateById(id, uInfo,prisma) {
        
		const {studentId, bookId} = uInfo
        const info = {sId: studentId ? parseInt(studentId) : undefined, bId: bookId ? parseInt(bookId) : undefined}

        // removing undefine
        const data = JSON.parse(JSON.stringify(info))

		// update user
		const updateExam = await prisma.exams.update( {
			where: { id:parseInt(id)},data,
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
				

		// deleting exam in Exam
		await prisma.exams.delete({where: { id: parseInt(id) }})

	}
}
export default new ExamService()