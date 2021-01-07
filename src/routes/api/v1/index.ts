import { Router } from 'express'
import swapRouter from './swap'

const router = Router()

router.use('/swap', swapRouter)

export default router
