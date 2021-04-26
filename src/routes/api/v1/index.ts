import { Router } from 'express'
import swapRouter from './swap'
import priceRouter from './price'
import statsRouter from './stats'

const router = Router()

router.use('/swap', swapRouter)
router.use('/price', priceRouter)
router.use('/stats', statsRouter)

export default router
