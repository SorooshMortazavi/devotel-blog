import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../constants/UserRoles';

export const RolesAllowed = (...roles: UserRoles[]) => SetMetadata('roles', roles);
