import type { NextFunction, Request, Response } from 'express';
import { grpcCustomerClient } from '../grpc/gRPCClient';
import { ApiResponse } from '../utils/apiResponse';

export type CustomerClient = typeof grpcCustomerClient;

export class CustomerService {
    constructor(private readonly customerClient: CustomerClient = grpcCustomerClient) {}

}