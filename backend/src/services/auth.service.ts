import { supabase } from "../config/supabase";

// SIGNUP
export const signupService = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined // OTP mode
    }
  });
};

// VERIFY OTP
export const verifyOtpService = async (email: string, otp: string) => {
  return await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email"
  });
};

// LOGIN
export const loginService = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const createProfile = async (userId: string, email: string) => {
  return await supabase.from("profiles").insert([
    {
      id: userId,
      email: email,
      role: "user"
    }
  ]);
};