import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://e-commerce-website-backend-rqmh.onrender.com");

const readResponse = async (response) => {
    const body = await response.text();

    if (!body) {
        return { message: `Server returned an empty response (${response.status}).` };
    }

    try {
        return JSON.parse(body);
    } catch {
        return { message: `Server returned an invalid response (${response.status}).` };
    }
};

export default function App() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setMessage("");
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setMessage("");

        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // =========================
        // SIGN UP
        // =========================
        if (mode === "signup") {
            // Validation
            if (
                !formData.name ||
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword
            ) {
                setMessage("Please fill in all fields.");
                return;
            }

            if (formData.password.length < 6) {
                setMessage("Password must be at least 6 characters.");
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                setMessage("Passwords do not match.");
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/auth/register`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: formData.name,
                            email: formData.email,
                            password: formData.password,
                        }),
                    }
                );

                const data = await readResponse(response);

                if (!response.ok) {
                    throw new Error(data.message || "Registration failed");
                }

                console.log("Register response:", data);

                setMessage("Account created successfully!");

                // Switch to Login after successful registration
                setMode("login");

                // Clear form
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } catch (error) {
                console.error("Register error:", error);

                setMessage(
                    error.message || "Signup failed. Please try again."
                );
            }
        } else {
            // =========================
            // LOGIN
            // =========================

            if (!formData.email || !formData.password) {
                setMessage("Please enter your email and password.");
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/auth/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password,
                        }),
                    }
                );

                const data = await readResponse(response);

                if (!response.ok) {
                    throw new Error(data.message || "Login failed");
                }

                console.log("Login response:", data);

                // =========================
                // SAVE JWT TOKEN
                // =========================
                localStorage.setItem("token", data.token);

                // =========================
                // SAVE USER
                // =========================
                localStorage.setItem("user", JSON.stringify(data.user));
                window.dispatchEvent(new Event("authChanged"));

                // =========================
                // GO TO DASHBOARD
                // =========================
                navigate("/dashboard");
            } catch (error) {
                console.error("Login error:", error);

                setMessage(
                    error.message ||
                    "Login failed. Please check your credentials."
                );
            }
        }
    };

    // =========================
    // SKIP LOGIN
    // =========================
    const handleSkip = () => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/40 lg:grid lg:grid-cols-[42%_58%]">

                {/* =========================
                    LEFT SIDE
                ========================= */}
                <div className="relative hidden min-h-[680px] overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">

                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
                    <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-white/10" />

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-xl font-bold backdrop-blur-sm">
                            S
                        </div>

                        <span className="text-xl font-bold">
                            Ecommerse
                        </span>
                    </div>

                    <div className="relative z-10 max-w-sm">
                        <h1 className="text-4xl font-bold leading-tight tracking-tight">
                            {mode === "login"
                                ? "Welcome back!"
                                : "Create your account"}
                        </h1>

                        <p className="mt-5 text-base leading-7 text-white/80">
                            {mode === "login"
                                ? "Sign in to continue to your account and manage everything in one place."
                                : "Join us today and get access to all our amazing features."}
                        </p>

                        <div className="mt-8 flex items-center gap-3">
                            <div className="h-1 w-10 rounded-full bg-white" />
                            <div className="h-1 w-3 rounded-full bg-white/40" />
                            <div className="h-1 w-3 rounded-full bg-white/40" />
                        </div>
                    </div>

                    <div className="relative z-10 flex gap-5 text-xs text-white/60">
                        <span>© 2026 MyApp</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </div>

                {/* =========================
                    RIGHT SIDE
                ========================= */}
                <div className="flex min-h-[680px] flex-col justify-center p-6 sm:p-10 lg:p-14">

                    {/* Login / Signup Tabs */}
                    <div className="mb-8 flex w-full rounded-xl bg-slate-100 p-1">
                        <button
                            type="button"
                            onClick={() => switchMode("login")}
                            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${mode === "login"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            onClick={() => switchMode("signup")}
                            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${mode === "signup"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Heading */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            {mode === "login"
                                ? "Sign in"
                                : "Create account"}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {mode === "login"
                                ? "Enter your details to access your account."
                                : "Fill in your details to get started."}
                        </p>
                    </div>

                    {/* =========================
                        FORM
                    ========================= */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Full Name */}
                        {mode === "signup" && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Full name
                                </label>

                                <div className="relative">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                        👤
                                    </span>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                    ✉
                                </span>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>
                        </div>

                        {authMethod === "otp" && otpChannel === "phone" && (
                            <div>
                                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">Mobile number</label>
                                <input id="phone" name="phone" type="tel" placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </label>

                                {mode === "login" && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMessage(
                                                "Password reset link requested."
                                            )
                                        }
                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>

                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        {mode === "signup" && (
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                        🔒
                                    </span>

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="••••••••"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={handleChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                    >
                                        {showConfirmPassword
                                            ? "🙈"
                                            : "👁️"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Remember Me */}
                        {mode === "login" && (
                            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
                                />

                                Remember me
                            </label>
                        )}

                        {/* Terms */}
                        {mode === "signup" && (
                            <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-slate-500">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-indigo-600"
                                />

                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="#terms"
                                        className="font-semibold text-indigo-600 hover:underline"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#privacy"
                                        className="font-semibold text-indigo-600 hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                        )}

                        {/* Message */}
                        {message && (
                            <div
                                className={`rounded-xl px-4 py-3 text-xs font-medium ${message.includes(
                                    "successfully"
                                ) ||
                                        message.includes("successful")
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-red-50 text-red-600"
                                    }`}
                            >
                                {message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0"
                        >
                            {mode === "login"
                                ? "Sign in"
                                : "Create account"}

                            <span className="text-lg">
                                →
                            </span>
                        </button>

                        {/* =========================
                            SKIP BUTTON
                        ========================= */}
                        <button
                            type="button"
                            onClick={handleSkip}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            Skip Login & Go to Dashboard
                            <span className="text-base">
                                →
                            </span>
                        </button>
                    </form>

                    {/* Bottom Switch */}
                    <div className="mt-6 text-center text-sm text-slate-500">
                        {mode === "login" ? (
                            <>
                                Don't have an account?{" "}

                                <button
                                    type="button"
                                    onClick={() =>
                                        switchMode("signup")
                                    }
                                    className="font-bold text-indigo-600 hover:text-indigo-700"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}

                                <button
                                    type="button"
                                    onClick={() =>
                                        switchMode("login")
                                    }
                                    className="font-bold text-indigo-600 hover:text-indigo-700"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

