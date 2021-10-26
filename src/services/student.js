

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

        return await prisma.student.create({data:user})
    }

    // student findlist
    async findList({keyword,orderBy = 'desc',isDeleted = false},prisma) { // keyword -- name
        // query options 
        let options  = {
            order: {'id':orderBy},
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                name:{contains:keyword ? keyword : undefined}
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options))
        
        return await prisma.student.findAndCountAll(options)
    }

    async findById(id,prisma) {
		return await prisma.student.findUnique({where:{id}})
	}

    async updateById(id, student,prisma) {
		

		// update user
		const updateData = await prisma.student.update({
			where: { id, isDeleted: false },
            data:{name:student}
		})

		
		// return updated user
		return updateData
	}

    async count(where,prisma) {
		const count = await count.student.count({
			where,
		})
		return count
	}

    async Deleting(id,prisma) {
		

		

		// deleting student in books
		await prisma.books.delete({where: { sId: id}})

        // deleting student in Exam
        await prisma.exam.delete({where: { sId: id}})
		

		// user device 삭제
		await prisma.student.update({ where: { userId: id } ,data:{isDeleted:true}})
	}
}
export default StudentService()