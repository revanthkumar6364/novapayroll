import { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  email: string;
  orgs: {
    orgId: string;
    role: string;
  }[];
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
