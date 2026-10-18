import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { existsSync } from 'node:fs';
import path from 'path'
import { env } from '../utils/env';
import type { AuthgRPCServices } from '../service/auth-grpc.service';

const protoCandidates = [
    path.resolve(import.meta.dir, '..', '..', '..', 'proto', 'auth.proto'),
    path.resolve(import.meta.dir, '..', '..', 'proto', 'auth.proto'),
];

export const PROTO_PATH = protoCandidates.find((candidate) => existsSync(candidate)) ?? protoCandidates[0]!;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const auths = proto.auth;



export const startAuthServers = (authGrpcServices: AuthgRPCServices)=>{
    const server = new grpc.Server();

    server.addService(auths.AuthService.service, {
		RegisterUser: authGrpcServices.RegisterUsergRPC,
		VerifyUserEmail: authGrpcServices.verifyUserEmailgRPC,
        loginUser:authGrpcServices.loginUsergRPC
	});

    server.bindAsync(`0.0.0.0:${env.GRPC_PORT}`,grpc.ServerCredentials.createInsecure(),
    (error,port)=>{
        if(error){
            console.error(`Server failed to bind: ${error.message}`);
            return;
        }
        console.log(`Auth Service running on port : ${port}`)
    }
    )
}



