


// import models
import { Books } from '../models'


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
    async create(studentId,prisma) {

        return await prisma.books.create({data:{sId:studentId}})
    }

    // book findlist
    async findList({studentId,orderBy = 'desc',isDeleted = false},prisma) { // keyword -- name
        // query options 
        let options  = {
            order: [['id',orderBy]],
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                sId: studentId
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options))
        
        return await prisma.books.findAndCountAll(options)
    }

    async findById(id,prisma) {
		return await prisma.books.findByPk(id)
	}

    async updateById(id, studentId,prisma) {
		

		// update book
		const updatedBook = await prisma.books.update( {
			where: { id, isDeleted: false },data:{sId:studentId}
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
		const book = await prisma.books.findUnique({where:{id}})

		// [ERROR] BOOK_NOT_FOUND
		if (book === null) throw Error('Book_NOT_FOUND')

		// [ERROR] BOOK_DELETED
		if (book.isDeleted) throw Error('Book_DELETED')

		

		// deleting book in books
		await prisma.books.delete({where: { sId: id}})

	}
}
export default new BooksService()