import BrandSection from "../components/auth/BrandSection";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      <BrandSection />

      <div className="flex-1 flex justify-center items-center p-8">

        <div className="w-full max-w-md">

          <LoginForm />

        </div>

      </div>

    </div>
  );
}

export default Login;