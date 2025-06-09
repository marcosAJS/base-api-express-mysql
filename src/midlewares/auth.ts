import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provider" });
  }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJudm1hcmNvc0BnbWFpbC5jb20iLCJuYW1lIjoiTWFyY29zIiwiaWF0IjoxNjExMjg5NDAwLCJleHAiOjE2MTEzNzU4MDB9.Uc1aRDpxAb6knn282kiTf7YQ-A56NkoCAyHfy9ZkMaQ
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token error" });
  }

  const [scheme, token] = parts; // ['Bearer', 'asdfasdfalsçkdhjf']
  
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token malformatted" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    return next();
  });
};

export default authGuard;
