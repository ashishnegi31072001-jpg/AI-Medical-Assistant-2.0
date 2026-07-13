import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Logo from "../ui/Logo";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await login(
      formData.email,
      formData.password
    );

    setLoading(false);

    if (result.success) {
      toast.success("Login Successful");

      navigate("/dashboard");
    } else {
      setError(result.message);

      toast.error(result.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <Logo />

        <h2 className="mt-8 text-3xl font-bold">
          Welcome Back
        </h2>

        <p className="mt-2 text-slate-400">
          Sign in to continue your health journey.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={<EmailIcon />}
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            icon={<LockIcon />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            }
          />

          <div className="mb-6 mt-2 flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2"
              />
              Remember Me
            </label>

            <button
              type="button"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <p className="mt-8 text-center text-slate-300">
            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </Card>
    </motion.div>
  );
}

export default LoginForm;