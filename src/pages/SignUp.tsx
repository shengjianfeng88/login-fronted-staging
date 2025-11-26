import React, { useState, useEffect, useRef, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { getApiUrl } from "@/config/api";
import {
  validateEmail,
  calculatePasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
} from "@/utils/validation";
import { z } from "zod";
import { useGoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendMessageToExtension } from "@/utils/utils";
import { setUser } from "@/store/features/userSlice";
import signupVideo from "@/assets/onboarding/Signup-Video.mp4";
import image1 from "@/assets/image_1.jpg";
import image2 from "@/assets/image_2.jpg";
import image3 from "@/assets/image_3.jpg";
import googleLogo from "@/assets/g-logo.png";
import { OnboardingHeader } from "@/features/auth/onboarding/OnboardingTopBar";

const userSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  // 从URL参数获取推荐码
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({
        ...prev,
        referralCode: refCode,
      }));
    }
  }, [searchParams]);

  // Carousel state (currently unused but kept)
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const images = [
    { left: image3, center: image1, right: image2 },
    { left: image1, center: image2, right: image3 },
    { left: image2, center: image3, right: image1 },
  ];

  const changeSlide = useCallback(
    (index: number) => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveSlide(index);
          setTimeout(() => setIsTransitioning(false), 50);
        }, 200);
      }
    },
    [isTransitioning]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        changeSlide((activeSlide + 1) % 3);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSlide, isPaused, isTransitioning, changeSlide]);

  const validateForm = () => {
    try {
      userSchema.parse(formData);
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
      });
      setError("");
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {
          email: "",
          password: "",
          confirmPassword: "",
          referralCode: "",
        };
        err.errors.forEach((e) => {
          const field = e.path[0] as keyof typeof newErrors;
          newErrors[field] = e.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const requestData: {
        email: string;
        password: string;
        referralCode?: string;
      } = {
        email: formData.email,
        password: formData.password,
      };

      if (formData.referralCode.trim()) {
        requestData.referralCode = formData.referralCode.trim();
      }

      await axiosInstance.post("/auth/request-register", requestData);
      alert("Verification email sent! Check your inbox.");
      navigate("/onboarding");
    } catch (_error) {
      console.error("Registration failed:", _error);
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const token = response.credential;
      const res = await axiosInstance.post(
        getApiUrl("AUTH_API", "/auth/google-auth"),
        {
          token,
          referralCode: formData.referralCode,
        }
      );

      if (res.data) {
        console.log("response data: ", res.data);
        const accessToken = res.data.accessToken;

        localStorage.setItem("accessToken", accessToken);
        if (res.data.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        if (res.data.userId) {
          localStorage.setItem("userId", res.data.userId);
        }

        let userEmail = res.data.email || "";
        let userPicture = "";
        try {
          const decoded = JSON.parse(atob(accessToken.split(".")[1]));
          userEmail = decoded.email || res.data.email || "";
          userPicture = decoded.picture || "";
        } catch (error) {
          console.error("Failed to decode JWT:", error);
        }

        localStorage.setItem("email", userEmail);

        dispatch(
          setUser({
            email: userEmail,
            picture: userPicture,
          })
        );

        sendMessageToExtension({
          email: userEmail,
          picture: userPicture,
          accessToken: accessToken,
        });

        navigate("/done");
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
      setError("Google authentication failed. Please try again.");
    }
  };

  const handleError = (
    error: Error | { error?: string; error_description?: string }
  ) => {
    console.error("Google Sign-In error:", error);
    const errorObj = error as { error?: string; error_description?: string };
    if (errorObj?.error === "redirect_uri_mismatch") {
      console.error(
        "Redirect URI mismatch. Current origin:",
        window.location.origin
      );
      console.error("Current pathname:", window.location.pathname);
      console.error("Full URL:", window.location.href);
      setError(
        "Google 登录配置错误：重定向 URI 不匹配。请检查 Google Cloud Console 配置。"
      );
    } else {
      setError("Google 登录失败，请稍后重试。");
    }
  };

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      const fakeCredentialResponse: CredentialResponse = {
        credential: tokenResponse.access_token,
        select_by: "auto",
        clientId: "",
      };
      await handleGoogleLoginSuccess(fakeCredentialResponse);
    },
    onError: handleError,
  });

  return (
    <>
      <OnboardingHeader />
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="flex w-full max-w-[1177px] flex-col md:flex-row items-stretch gap-8 lg:gap-[137px]">
          {/* Left side (form) */}
          <div className="w-full md:max-w-[470px] bg-white rounded-[24px] border-[2px] border-[#D9D9D9] overflow-hidden flex">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col w-full h-full justify-center">
              <div className="w-full max-w-full md:max-w-[90%] mx-auto">
                {/* Welcome text */}
                <div className="mb-5">
                  <h1 className="font-semibold text-2xl md:text-3xl text-[#2F2F2F]">
                    Welcome
                  </h1>
                  <div className="w-full">
                    <p className="mt-1 text-[14px] leading-[22px] tracking-[-0.02em] font-normal text-[#000000]">
                      Sign up to explore your virtual try-on experience.
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-xs mb-3 w-full">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="w-full">
                  {/* Email */}
                  <div className="mb-3">
                    <label className="mb-2 block text-sm font-medium text-[#111111]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      className={`w-full h-8 border rounded-[10px] px-2.5 
                        text-[10px] font-medium 
                        placeholder:text-[10px] placeholder:font-medium placeholder:text-[#D9D9D9] ${
                          emailError || errors.email
                            ? "border-red-500"
                            : "border-[#DADCE0]"
                        }`}
                      autoComplete="email"
                    />
                    {(emailError || errors.email) && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        {emailError || errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="mb-2 block text-sm font-medium text-[#111111]">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      className="w-full h-8 border border-[#D9D9D9] rounded-[10px] px-2.5
                        text-[10px] font-medium
                        placeholder:text-[10px] placeholder:font-medium placeholder:text-[#D9D9D9]"
                      autoComplete="new-password"
                    />
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 w-full rounded transition-colors duration-200 ${
                                i < passwordStrength
                                  ? getPasswordStrengthColor(passwordStrength)
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Password Strength:{" "}
                          {getPasswordStrengthText(passwordStrength)}
                        </p>
                      </div>
                    )}
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-[#111111]">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter Confirm Password"
                      className="w-full h-8 border border-[#D9D9D9] rounded-[10px] px-2.5
                        text-[10px] font-medium
                        placeholder:text-[10px] placeholder:font-medium placeholder:text-[#D9D9D9]"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-10 bg-[#2F2F2F] rounded-[10px] text-white font-bold text-sm flex items-center justify-center"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4 w-full">
                  <div className="flex-grow h-px bg-[#2E2E2E]" />
                  <span className="mx-3 text-sm font-medium text-[#2E2E2E]">
                    or
                  </span>
                  <div className="flex-grow h-px bg-[#2E2E2E]" />
                </div>

                {/* Google */}
                <div className="mb-4 w-full">
                  <button
                    onClick={() => login()}
                    className="w-full h-10 bg-white border border-[#DADCE0] rounded-[10px] text-sm font-medium flex items-center justify-center gap-2 text-[#2F2F2F] hover:bg-gray-100"
                  >
                    <img src={googleLogo} alt="Google" className="w-5 h-5" />
                    <span>Sign up with Google</span>
                  </button>
                </div>

                {/* Sign in */}
                <div className="w-full flex justify-center">
                  <p className="text-xs text-[#A6A6A6]">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="font-bold text-[#2F2F2F] underline"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side (video card) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full md:max-w-[470px]">
              <div
                className="w-full aspect-[607/777] rounded-[24px] overflow-hidden
                  shadow-[0_4px_15px_rgba(0,0,0,0.25)]"
              >
                <video
                  src={signupVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
