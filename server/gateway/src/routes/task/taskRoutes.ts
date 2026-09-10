import type { Router } from "express";
import { TaskService } from "../../services/task.service";


export function taskRoutes(router:Router) {
    const taskService = new TaskService();
    // router.route('/').get(getAllTask);
    // router.route('/chats').post(postChat)
    return router;
}