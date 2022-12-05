import {Response, Request, NextFunction} from "express";
import { validationResult } from "express-validator";


const requestResultValidator =  function(req: Request, res: Response, next: NextFunction){
	const errorResult = validationResult(req);
    
	if (!errorResult.isEmpty()) {
		console.log("🚀 ~ file: requestValidator.ts ~ line 7 ~ requestResultValidator ~ errorResult", errorResult);

		return res.status(400).json({ errors: errorResult.array() });
	}

	next();
};

export {requestResultValidator};