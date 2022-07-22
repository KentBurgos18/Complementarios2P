import { Request, Response, NextFunction } from "express"

import {
    validationResult
} from 'express-validator'

const validarCampos = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json(errors)
    }

    next()
}

export {
    validarCampos
}