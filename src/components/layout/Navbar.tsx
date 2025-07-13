// src/components/layout/Navbar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function AppNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const links = [
    { name: 'Accueil', href: '/' },
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-orange-100">
      {/* Hauteur réduite : p-4 au lieu de p-5 */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Nouveau logo "N School" */}
        <div className="flex lg:flex-1">
          <Link href="/" className="group -m-1.5 p-1.5">
            <span className="sr-only">N School</span>
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#f57c00] to-orange-600 bg-clip-text text-transparent group-hover:from-[#f57c00] group-hover:to-orange-700 transition-all duration-300">
                N
              </span>
              <span className="text-[#2b4a6a]"> School</span>
            </span>
          </Link>
        </div>

        {/* Menu Mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Bars3Icon className="h-6 w-6" /> {/* Taille réduite */}
          </button>
        </div>

        {/* Navigation Desktop */}
        <div className="hidden lg:flex lg:gap-x-10">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-base font-medium px-1 py-2 ${
                pathname === item.href 
                  ? 'text-orange-600' 
                  : 'text-gray-900 hover:text-orange-500'
              } transition-colors duration-300 group`}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-amber-400 to-orange-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Menu Utilisateur */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-6">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-1 rounded-full hover:bg-orange-50 transition-all duration-300 group"
            >
              <div className="relative">
                <UserCircleIcon className="h-8 w-8 text-orange-500 group-hover:text-orange-600 transition-colors" /> {/* Taille réduite */}
                <span className="absolute top-0 right-0 h-2 w-2 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full ring-2 ring-white"></span>
              </div>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl bg-white py-2 shadow-2xl ring-1 ring-gray-900/5 focus:outline-none animate-in fade-in zoom-in-95">
                <div className="px-4 py-3 border-b border-orange-50">
                  <p className="text-xs text-gray-500">Connectez-vous pour accéder</p>
                </div>
                <Link
                  href="/login"
                  className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-orange-50 hover:text-orange-600 transition-colors border-t border-orange-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Créer un compte
                </Link>
              </div>
            )}
          </div>
          
          <Link
            href="/register"
            className="relative overflow-hidden group rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-base font-bold text-white shadow-lg hover:shadow-orange-500/30 hover:from-amber-600 hover:to-orange-700 transition-all duration-500"
          >
            <span className="relative z-10">Essai gratuit</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </nav>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-orange-100">
            <Link 
              href="/" 
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-[#f57c00] to-orange-600 bg-clip-text text-transparent">
                  N
                </span>
                <span className="text-[#151f28]"> School</span>
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 text-gray-700 hover:bg-orange-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon className="h-6 w-6" /> {/* Taille réduite */}
            </button>
          </div>
          <div className="mt-2 flow-root px-6">
            <div className="-my-6 divide-y divide-orange-100">
              <div className="space-y-1 py-6">
                {links.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-3 text-lg font-medium ${
                      pathname === item.href 
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-orange-600' 
                        : 'text-gray-900 hover:bg-orange-50'
                    } transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-3 text-lg font-medium text-gray-900 hover:bg-orange-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="-mx-3 block rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-lg font-bold text-white text-center shadow hover:from-amber-600 hover:to-orange-700 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Essai gratuit
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}