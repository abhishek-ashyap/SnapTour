// This file extends the existing Express Request interface
// to include our custom 'user' property.

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: 'creator' | 'viewer';
    };
  }
}