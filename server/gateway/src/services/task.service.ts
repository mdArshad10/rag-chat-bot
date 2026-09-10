import type { NextFunction, Request, Response } from 'express';
import { grpcTaskClient } from '../grpc/gRPCClient';
import { ApiResponse } from '../utils/apiResponse';

export type TaskClient = typeof grpcTaskClient;

export class TaskService {
    constructor(private readonly taskClient: TaskClient = grpcTaskClient) {}

    getAllTask(req:Request,res:Response,next:NextFunction) {
    try {
        grpcTaskClient.GetTasks({},(err:any,response:any)=>{
            if(err){
                return res.status(500).json(ApiResponse.error(err,500,err.message))
            }
            return res.json(response)
        })
    } catch (error) {
        next(error)
    }
}
}