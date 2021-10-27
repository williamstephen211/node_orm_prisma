

// singleton instance
let instance = null

class StudentService {
    constructor() {
        if (!instance) {
            console.log('StudentService Create' + this)
        }
        return instance
    }

    // student create
    async create(user,prisma) {

        return await prisma.students.create({data:user})
    }

    // student findlist
    async findList({keyword,orderBy = 'desc',isDeleted = false},prisma) { // keyword -- name
        // query options 
        let options  = {
            orderBy: {'id':orderBy},
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                name:{contains:keyword ? keyword : undefined}
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options.where))        
        const result = await prisma.students.findMany(options)
        
        return result
    }

    async findById(id,prisma) {
		return await prisma.student.findUnique({where:{id}})
	}

    async updateById(id, student, prisma) {
		
        
		// update user
		const updateData = await prisma.students.update({
			where: { id: parseInt(id) },
            data: { name: student }
		})
		// return updated user
		return updateData
	}

    async count(where,prisma) {
		const count = await prisma.students.count({
			where,
		})
		return count
	}

    async Deleting(id,prisma) {
		
        // const student = await prisma.students.findUnique({where:{id:parseInt(id)}})
		
		// user device 삭제
		await prisma.students.update({ where: { id: parseInt(id) } ,data:{isDeleted:true}})
        
		// // deleting student in books
		// await prisma.books.update({where: { sId: id},data:{isDeleted:true}})
        
        // // deleting student in Exam
        // await prisma.exams.delete({where: { sId: id},data:{isDeleted:true}})
		

	}
}
export default new StudentService()