export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './expertResource.service';
import { ExpertResourceService } from './expertResource.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export * from './usersResource.service';
import { UsersResourceService } from './usersResource.service';
export const APIS = [AuthControllerService, ExpertResourceService, UserControllerService, UsersResourceService];
