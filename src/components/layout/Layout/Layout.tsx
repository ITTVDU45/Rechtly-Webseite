'use client';

import React, { ReactNode } from 'react';
import Footer from '@/components/layout/Footer/Footer';
import './Layout.css';
import ScrollToTop from '@/components/ui/ScrollToTop';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <main className="layout__main">{children}</main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Layout;


