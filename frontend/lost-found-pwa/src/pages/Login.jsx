import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../supabaseClient";
import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {

    const checkSession = async () => {

      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate("/home");
      }

    };

    checkSession();

  }, [navigate]);


  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };


  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    setLoading(false);

    if (error) {

      toast.error(error.message);

    } else {

      toast.success("Login Successful 🎉");
      navigate("/home");

    }

  };


  const loginWithGoogle = async () => {

    await supabase.auth.signInWithOAuth({
      provider: "google"
    });

  };


  return (

    <div className="login-container">

      <Toaster position="top-right" />

      {/* Animated Welcome Heading */}

      <h1 className="welcome-heading">
        Welcome to Lost & Found Community
      </h1>

      <div className="login-card">

        <h2 className="login-title">Login</h2>

        <form className="form" onSubmit={handleLoginSubmit}>

          <input
            name="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            required
          />

          <div className="password-box">

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              onChange={handleChange}
              required
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>

          </div>


          <button className="main-btn">

            {loading ? "Loading..." : "Login"}

          </button>


          {/* Google Login */}

          <button
            type="button"
            className="google-btn"
            onClick={loginWithGoogle}
          >

            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="google-icon"
            />

            Continue with Google

          </button>

        </form>


        <p className="signup-text">
          Don't have account? <Link to="/signup">Signup</Link>
        </p>

      </div>

    </div>

  );

}