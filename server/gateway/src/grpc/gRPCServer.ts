
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import crypto from 'crypto'
import path from 'path'
import { env } from '../utils/env';
import { existsSync } from 'fs';

// export const PROTO_PATH = path.join('/app','proto','task.proto');
const protoCandidates = [
    path.resolve(import.meta.dir, '..', '..', '..', 'proto', 'task.proto'),
    path.resolve(import.meta.dir, '..', '..', 'proto', 'task.proto'),
];

export const PROTO_PATH = protoCandidates.find((candidate) => existsSync(candidate)) ?? protoCandidates[0]!;


const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true
});

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const tasks = proto.tasks;

const randomTask = ()=>{
    const titles = ["learning docker","complete", 'adadfasdf','adsfasdfasdf'];

    return {
        id:crypto.randomUUID(),
        title:titles[Math.floor(Math.random()*titles.length)],
        completed: Math.random() > 0.5
    }
}

async function GetTasks(call:any,callback:any) {
    try {
        const generateTask = Array.from({length:3},randomTask);
        callback(null, {
            tasks:generateTask
        })
    } catch (error) {
        callback(null,error)
    }
}

export const startTaskServers = ()=>{
    const server = new grpc.Server();
    server.addService(tasks.TaskService.service,{
        GetTasks
    })

    server.bindAsync(`0.0.0.0:${env.GRPC_PORT}`,grpc.ServerCredentials.createInsecure(),
    (error,port)=>{
        if(error){
            console.error(`Server failed to bind: ${error.message}`);
            return;
        }
        console.log(`Task Service running on port : ${port}`)
    }
    )
}
