/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Eye, EyeOff, X, User, Mail, Lock } from "lucide-react";
import UserServicesInstance from "../services/user.service";
import { toast } from "react-toastify";

export const CreateAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const optionHandler = () => {
    setCreateAccount(!createAccount);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const response = await UserServicesInstance.createAccount(formData);
      if ("data" in response && response.data) {
        toast.success(response.message || "Account created successfully!");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          username: "",
          confirmPassword: "",
        });

        onClose();
      } else if ("error" in response) {
        toast.error(response.error || "An unknown API error occurred.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(
        "An unexpected error occurred. Please check your connection and try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed  inset-0 z-50 flex items-center  
    justify-center"
    >
      <div
        className="absolute inset-0 bg-black/50 
        backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md mx-4 
     bg-[#232e31] rounded-2xl border border-slate-700/50
         shadow-2xl"
      >
        {" "}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
        {createAccount && (
          <div className="p-6 pb-2">
            <h2 className="text-2xl font-bold text-center text-white mb-2">
              Create Account
            </h2>
            <p className="text-center text-slate-400 text-sm">
              Join DockShell and start your journey
            </p>
          </div>
        )}
        {!createAccount && (
          <div className="p-6 pb-2">
            <h2 className="text-4xl font-bold text-center text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-slate-400 text-sm">
              Please login to your account
            </p>
          </div>
        )}
        <div className="px-7  pb-6">
          {createAccount && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5
                    border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5  border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5  border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Eliot"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5  border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-2.5  border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-2.5  border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          {!createAccount && (
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium
                 text-slate-300 mb-1"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5  border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Eliot"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="block text-sm font-medium
                 text-slate-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-2.5  border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 px-4 py-3
    bg-[#bbff34]          text-black font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-[1.02] transition-all duration-200"
          >
            Create Account
          </button>
          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-slate-500"></div>
            <span className="px-4 text-slate-300 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-500"></div>
          </div>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-transparent border border-slate-500 rounded-2xl text-slate-200 hover:bg-slate-600/30 transition-all duration-200">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">G</span>
              </div>
              <span>Sign up with Google</span>
            </button>
          </div>
          {createAccount && (
            <p className="text-center text-sm text-slate-400 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={optionHandler}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          )}
          {!createAccount && (
            <p className="text-center text-sm text-slate-400 mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={optionHandler}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
