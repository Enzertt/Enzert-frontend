import Link from "next/link";
export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 flex-col"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #161311 0%, #2E1508 41%, #4A2C1D 82%, #231F1D 100%)",
      }}
    >
      <div className="mb-4">
        {" "}
        <img
          src="/logo.png"
          alt="Enzert Logo"
          className="h-30 w-30 object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-[#1F1B19] border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6">
        {/* title\  */}
        <h2 className="text-2xl font-semibold text-[#E6D6CF]">Welcome Back</h2>

        <p className="text-sm text-gray-400 text-center">
          Sign in to continue your music experience
        </p>

        {/* Form */}
        <form className="w-full flex flex-col gap-4 mt-2">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email or Username</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg outline-none focus:border-[#5A3B29] transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg outline-none focus:border-[#5A3B29] transition"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Login utton */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#46291B] to-[#5A3B29] text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-2">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#C8A89C] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
