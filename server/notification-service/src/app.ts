import 'dotenv/config';
import express from 'express'
import { expressServer } from './server';
import { env } from './utils/env';

const app = express();

expressServer(app,env.PORT)

interface Empty{}

interface Task{
    id:string,
    title:string,
    completed:boolean
}

interface TaskList{
    tasks:Task[]
}

class TaskService{
    GetTasks(props:Empty):TaskList { 
        return {tasks:[{id:"",title:"",completed:false}]}
    }
}
