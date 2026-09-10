import type { NextFunction, Request, Response } from 'express';
import { grpcChatHistoryClient } from '../grpc/gRPCClient';
import { ApiResponse } from '../utils/apiResponse';

export type ChatHistoryClient = typeof grpcChatHistoryClient;

export class ChatHistoryService {
    constructor(private readonly chatHistoryClient: ChatHistoryClient = grpcChatHistoryClient) {}
}