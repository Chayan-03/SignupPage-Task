import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Adjust the import based on your project structure
import { Eye, EyeOff, Mail, Lock, Zap, TrendingUp, Users, Sparkles, ArrowRight, Check } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log("SignUp response:", { data, error });

      if (error) {
        console.error("Signup error:", error);
        if (error.message.includes("User already registered") || error.message.includes("email")) {
          setError("Email already exists, confirm it on your email.");
        } else {
          setError(error.message || "Failed to create account. Please try again.");
        }
        setTimeout(() => setError(""), 3000);
      } else if (data.user) {
        setSuccess("Account created successfully, confirm it on email.");
        setTimeout(() => {
          setSuccess("");
          navigate("/signin");
        }, 3000);
      }
    } catch (err) {
      console.error("Unexpected signup error:", err);
      setError("An unexpected error occurred");
      setTimeout(() => setError(""), 3000);
    }

    setLoading(false);
  };

  const features = [
    "AI-powered content generation",
    "Advanced analytics dashboard",
    "Automated posting scheduler",
    "Audience growth insights",
    "Competitor analysis tools",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{
            top: '10%',
            right: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delay"
          style={{
            bottom: '10%',
            left: '10%',
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            animation: 'float 10s ease-in-out infinite, pulse 4s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className={`relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-12 py-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left Side - Branding, Features, Reviews (Unchanged) */}
        <div className={`hidden lg:block text-white space-y-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <TrendingUp className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                  SocialAI
                </h1>
                <p className="text-xs text-gray-400 animate-fade-in-up">Powered by Advanced AI</p>
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-white animate-fade-in-up delay-200">
                Transform Your Social Media with{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI Power
                </span>
              </h2>
              <p className="text-lg text-gray-300 animate-fade-in-up delay-300">
                Join 10K+ creators growing by 300%
              </p>
            </div>
          </div>

          {/* Feature List */}
          <div className="grid gap-2 animate-fade-in-up delay-400">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20 animate-fade-in-up delay-500">
            <div className="text-center group">
              <div className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-300">300%</div>
              <div className="text-xs text-gray-400">Growth</div>
            </div>
            <div className="text-center group">
              <div className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-xs text-gray-400">Users</div>
            </div>
            <div className="text-center group">
              <div className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 group hover:border-white/20 transition-all duration-300 animate-fade-in-up delay-600">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-1 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Proven Results</h4>
                <p className="text-xs text-gray-400">Real success stories</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 italic">
              "SocialAI grew my followers from 1K to 50K in 6 months!" 
              <span className="text-purple-400"> - Sarah M.</span>
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form (Updated) */}
        <div className={`w-full max-w-md mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-3">
                  <Sparkles className="w-6 h-6 text-purple-400 animate-spin-slow mx-auto" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-1 animate-fade-in-up">Create Account</h2>
                <p className="text-base text-gray-300 animate-fade-in-up delay-200">Join SocialAI today</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-1 animate-fade-in-up delay-300">
                  <label htmlFor="email" className="text-sm font-medium text-gray-200 block">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all duration-200 hover:border-white/30"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-1 animate-fade-in-up delay-400">
                  <label htmlFor="password" className="text-sm font-medium text-gray-200 block">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all duration-200 hover:border-white/30"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-1 animate-fade-in-up delay-500">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200 block">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all duration-200 hover:border-white/30"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>

                {error && (
                  <div className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg animate-shake">
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg animate-fade-in-up">
                    <p className="text-sm text-green-300">{success}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group animate-fade-in-up delay-600"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Sign Up</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  )}
                </button>

                <div className="text-center animate-fade-in-up delay-700">
                  <p className="text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="text-purple-400 hover:text-purple-300 font-semibold transition-all duration-200 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Mobile Features, Stats, Testimonial */}
          <div className="lg:hidden space-y-4 animate-fade-in-up delay-800 max-h-[35vh] overflow-y-auto">
            {/* Mobile Branding */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg animate-pulse">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  SocialAI
                </h1>
              </div>
              <p className="text-xs text-gray-400">
                Trusted by 10K+ creators
              </p>
            </div>

            {/* Feature List */}
            <div className="grid gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 group">
                  <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center group">
                <div className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-300">300%</div>
                <div className="text-xs text-gray-400">Growth</div>
              </div>
              <div className="text-center group">
                <div className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-300">10K+</div>
                <div className="text-xs text-gray-400">Users</div>
              </div>
              <div className="text-center group">
                <div className="text-xl font-bold text-white group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-xs text-gray-400">Support</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 group hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-1 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
                  <TrendingUp className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Proven Results</h4>
                  <p className="text-xs text-gray-400">Real success stories</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic">
                "SocialAI grew my followers from 1K to 50K in 6 months!" 
                <span className="text-purple-400"> - Sarah M.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float 8s ease-in-out infinite reverse; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>
    </div>
  );
};

export default SignUp;
