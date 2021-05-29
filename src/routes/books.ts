import { Book } from '../models'
import { Router } from 'express'
import { catchAsync, auth } from '../middleware'

export const router = Router()
router.get(
  '/api/books',
  catchAsync(async (req:any, res:any) => {
  console.log('Books.............',);
  const book = await Book.findOne({where:{name:''}})
  return res.status(200).send('nothinh',book)
})
)
export { router as books }
