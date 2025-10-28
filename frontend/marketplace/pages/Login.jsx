import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', {replace: true})
    }
  },[isAuthenticated, navigate])

  return (
    <div className="flex justify-center pt-12">
      <LoginForm />
    </div>
  );
}
