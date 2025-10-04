import React from 'react';
import PartnershipHero from './components/PartnershipHero';
import PartnershipStepperForm from './components/PartnershipStepperForm';
import Footer from '@/components/layout/Footer';

export default function PartnershipRequestPage() {
  return (
    <div className="min-h-screen">
      <PartnershipHero />
      <PartnershipStepperForm />
      <Footer />
    </div>
  );
}
