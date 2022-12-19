import { Response, Request } from "express";
import { Assignment } from "@prisma/client";
import { AssignmentService, UserService } from "../../services/services";


// export const createAssignment = async function(resp: Response, req: Request){
// 	const payload:Omit<Assignment,"id" | "professorId"> = req.body;
// 	const professorId = req.params.professorId;

// 	const data = await AssignmentService.createAssignment({...payload,professorId});
// 	resp.json(data);

// };