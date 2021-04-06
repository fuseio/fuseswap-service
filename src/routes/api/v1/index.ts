import { Router } from 'express'
import swapRouter from './swap'
import priceRouter from './price'

const router = Router()

router.use('/swap', swapRouter)
router.use('/price', priceRouter)

export default router
