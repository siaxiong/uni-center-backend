import express,{Response, Request, NextFunction} from "express";
import { validationResult } from "express-validator";


const requestResultValidator =  function(req: Request, res: Response, next: NextFunction){
    const errorResult = validationResult(req);
    console.log("🚀 ~ file: requestValidator.ts ~ line 7 ~ requestResultValidator ~ errorResult", errorResult)
    
    if (!errorResult.isEmpty()) {
      return res.status(400).json({ errors: errorResult.array() });
    }

    next();
}

export {requestResultValidator};