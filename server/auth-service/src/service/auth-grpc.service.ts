import type { UserService } from "./user.service";
import * as grpc from '@grpc/grpc-js'

export class AuthgRPCServices {
    constructor(private readonly authService: UserService) { }

    async RegisterUsergRPC(call: any, callback: any) {
        try {
            const response = await this.authService.register({
                email:call.request.email,
                password:call.request.password
            });
            callback(null, response);
    } catch (error:unknown) {
        const errMessage = error instanceof Error ? error.message : "User Registeration Failed."
        callback({
            message: errMessage,
            code:grpc.status.INVALID_ARGUMENT
        },null)
        }
    }

    async verifyUserEmailgRPC(call: any, callback: any) {
        try {
            const response = await this.authService.verifyEmail({
                email:call.request.email,
                optCode:call.request.otp_code
            });
            callback(null, response);
    } catch (error:unknown) {
        const errMessage = error instanceof Error ? error.message : "User Email verification Failed."
        callback({
            message: errMessage,
            code:grpc.status.INVALID_ARGUMENT
        },null)
        }
    }

    async loginUsergRPC(call:any, callback:any){
        try {
            const response = await this.authService.login({
                email:call.request.email,
                password:call.request.password
            });
            callback(null, response);
    } catch (error:unknown) {
        const errMessage = error instanceof Error ? error.message : "User login Failed."
        callback({
            message: errMessage,
            code:grpc.status.INVALID_ARGUMENT
        },null)
        }
    }
}