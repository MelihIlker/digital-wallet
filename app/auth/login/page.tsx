import { LoginForm } from "../../../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Hero Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Sign in to DigitalWallet
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Access your funds, send payments and manage your wallet securely.
            </p>
          </div>
        </div>
        
        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-12">
          <div className="w-full max-w-sm sm:max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
