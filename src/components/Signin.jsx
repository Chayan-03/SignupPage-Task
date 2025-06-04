import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, Zap, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { session, error } = await signInUser(email, password);

    if (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      navigate("/dashboard");
    }

    setLoading(false);

    if (session) {
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
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
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className={`relative z-10 min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding with 3D Effects */}
          <div className={`hidden lg:block text-white space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              {/* Animated Logo */}
              <div className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <TrendingUp className="w-10 h-10 text-white animate-bounce" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                    SocialAI
                  </h1>
                  <p className="text-sm text-gray-400 animate-fade-in-up">Powered by Advanced AI</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white animate-fade-in-up delay-500">
                  Welcome back to the future
                </h2>
                <p className="text-xl text-gray-300 animate-fade-in-up delay-700">
                  of social media growth
                </p>
                <p className="text-gray-400 leading-relaxed animate-fade-in-up delay-1000">
                  Join thousands of entrepreneurs who are scaling their social presence with AI-powered insights and automation.
                </p>
              </div>
            </div>

            {/* Feature Cards with Hover Effects */}
            <div className="space-y-4">
              {[
                { icon: Zap, title: "AI-Powered Content", desc: "Generate engaging posts in seconds", color: "purple", delay: "delay-300" },
                { icon: TrendingUp, title: "Growth Analytics", desc: "Track and optimize your performance", color: "blue", delay: "delay-500" },
                { icon: Users, title: "Audience Insights", desc: "Understand your community better", color: "green", delay: "delay-700" }
              ].map((feature, index) => (
                <div key={index} className={`group flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in-up ${feature.delay}`}>
                  <div className={`p-3 bg-${feature.color}-500/20 rounded-lg group-hover:bg-${feature.color}-500/30 transition-all duration-300 group-hover:rotate-12`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400 group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-gray-100">{feature.title}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">{feature.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ml-auto opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>

            {/* Floating Stats */}
            <div className="flex space-x-6 animate-fade-in-up delay-1000">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "300%", label: "Avg Growth" },
                { value: "24/7", label: "AI Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-default">
                  <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Enhanced Sign In Form */}
          <div className={`w-full max-w-md mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-4">
                    <Sparkles className="w-8 h-8 text-purple-400 animate-spin-slow mx-auto" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in-up">Welcome Back</h2>
                  <p className="text-gray-300 animate-fade-in-up delay-200">Sign in to continue growing your social presence</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  {/* Email Field with Enhanced Animation */}
                  <div className="space-y-2 animate-fade-in-up delay-300">
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
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all duration-200 hover:border-white/30"
                        placeholder="Enter your email"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Password Field with Enhanced Animation */}
                  <div className="space-y-2 animate-fade-in-up delay-400">
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
                        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/15 transition-all duration-200 hover:border-white/30"
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
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Error Message with Animation */}
                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-shake">
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Enhanced Sign In Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group animate-fade-in-up delay-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    )}
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center animate-fade-in-up delay-600">
                    <p className="text-gray-300">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-purple-400 hover:text-purple-300 font-semibold transition-all duration-200 hover:underline"
                      >
                        Sign up for free
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Mobile Branding */}
            <div className="lg:hidden mt-8 text-center animate-fade-in-up delay-700">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg animate-pulse">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  SocialAI
                </h1>
              </div>
              <p className="text-gray-400 text-sm">
                Trusted by 10,000+ entrepreneurs worldwide
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
          0% { opacity: 0; transform: translateY(30px); }
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
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default Signin;