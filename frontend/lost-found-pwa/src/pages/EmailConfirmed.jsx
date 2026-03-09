import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";

export default function EmailConfirmed() {

  const navigate = useNavigate();

  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("signup_email");

  const canResend = timer === 0;

  useEffect(() => {

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleResendEmail = async () => {

    if (!email) {
      toast.error("Email not found. Please signup again.");
      return;
    }

    setLoading(true);

    try {

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email
      });

      if (error) throw error;

      toast.success("Verification email sent again 📧");

      setTimer(30);

    } catch (err) {

      toast.error(err.message || "Failed to resend email");

    }

    setLoading(false);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#f5f7fb"
      }}
    >

      <Toaster position="top-right" />

      <Confetti numberOfPieces={120} recycle={false} />

      <div
        style={{
          background: "#fff",
          padding: "35px",
          borderRadius: "14px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
        }}
      >

        {/* Animated Email Icon */}

        <div
          style={{
            fontSize: "60px",
            marginBottom: "10px",
            animation: "float 2s ease-in-out infinite"
          }}
        >
          📩
        </div>

        <h2
          style={{
            fontSize: "26px",
            color: "#2e7d32",
            marginBottom: "10px"
          }}
        >
          Welcome to Lost & Found App
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#555",
            marginBottom: "20px",
            lineHeight: "1.6"
          }}
        >
          Your account has been created successfully.
          <br />
          Please check your email and click the verification link.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#888",
            marginBottom: "20px"
          }}
        >
          Once verified, you can login and start posting or finding lost items.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Back to Login
        </button>

        <button
          onClick={handleResendEmail}
          disabled={!canResend || loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            background: canResend ? "#4caf50" : "#bbb",
            color: "#fff",
            border: "none",
            cursor: canResend ? "pointer" : "not-allowed",
            fontSize: "14px"
          }}
        >
          {canResend ? "Resend Verification Email" : `Resend in ${timer}s`}
        </button>

      </div>

      {/* Animation CSS */}

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

    </div>

  );
}