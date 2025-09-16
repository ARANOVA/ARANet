import { JWTPayload } from "jose";

export interface SessionPayload extends JWTPayload {
  username: string;
  email: string;
  id: number;
  roles: string[];
  expiresAt?: Date;
}