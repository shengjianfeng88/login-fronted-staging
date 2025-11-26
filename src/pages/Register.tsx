import React from 'react';
import { Gift, Sparkle } from 'lucide-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSignUpNow = () => {
    navigate(`/signup${searchParams.toString() ? '?' + searchParams.toString() : ''}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans">

      {/* Main Content Container */}
      <div className="w-full max-w-3xl flex flex-col items-center">

        {/* 1. Headline */}
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-black mb-10 text-center">
          You’re invited to fAIshion.AI!
        </h1>

        {/* 2. Promotional Banner */}
        <div className="w-full bg-[#F9F8FF] rounded-[32px] relative overflow-hidden px-6 py-16 md:py-20 mb-10">

          {/* --- Left Decoration Group --- */}
          <div className="absolute -bottom-12 -left-6 md:left-8 md:-bottom-8 transform scale-75 md:scale-100 origin-bottom-left pointer-events-none">
            <div className="relative">
              {/* Star Icon */}
              <Sparkle
                size={50}
                strokeWidth={1}
                className="absolute -top-8 -left-8 text-black -rotate-12 fill-white z-10"
              />

              {/* White Circle Container */}
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm">
                {/* Gift Icon */}
                <Gift
                  size={90}
                  strokeWidth={0.7}
                  className="text-indigo-500 rotate-12 translate-y-1"
                />
              </div>
            </div>
          </div>

          {/* --- Right Decoration Group --- */}
          <div className="absolute -bottom-12 -right-6 md:right-8 md:-bottom-8 transform scale-75 md:scale-100 origin-bottom-right pointer-events-none">
            <div className="relative">
              {/* Top Star */}
              <Sparkle
                size={50}
                strokeWidth={1}
                className="absolute -top-12 right-0 text-black rotate-12 fill-white z-10"
              />
              {/* Side Star */}
              <Sparkle
                size={45}
                strokeWidth={1}
                className="absolute top-10 -left-12 text-black -rotate-12 fill-white z-10"
              />

              {/* White Circle Container */}
              <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-sm">
                {/* Gift Icon */}
                <Gift
                  size={90}
                  strokeWidth={0.7}
                  className="text-indigo-500 -rotate-12 translate-y-1"
                />
              </div>
            </div>
          </div>

          {/* Banner Text Content */}
          <div className="relative z-10 text-center max-w-lg mx-auto px-2">
            <h2 className="text-2xl md:text-3xl text-gray-800 font-medium leading-tight">
              Get 20 free credits when you join
            </h2>
            <h2 className="text-2xl md:text-3xl text-gray-800 font-medium leading-tight">
              start your try-on journey!
            </h2>
          </div>
        </div>

        {/* 3. Subtext Description */}
        <div className="text-center mb-10 max-w-xl space-y-1 text-gray-600">
          <p className="text-sm md:text-base leading-relaxed">
            Discover outfits in seconds with AI-powered try-ons.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            Explore styles, mix & match with your closet, and share your looks instantly.
          </p>
        </div>

        {/* 4. Sign Up Button */}
        <div className="w-full max-w-md">
          <button
            onClick={handleSignUpNow}
            className="w-full bg-gray-900 hover:bg-black text-white text-base font-medium py-3.5 px-6 rounded-lg transition-colors shadow-sm"
          >
            Sign up
          </button>
        </div>

        {/* 5. Footer Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-gray-500 underline decoration-1 underline-offset-2 hover:text-gray-900">
              Log in here.
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;