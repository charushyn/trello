import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user/dto/create-user.dto';
import { ROLES_KEY } from '../decorators/admin.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get required roles from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are defined on the route, allow access (or deny, based on your app's default policy)
    if (!requiredRoles) {
      return true;
    }

    // 2. Get the authenticated user's roles from the request object
    // IMPORTANT: Ensure your JWT strategy populates req.user.role(s) correctly.
    // Also, ensure your Request interface is extended as discussed previously.
    const { user } = context.switchToHttp().getRequest();

    // Make sure user and user.role are defined. If user or role is missing, deny access.
    if (!user || !user.role) {
      return false; // Or throw a specific UnauthorizedException
    }

    // If user.role is a single string (e.g., 'admin'), convert it to an array for easier checking
    const userRoles = Array.isArray(user.role) ? user.role : [user.role];

    // 3. Check if the user has at least one of the required roles
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
