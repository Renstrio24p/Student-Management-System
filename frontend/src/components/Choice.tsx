import { FormEvent, lazy, useEffect, useState } from "react";
import { SetStates } from "../types/SetStates";
import { validateForm } from "../helpers/ValidateForm";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/Zustand"; // Import Zustand store
import { validateLogin } from "../helpers/ValidateLogin";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));

export default function Choice() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { registerUser, loginUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check if the user is already authenticated and route accordingly
    if (isAuthenticated) {
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "Student") {
        navigate("/student/dashboard");
      } else if (role === "Teacher") {
        navigate("/teacher/dashboard");
      }
    }
  }, [isAuthenticated, navigate, role]);

  const setter: SetStates = {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    role,
    accessKey,
    isLogin,
    error,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setConfirmPassword,
    setRole,
    setAccessKey,
    setIsLogin,
    setError,
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (validateForm(setter)) {
      try {
        await registerUser(email, password, role);
        setIsLogin(true);
      } catch (error) {
        setError("Registration failed");
      }
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (validateLogin(setter)) {
      try {
        await loginUser(email, password, role);

        // Check if authenticated and route accordingly
        if (isAuthenticated) {
          if (role === "Admin") {
            navigate("/admin/dashboard");
          } else if (role === "Student") {
            navigate("/student/dashboard");
          } else if (role === "Teacher") {
            navigate("/teacher/dashboard");
          }
        }
      } catch (err: any) {
        setError(err.message || "Login failed");
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <img
        src="/student.png"
        className="w-full h-full absolute top-0 left-0 object-cover"
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm"></div>

      <div className="p-4">
        {isLogin ? (
          <Login handleLogin={handleLogin} setter={setter} error={error} />
        ) : (
          <Register
            handleRegister={handleRegister}
            setter={setter}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
