import { Request, Response } from "express";
import {
  signupService,
  verifyOtpService,
  loginService,
  createProfile
} from "../services/auth.service";

// SIGNUP
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await signupService(email, password);

  if (error) return res.status(400).json({ error: error.message });

  // Insert into profiles table
  if (data.user) {
    await createProfile(data.user.id, email);
  }

  return res.json({
    message: "Signup successful. Check email for OTP.",
    user: data.user
  });
};

// VERIFY OTP
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const { data, error } = await verifyOtpService(email, otp);

  if (error) return res.status(400).json({ error: error.message });

  return res.json({
    message: "Email verified successfully",
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
    user: data.user
  });
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await loginService(email, password);

  if (error) return res.status(400).json({ error: error.message });

  return res.json({
    message: "Login successful",
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
    user: data.user
  });
};

