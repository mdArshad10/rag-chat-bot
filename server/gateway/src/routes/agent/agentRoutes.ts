import type { Router } from "express";
import { AgentService } from "../../services/agent.service";


export function agentRoutes(router:Router) {
    const agentService = new AgentService();
    router.route('/register').post();
    router.route('/verify-email').post();
    router.route("/login").post()

    return router;
}