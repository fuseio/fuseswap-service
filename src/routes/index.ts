import { Router, Request, Response } from 'express'
import api from './api'

const router = Router()

router.use('/api/v1', api)

router.get('/is_running', (req: Request, res: Response) => {
  res.send({ response: 'ok' })
})

export default router
