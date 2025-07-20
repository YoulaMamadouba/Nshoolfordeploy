// src/components/auth/AuthNav.tsx
'use client';
import Link from 'next/link';

export default function AuthNav() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-orange-500">N</span>
              <span className="text-gray-800"> School</span>
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/signup" 
              className="text-sm font-medium text-gray-700 hover:text-orange-600"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}