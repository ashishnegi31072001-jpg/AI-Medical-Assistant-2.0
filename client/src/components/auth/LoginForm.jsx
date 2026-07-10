import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Logo from "../ui/Logo";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend login comes in Step 8
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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-slate-400"
              >
                {showPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            }
          />

          <div className="mb-8 mt-2 flex justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              <span className="ml-2">
                Remember Me
              </span>
            </label>

            <button
              type="button"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit">
            Sign In
          </Button>

          <p className="mt-8 text-center">
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