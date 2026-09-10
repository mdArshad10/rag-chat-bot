import type { NextFunction, Request, Response } from 'express';
import { grpcChatClient } from '../grpc/gRPCClient';
import { ApiResponse } from '../utils/apiResponse';

export type ChatClient = typeof grpcChatClient;

export class ChatService {
    constructor(private readonly chatClient: ChatClient = grpcChatClient) {}

    postChat(req:Request,res:Response,next:NextFunction){
    try {
        const {message,threadId, userId} = req.body;

        res.setHeader('Content-Type','text/event-stream')
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive')
    } catch (error) {
        next(error)
    }
}
}