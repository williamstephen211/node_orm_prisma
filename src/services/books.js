// singleton instance
let instance = null

class BooksService {
    constructor() {
        if (!instance) {
            console.log('BooksService Create' + this)
        }
        return instance
    }

    // book create
    async create(studentId,title,prisma) {

        const info = {sId:parseInt(studentId),title}
        
        return await prisma.books.create({data:info})
    }

    // book findlist
    async findList({title,studentId,orderBy = 'desc',isDeleted = false},prisma) { // keyword -- name
        
        // query options 
        
        let options  = {
            orderBy: {'id': orderBy},
            where:{
                isDeleted: isDeleted === 'all' ? undefined : isDeleted,
                sId: studentId ? parseInt(studentId) : undefined,
                title: title ? {contains:title} : undefined
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options.where))
        
        return await prisma.books.findMany(options)
    }

    async findById(id,prisma) {
		return await prisma.books.findUnique({where:{id}})
	}

    async updateById(id, updateData,prisma) {
		

        const { studentId, title } = updateData
        const parseData = {sId: studentId ? parseInt(studentId) : undefined, title: title ? title : undefined }
        const data = JSON.parse(JSON.stringify(parseData))
        console.log(data)
		// update book
		const updatedBook = await prisma.books.update( {
			where: { id:parseInt(id)},data
		})

		
		return updatedBook
	}

    async count(where,prisma) {
		const count = await prisma.books.count({
			where,
		})
		return count
	}

    async Deleting(id,prisma) {

		// const book = await prisma.books.findUnique({where:{id}})


		// deleting book in books
		await prisma.books.update({where: { id:parseInt(id) }, data:{isDeleted:true}})

	}
}
export default new BooksService()