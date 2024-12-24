import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface Request extends Request {
  user: string | JwtPayload;
}
