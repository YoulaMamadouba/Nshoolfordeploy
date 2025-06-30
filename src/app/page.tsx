// app/page.tsx

import React from 'react';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/HeroSection';
import Features from '@/components/home/Features';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import WhyUs from '@/components/home/WhyUs';
import Team from '@/components/home/Team';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <WhyUs/>
      <Team/>
      <Footer/>
    </div>
  );
}