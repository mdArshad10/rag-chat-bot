import type { NextFunction,Request,Response } from "express";
import { grpcAgentClient } from '../grpc/gRPCClient';
import { ApiResponse } from '../utils/apiResponse';

export type AgentClient = typeof grpcAgentClient;

export class AgentService{
    constructor(private readonly agentClient: AgentClient = grpcAgentClient){}
    public static createAgent(req:Request,res:Response,next:NextFunction){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    public static updateAgent(req:Request,res:Response,next:NextFunction){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    public static getAgent(req:Request,res:Response,next:NextFunction){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    public static getAgents(req:Request,res:Response,next:NextFunction){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}