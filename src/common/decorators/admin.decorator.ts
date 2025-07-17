import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/dto/create-user.dto'; // Import your enum

export const ROLES_KEY = 'roles'; // A unique key for your metadata

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
