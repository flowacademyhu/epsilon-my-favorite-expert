export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './expertController.service';
import { ExpertControllerService } from './expertController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export * from './usersController.service';
import { UsersControllerService } from './usersController.service';
export const APIS = [AuthControllerService, ExpertControllerService, UserControllerService, UsersControllerService];
