import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Logo from "../assets/vcart logo.png";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { AuthDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(UserDataContext);

  // separate loading states
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful:", result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const googleLogin = async () => {
    setGoogleLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );

      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414ec] to-[#0c2025] text-white flex flex-col items-center justify-start">
      {/* Logo Section */}
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px] h-[40px]" src={Logo} alt="logo" />
        <h1 className="text-[20px] font-bold">UrbanPrime</h1>
      </div>

      {/* Title */}
      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[30px] font-bold">Login Page</span>
        <span className="text-[14px] font-medium">
          Welcome to UrbanPrime, Place your order
        </span>
      </div>

      {/* Login Box */}
      <div className="max-w-[450px] w-[90%] h-[480px] shadow-lg bg-transparent border-[1px] border-white rounded-lg flex items-center justify-center flex-col">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          {/* Google Login */}
          <div
            onClick={googleLogin}
            className="w-[90%] h-[50px] rounded-lg flex items-center justify-center gap-5 py-6 cursor-pointer bg-[#42656cae] hover:bg-[#42656c] transition-all"
          >
            <img
              className="w-10"
              src="https://s.yimg.com/fz/api/res/1.2/Qpybtr24YAUp2UGFYg1M5A--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/fe90b2b3-0ac3-3c81-8238-d3724bf23104/t_500x300"
              alt="google"
            />
            {googleLoading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login with Google"
            )}
          </div>

          {/* Divider */}
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <div className="w-[90%] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="email"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type={showPassword ? "text" : "password"}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {!showPassword && (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer  absolute bottom-[60%] right-[5%]"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
            {showPassword && (
              <IoEyeOffOutline
                className="w-[20px] h-[20px] cursor-pointer absolute bottom-[36%] right-[5%]"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}

            {/* Login Button with Spinner */}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-[100%] h-[50px] rounded-lg bg-red-500 hover:bg-red-600 transition-all flex items-center justify-center mt-[20px] text-[20px] disabled:opacity-70"
            >
              {loginLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>

            {/* Signup Redirect */}
            <p className="flex gap-[10px] mt-2 text-[14px]">
              Don’t have an account?
              <span
                className="text-red-800 text-[16px] font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
