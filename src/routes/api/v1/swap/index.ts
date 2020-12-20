import { Router } from 'express'
import SwapController from '@controllers/api/v1/swap'
import { swapCallParametersValidation } from '@controllers/api/v1/swap/validations'

const router = Router()

router.post(
  '/swapcallparameters',
  swapCallParametersValidation,
  SwapController.swapCallParameters
)

export default router
