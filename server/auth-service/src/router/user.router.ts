import { Router as ExpressRouter, type RequestHandler } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
	changePasswordSchema,
	forgotPasswordSchema,
	loginSchema,
	refreshTokenSchema,
	registerSchema,
	resendVerificationSchema,
	resetPasswordSchema,
	updateProfileSchema,
	userIdSchema,
	userListQuerySchema,
	verifyEmailSchema,
	validate,
} from '../validation/user.validate';
import type { UserController } from '../controller/user.controller';

export class UserRouter {
	readonly router = ExpressRouter();

	constructor(
		private readonly controller: UserController,
		private readonly authenticate: RequestHandler,
	) {
		this.router.post('/register', validate(registerSchema), asyncHandler(this.controller.register));
		this.router.post('/login', validate(loginSchema), asyncHandler(this.controller.login));
		this.router.post('/verify-email', validate(verifyEmailSchema), asyncHandler(this.controller.verifyEmail));
		this.router.post('/resend-verification', validate(resendVerificationSchema), asyncHandler(this.controller.resendVerification));
		this.router.post('/refresh-token', validate(refreshTokenSchema), asyncHandler(this.controller.refreshToken));
		this.router.post('/logout', this.authenticate, asyncHandler(this.controller.logout));
		this.router.post('/forgot-password', validate(forgotPasswordSchema), asyncHandler(this.controller.forgotPassword));
		this.router.post('/reset-password', validate(resetPasswordSchema), asyncHandler(this.controller.resetPassword));
		this.router.get('/me', this.authenticate, asyncHandler(this.controller.me));
		this.router.patch('/me', this.authenticate, validate(updateProfileSchema), asyncHandler(this.controller.updateMe));
		this.router.patch('/change-password', this.authenticate, validate(changePasswordSchema), asyncHandler(this.controller.changePassword));

		this.router.get('/', this.authenticate, validate(userListQuerySchema, 'query'), asyncHandler(this.controller.list));
		this.router.get('/:id', this.authenticate, validate(userIdSchema, 'params'), asyncHandler(this.controller.getById));
		this.router.patch('/:id', this.authenticate, validate(userIdSchema, 'params'), validate(updateProfileSchema), asyncHandler(this.controller.update));
		this.router.delete('/:id', this.authenticate, validate(userIdSchema, 'params'), asyncHandler(this.controller.delete));
	}
}
