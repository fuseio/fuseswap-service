import { Router } from 'express'
import swapRouter from './swap'
import priceRouter from './price'
import priceChangeRouter from './priceChange'
import statsRouter from './stats'
import tokensRouter from './tokens'

const router = Router()

router.use('/swap', swapRouter)
router.use('/price', priceRouter)
router.use('/pricechange', priceChangeRouter)
router.use('/stats', statsRouter)
router.use('/tokens', tokensRouter)

export default router
