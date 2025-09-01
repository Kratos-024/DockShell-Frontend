/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, X, User, Mail, Lock } from 'lucide-react';
import UserServicesInstance from '../services/user.service';
import { toast } from 'react-toastify';

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const CreateAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value) return 'First name is required';
        if (value.length > 50) return 'First name must be less than 50 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'First name can only contain letters and spaces';
        break;

      case 'lastName':
        if (!value) return 'Last name is required';
        if (value.length > 50) return 'Last name must be less than 50 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Last name can only contain letters and spaces';
        break;

      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (value.length > 20) return 'Username must be less than 20 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return 'Username can only contain letters, numbers, and underscores';
        break;

      case 'email':
        if (!value) return 'Email is required';
        if (value.length > 100) return 'Email must be less than 100 characters';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (value.length > 100) return 'Password must be less than 100 characters';
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        break;

      case 'confirmPassword':
        if (createAccount && !value) return 'Please confirm your password';
        if (createAccount && value !== formData.password) return 'Passwords do not match';
        break;

      default:
        break;
    }
    return undefined;
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (createAccount) {
      newErrors.firstName = validateField('firstName', formData.firstName);
      newErrors.lastName = validateField('lastName', formData.lastName);
      newErrors.email = validateField('email', formData.email);
      newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    }

    newErrors.username = validateField('username', formData.username);
    newErrors.password = validateField('password', formData.password);

    return newErrors;
  };
  const optionHandler = () => {
    setCreateAccount(!createAccount);
    setErrors({});
    setTouched({});
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  useEffect(() => {
    if (touched.confirmPassword && createAccount) {
      const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
      }));
    }
  }, [formData.password, formData.confirmPassword, touched.confirmPassword, createAccount]);

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allFields = createAccount
      ? ['firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword']
      : ['username', 'password'];

    const newTouched: Record<string, boolean> = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some((error) => error !== undefined);
    if (hasErrors) {
      toast.error('Please fix the validation errors before submitting.');
      return;
    }

    try {
      const response = createAccount
        ? await UserServicesInstance.createAccount(formData)
        : await UserServicesInstance.loginUser(formData);

      if (response.error) {
        toast.error(response.error);
      } else {
        setAuthState('authenticated');
        toast.success(response.message || 'Operation successful!');
        navigate('/ctf/labs');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
        setTouched({});
        onClose();
      }
    } catch (error) {
      console.error('Submission failed unexpectedly:', error);
      toast.error('A critical error occurred. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 bg-[#232e31] rounded-2xl border border-slate-700/50 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {createAccount ? (
          <div className="p-6 pb-2">
            <h2 className="text-2xl font-bold text-center text-white mb-2">Create Account</h2>
            <p className="text-center text-slate-400 text-sm">
              Join DockShell and start your journey
            </p>
          </div>
        ) : (
          <div className="p-6 pb-2">
            <h2 className="text-4xl font-bold text-center text-white mb-2">Welcome Back</h2>
            <p className="text-center text-slate-400 text-sm">Please login to your account</p>
          </div>
        )}

        <div className="px-7 pb-6">
          {createAccount ? (
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
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.firstName && touched.firstName
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
                    placeholder="John"
                    required
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.lastName && touched.lastName
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
                    placeholder="Doe"
                    required
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.username && touched.username
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
                    placeholder="Eliot"
                    required
                  />
                </div>
                {errors.username && touched.username && (
                  <p className="text-red-400 text-xs mt-1">{errors.username}</p>
                )}
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
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email && touched.email
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.password && touched.password
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
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
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.username && touched.username
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
                    placeholder="your_username or email"
                    required
                  />
                </div>
                {errors.username && touched.username && (
                  <p className="text-red-400 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.password && touched.password
                        ? 'border-red-500 focus:ring-red-500 bg-red-900/20'
                        : 'border-slate-600 focus:ring-blue-500 focus:border-transparent bg-transparent'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-6 px-4 py-3 bg-[#bbff34] text-black font-semibold rounded-lg hover:bg-[#a8e62e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-[1.02] transition-all duration-200"
          >
            {createAccount ? 'Create Account' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-slate-400 mt-4">
            {createAccount ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={optionHandler}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              {createAccount ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
