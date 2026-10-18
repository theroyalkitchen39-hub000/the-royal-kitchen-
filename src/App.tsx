/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailyMenuSection } from './components/DailyMenuSection';
import { OnOrderSpecialsSection } from './components/OnOrderSpecialsSection';
import { PatientSpecialSection } from './components/PatientSpecialSection';
import { AboutUsSection } from './components/AboutUsSection';
import { DeliveryLocationSection } from './components/DeliveryLocationSection';
import { PaymentSection } from './components/PaymentSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { AiSalesAssistant } from './components/AiSalesAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F3EB] text-[#171717] selection:bg-[#C7A15A]/30">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* Daily Fresh Menu (Separate Section) */}
          <DailyMenuSection />

          {/* On Order Specials (Separate Section) */}
          <OnOrderSpecialsSection />

          {/* Patient Special Meals */}
          <PatientSpecialSection />

          {/* About Us */}
          <AboutUsSection />

          {/* Delivery & Kitchen Location */}
          <DeliveryLocationSection />

          {/* Payment Policy */}
          <PaymentSection />
        </main>

        {/* Contact & Footer Section */}
        <ContactSection />

        {/* Interactive Drawers, Modals & Floating Helpers */}
        <CartDrawer />
        <AiSalesAssistant />
        <AdminDashboard />
        <FloatingActions />
      </div>
    </AppProvider>
  );
}
