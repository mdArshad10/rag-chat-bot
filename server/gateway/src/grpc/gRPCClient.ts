import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import { env } from '../utils/env';

export const PROTO_DIR = path.join('/app','proto');

const packageDefinition = protoLoader.loadSync([
    path.join(PROTO_DIR,'task.proto'),
    path.join(PROTO_DIR,'chat.proto'),
    path.join(PROTO_DIR,'agent.proto'),
    path.join(PROTO_DIR,'auth.proto'),

    path.join(PROTO_DIR,'chatHistory.proto'),
    path.join(PROTO_DIR,'customer.proto'),
    path.join(PROTO_DIR,'knowledgebase.proto'),
], {
    keepCase: true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;

const taskProto = grpcObject.tasks;
const chatProto = grpcObject.chat;
const agentProto = grpcObject.agents;
const authProto = grpcObject.auth;
const chatHistoryProto = grpcObject.chathistory;
const customerProto = grpcObject.customer;
const knowledgeBaseProto = grpcObject.knowledgebase;



export const grpcTaskClient = new taskProto.TaskService(
    `task-service:${env.TASK_SERVICE_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
)

export const grpcChatClient = new chatProto.ChatService(
    `task-service:${env.TASK_SERVICE_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
)

export const grpcAgentClient = new agentProto.AgentService(
    `task-service:${env.TASK_SERVICE_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
)

export const grpcAuthClient = new authProto.AuthService(
    `auth-service:${env.AUTH_SERVICE_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
)

export const grpcChatHistoryClient = new chatHistoryProto.ChatHistoryService(
    `task-service:${env.TASK_SERVICE_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
)

export const grpcCustomerClient = new customerProto.CustomerService(
    `task-service:${env.TASK_SERVICE_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
)

export const grpcKnowledgeBaseClient = new knowledgeBaseProto.KnowledgeBaseService(
    `task-service:${env.TASK_SERVICE_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
)

