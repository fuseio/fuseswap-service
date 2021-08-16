import { Router } from 'express'
import ListsController from '@controllers/api/v1/lists'

const router = Router()

router.get(
  '/token',
  ListsController.getTokens
)

export default router
