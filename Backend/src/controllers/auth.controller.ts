import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Import the crypto module
import db from '../db';

// Helper to get JWT config safely
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not defined in .env file');
  }
  return secret;
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, role',
      [email, passwordHash]
    );

    const payload = {
      user: {
        id: newUser.rows[0].id,
        role: newUser.rows[0].role,
      },
    };

    const secret = getJwtSecret();
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userQuery = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const user = userQuery.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const secret = getJwtSecret();
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(200).json({ msg: 'If an account with that email exists, a password reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE email = $3',
      [passwordResetToken, passwordResetExpires, email]
    );
    
    // In a real app, you would email the user the 'resetToken' (the unhashed version)
    // For this project, we will send a generic success message to prevent email enumeration.

    res.status(200).json({ msg: 'If an account with that email exists, a password reset link has been sent.' });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const userResult = await db.query(
      'SELECT * FROM users WHERE password_reset_token = $1 AND password_reset_expires > NOW()',
      [hashedToken]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(400).json({ errors: [{ msg: 'Token is invalid or has expired' }] });
    }

    const user = userResult.rows[0];

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await db.query(
      'UPDATE users SET password_hash = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2',
      [passwordHash, user.id]
    );

    res.status(200).json({ msg: 'Password has been reset successfully.' });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};