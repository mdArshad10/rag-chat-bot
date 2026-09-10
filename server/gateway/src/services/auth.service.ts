import type { NextFunction, Request, Response } from 'express';
import { grpcAuthClient } from '../grpc/gRPCClient';
import { ApiResponse } from '../utils/apiResponse';

export type AuthClient = typeof grpcAuthClient;

export class AuthService {
	constructor(private readonly authClient: AuthClient = grpcAuthClient) {}

	registerUser(req: Request, res: Response, next: NextFunction) {
		try {
            // RegisterUser comes from proto file
			this.authClient.RegisterUser(
				{
					email: req.body.email,
					password: req.body.password,
				},
				(err: any, response: any) => {
					if (err) {
						return res
							.status(500)
							.json(ApiResponse.error(err, 500, err.message));
					}
					return res.json(response);
				},
			);
		} catch (error) {
			next(error);
		}
	}


    verifiedEmailUser(req:Request,res:Response,next:NextFunction) {
        try {
            this.authClient.VerifyUserEmail({
                email:req.body.email,
                otp_code:req.body.otp_code
            },(err:any,response:any)=>{
                if(err){
                    return res.status(500).json(ApiResponse.error(err,500,err.message))
                }
                return res.json(response)
            })
        } catch (error) {
            next(error)
        }
    }
    
    loginUser(req:Request,res:Response,next:NextFunction) {
        try {
            this.authClient.LoginUser({
                email:req.body.email,
                password:req.body.password
            },(err:any,response:any)=>{
                if(err){
                    return res.status(500).json(ApiResponse.error(err,500,err.message))
                }
                return res.json(response)
            })
        } catch (error) {
            next(error)
        }
    }

}
