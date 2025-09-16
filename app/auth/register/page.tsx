import { RegisterForm } from "../../../components/forms/RegisterForm";

export default function Register() {
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
              Create your DigitalWallet account
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join thousands of users who trust DigitalWallet for fast, secure payments.
            </p>
          </div>
        </div>
        
        {/* Right Section - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-12">
          <div className="w-full max-w-sm sm:max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}