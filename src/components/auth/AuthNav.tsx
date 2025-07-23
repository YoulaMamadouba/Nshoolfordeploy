// src/components/auth/AuthNav.tsx
'use client';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function AuthNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="text-xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#f57c00] to-orange-600 bg-clip-text text-transparent group-hover:from-[#f57c00] group-hover:to-orange-700 transition-all duration-300">
                  N
                </span>
                <span className="text-gray-800"> School</span>
              </span>
            </Link>

            {/* Menu Mobile */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Ouvrir le menu</span>
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <Link 
                href="/login" 
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200"
              >
                Connexion
              </Link>
              <Link 
                href="/signup" 
                className="relative overflow-hidden group rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-white shadow-md hover:shadow-orange-500/30 hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
              >
                <span className="relative z-10">Créer un compte</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Mobile - Déplacé en dehors du nav pour éviter les conflits de z-index */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] bg-white">
          {/* Overlay avec effet de gradient subtil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20"></div>
          
          {/* Motifs décoratifs */}
          <div className="absolute top-20 right-4 w-20 h-20 bg-gradient-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-4 w-16 h-16 bg-gradient-to-tr from-amber-200/30 to-orange-300/30 rounded-full blur-lg"></div>
          
          {/* Contenu principal */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header du menu mobile */}
            <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-orange-100 bg-white/95 backdrop-blur-sm">
              <Link 
                href="/" 
                className="-m-1.5 p-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-[#f57c00] to-orange-600 bg-clip-text text-transparent">
                    N
                  </span>
                  <span className="text-gray-800"> School</span>
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-full p-2.5 text-gray-700 hover:bg-orange-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Navigation mobile avec animations */}
            <div className="flex-1 mt-2 flow-root px-6 overflow-y-auto">
              <div className="-my-6 divide-y divide-orange-100">
                {/* Actions utilisateur */}
                <div className="py-6 space-y-4">
                  <div className="animate-in slide-in-from-top-4 duration-300" style={{ animationDelay: '100ms' }}>
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-3 text-lg font-medium text-gray-900 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                  </div>
                  <div className="animate-in slide-in-from-top-4 duration-300" style={{ animationDelay: '200ms' }}>
                    <Link
                      href="/signup"
                      className="-mx-3 block rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-lg font-bold text-white text-center shadow-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-[1.02]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Créer un compte
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}