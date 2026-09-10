
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import { env } from '../utils/env';
import type { AuthgRPCServices } from '../service/auth-grpc.service';

export const PROTO_PATH = path.join('/app', 'proto', 'auth.proto');

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



