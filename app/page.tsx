
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="text-center">
        <div className="floating-animation">
          <i className="ri-loader-4-line text-white text-6xl animate-spin"></i>
        </div>
        <p className="text-white mt-4 text-lg">Redirecting to login...</p>
      </div>
    </div>
  );
}
