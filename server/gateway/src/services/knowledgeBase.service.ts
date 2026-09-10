import type { NextFunction, Request, Response } from 'express';
import { grpcKnowledgeBaseClient } from '../grpc/gRPCClient';
import { ApiResponse } from '../utils/apiResponse';

export type KnowledgeBaseClient = typeof grpcKnowledgeBaseClient;

export class KnowledgeBaseService {
    constructor(private readonly knowledgeBaseClient: KnowledgeBaseClient = grpcKnowledgeBaseClient) {}
}