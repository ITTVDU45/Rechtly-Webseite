"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../../ui/Section';
import './process.css';
import Stepper, { Step } from '../../ui/Stepper';

export type ProcessStep = {
  id: number;
  title: string;
  lead: string;
  desc: string;
  icon?: React.ReactNode;
};

type Props = {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
  /** optional node rendered directly under the heading and subtitle (e.g. an image) */
  topImage?: React.ReactNode;
};

export default function ProcessTemplate({ title, subtitle, steps, topImage }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSteps = steps.length;

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isMobile && !autoScrollPaused) {
      // Start auto-scroll
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => (prev === totalSteps - 1 ? 0 : prev + 1));
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      // Clear interval when component unmounts or dependencies change
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isMobile, totalSteps, autoScrollPaused]);

  const pauseAutoScroll = () => {
    setAutoScrollPaused(true);
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => {
      setAutoScrollPaused(false);
    }, 10000);
  };

  const goToNextStep = () => {
    pauseAutoScroll(); // Pause auto-scroll when user interacts
    setCurrentStep((prev) => (prev === totalSteps - 1 ? 0 : prev + 1));
  };

  const goToPrevStep = () => {
    pauseAutoScroll(); // Pause auto-scroll when user interacts
    setCurrentStep((prev) => (prev === 0 ? totalSteps - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    pauseAutoScroll(); // Pause auto-scroll when user interacts
    setCurrentStep(index);
  };

  return (
    <Section className="section--lg section--white process">
      <div className="section__container process-inner">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {topImage && (
          <div className="process-image-wrapper">
            {topImage}
          </div>
        )}
        
        {/* Desktop View */}
        <div className={`desktop-view ${isMobile ? 'hidden' : ''}`}>
          <Stepper showAllSteps autoRevealOnEnter revealStaggerMs={350}>
            {steps.map((s) => (
              <Step key={s.id}>
                <div className="step-card">
                  <div className="step-icon-large">{s.icon ?? '•'}</div>
                  <div className="step-content">
                    <h3 className="step-title">{s.title}</h3>
                    <div className="step-lead">{s.lead}</div>
                    <p className="step-desc">{s.desc}</p>
                  </div>
                </div>
              </Step>
            ))}
          </Stepper>
        </div>
        
        {/* Mobile Slider View */}
        <div className={`mobile-slider-container ${!isMobile ? 'hidden' : ''}`}>
          <div className="mobile-slider-controls">
            <button 
              className="slider-nav slider-nav--prev" 
              onClick={goToPrevStep}
              aria-label="Vorheriger Schritt"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="slider-dots">
              {steps.map((_, index) => (
                <button 
                  key={index} 
                  className={`slider-dot ${index === currentStep ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Gehe zu Schritt ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="slider-nav slider-nav--next" 
              onClick={goToNextStep}
              aria-label="Nächster Schritt"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="mobile-slider" ref={sliderRef}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                className="mobile-slide"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-number">{currentStep + 1}</div>
                <div className="step-card">
                  <div className="step-icon-large">{steps[currentStep].icon ?? '•'}</div>
                  <div className="step-content">
                    <h3 className="step-title">{steps[currentStep].title}</h3>
                    <div className="step-lead">{steps[currentStep].lead}</div>
                    <p className="step-desc">{steps[currentStep].desc}</p>
                  </div>
                </div>
                
                {!autoScrollPaused && (
                  <div className="auto-scroll-indicator">
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ 
                          duration: 4, 
                          ease: "linear",
                          repeat: 0
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="process-cta">
          <button className="btn primary neon-cta" aria-label="Jetzt starten – kostenfrei">
            <span>Jetzt starten – kostenfrei</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="cta-icon">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="#07222b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="microcopy">Unverbindlich. Ersteinschätzung in wenigen Minuten.</div>
        </div>
      </div>
    </Section>
  );
}


