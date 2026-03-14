export interface AuthenticatedUser {
  userId: string;
  email: string;
  orgs: {
    orgId: string;
    role: string;
  }[];
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
