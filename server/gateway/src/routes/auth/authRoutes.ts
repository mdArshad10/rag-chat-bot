import type { Router } from "express";
import { AuthService } from "../../services/auth.service";


export function authRoutes(router:Router) {
    const authService = new AuthService();
    router.route('/register').post(authService.registerUser);
    router.route('/verify-email').post(authService.verifiedEmailUser);
    router.route("/login").post(authService.loginUser)

    return router;
}