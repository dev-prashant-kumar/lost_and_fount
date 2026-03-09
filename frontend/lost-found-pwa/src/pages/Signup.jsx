import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import "./Login.css";

export default function Signup() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setSignupData({ ...signupData, phone: value });
    }
  };

  // Password rules
  const passwordRules = {
    length: signupData.password.length >= 8,
    uppercase: /[A-Z]/.test(signupData.password),
    number: /\d/.test(signupData.password),
    special: /[!@#$%^&*]/.test(signupData.password),
  };

  const strengthScore = Object.values(passwordRules).filter(Boolean).length;
  const strengthWidth = (strengthScore / 4) * 100;
  const strengthColor = strengthScore === 4 ? "green" : strengthScore >= 2 ? "orange" : "red";

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(signupData.phone)) {
      toast.error("Enter valid 10 digit phone number");
      return;
    }

    // Password validation
    if (strengthScore < 4) {
      toast.error("Password does not meet requirements");
      return;
    }

    if (signupData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Step 1️⃣ Check if profile already exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", signupData.email)
        .single();

      if (existingProfile) {
        toast.error("Email already registered. Please login.");
        setLoading(false);
        return;
      }

      // Step 2️⃣ Sign up user in Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: window.location.origin + "/email-confirmed"
        }
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("Email already registered. Please login or resend verification email.");
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return;
      }

      const user = data.user;

      // Step 3️⃣ Insert into profiles only if user created
      if (user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{
            id: user.id,
            name: signupData.name,
            phone: signupData.phone,
            email: signupData.email
          }]);

        // ✅ Friendly duplicate email message
        if (profileError) {
          if (profileError.code === "23505") {
            toast.error("Email already used! Please login.");
          } else {
            toast.error(profileError.message);
          }
          setLoading(false);
          return;
        }
      }

      toast.success("Signup successful! Please verify your email 📧");
      navigate("/email-confirmed");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  // Optional: Resend verification email
  const handleResendEmail = async () => {
    if (!signupData.email) {
      toast.error("Enter your email first to resend verification");
      return;
    }
    setLoading(true);
    try {
      await supabase.auth.resend({ type: "signup", email: signupData.email });
      toast.success("Verification email resent! Check your inbox.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend email.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Toaster position="top-right" />
      <div className="login-card">
        <h2>Create Account</h2>

        <form className="form" onSubmit={handleSignupSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="input"
            value={signupData.phone}
            onChange={handlePhoneChange}
            maxLength={10}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <div style={{ position: "relative", width: "100%" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#555"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Password strength bar */}
          <div style={{ width: "100%", height: "6px", background: "#ddd", borderRadius: "5px", marginTop: "6px" }}>
            <div style={{ width: `${strengthWidth}%`, height: "100%", background: strengthColor, borderRadius: "5px", transition: "0.3s" }}></div>
          </div>

          {/* Password rules */}
          <div style={{ fontSize: "13px", marginTop: "8px" }}>
            <p style={{color: passwordRules.length ? "green" : "red"}}>✔ 8 characters</p>
            <p style={{color: passwordRules.uppercase ? "green" : "red"}}>✔ 1 uppercase letter</p>
            <p style={{color: passwordRules.number ? "green" : "red"}}>✔ 1 number</p>
            <p style={{color: passwordRules.special ? "green" : "red"}}>✔ 1 special character</p>
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="main-btn" disabled={loading}>
            {loading ? <Oval height={20} width={20} color="#fff" secondaryColor="#fff" strokeWidth={5} visible={true} /> : "Signup"}
          </button>

        </form>

        {/* Resend verification email */}
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Didn't receive email? <button onClick={handleResendEmail} style={{ textDecoration: "underline", color: "blue", background: "none", border: "none", cursor: "pointer" }}>Resend</button>
        </p>

        <p>
          Already have an account?
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}