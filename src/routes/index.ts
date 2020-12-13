import { Router, Request, Response, NextFunction } from 'express'
import api from './api'

const router = Router()

router.use('/api/v1', api)

router.get('/is_running', (req: Request, res: Response, next: NextFunction) => {
  res.send({ response: 'ok' })
})

export default router
