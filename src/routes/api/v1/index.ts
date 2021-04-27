import { Router } from 'express'
import swapRouter from './swap'
import priceRouter from './price'
import priceChangeRouter from './priceChange'
import statsRouter from './stats'

const router = Router()

router.use('/swap', swapRouter)
router.use('/price', priceRouter)
router.use('/pricechange', priceChangeRouter)
router.use('/stats', statsRouter)

export default router
