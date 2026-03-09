export interface SendOtpBody {
  email: string
}

export interface VerifyOtpBody {
  email: string
  otp: string
}