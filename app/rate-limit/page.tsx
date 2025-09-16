'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface RateLimitPageProps {
  searchParams: {
    retryAfter?: string;
    limit?: string;
    type?: 'global' | 'api' | 'navigation';
  };
}

export default function RateLimitPage({ searchParams }: RateLimitPageProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(parseInt(searchParams.retryAfter || '60'));
  
  const limit = searchParams.limit || '100';
  const type = searchParams.type || 'global';

  const typeMessages = {
    global: {
      title: 'Slow down there!',
      description: `Hey, looks like you're moving pretty fast! We've temporarily limited your requests to keep things running smoothly. Try again in a moment.`,
      icon: '⏰'
    },
    api: {
      title: 'API limit reached',
      description: `You've hit our API request limit (${limit}/min). No worries though - just give it a minute and you'll be good to go!`,
      icon: '📡'
    },
    navigation: {
      title: 'Easy there, speedy!',
      description: `Whoa, you're clicking around faster than we can keep up! Take a quick breather and try again in a sec.`,
      icon: '🚀'
    }
  };

  const currentMessage = typeMessages[type];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRetry = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 text-center space-y-6 shadow-2xl border-0">
        <div className="text-7xl mb-6 animate-pulse">
          {currentMessage.icon}
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {currentMessage.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
            {currentMessage.description}
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 space-y-3 border border-gray-700">
          <div className="text-4xl font-mono font-bold text-blue-400 tracking-wider">
            {countdown > 0 ? `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}` : '✅'}
          </div>
          <p className="text-sm font-medium text-blue-300">
            {countdown > 0 ? 'Almost there...' : 'Ready to go!'}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {countdown <= 0 ? (
            <Button 
              onClick={handleRetry}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Let&apos;s try that again
            </Button>
          ) : (
            <Button 
              disabled
              className="w-full bg-gray-200 text-gray-500 cursor-not-allowed font-semibold py-3 text-lg"
            >
              Hang tight... ({countdown}s)
            </Button>
          )}
          
          <Button 
            variant="outline"
            onClick={handleGoHome}
            className="w-full border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 text-lg hover:bg-gray-700 transition-all duration-200"
          >
            Take me home
          </Button>
        </div>

        <div className="text-xs text-gray-400 space-y-2 pt-4 border-t border-gray-700">
          <p className="font-medium">Just keeping things running smoothly!</p>
          <p>Still having trouble? Drop us a line and we&apos;ll help you out.</p>
        </div>
      </Card>
    </div>
  );
}