"use client";
import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
  showAllSteps?: boolean;
  autoRevealOnEnter?: boolean;
  revealStaggerMs?: number;
  /** optional validator for the currently visible step; return false to block forward navigation */
  validateStep?: (step: number) => boolean;
  /** text for the final-step button (defaults to "Complete") */
  finalButtonText?: string;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  finalButtonText = 'Complete',
  validateStep,
  disableStepIndicators = false,
  renderStepIndicator,
  showAllSteps = false,
  autoRevealOnEnter = false,
  revealStaggerMs = 300,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    // prevent advancing if validator is provided and fails for current step
    if (validateStep && !validateStep(currentStep)) return;
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (validateStep && !validateStep(currentStep)) return;
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  // refs for reveal-mode
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const stepEls = useRef<Array<HTMLElement | null>>([]);

  const updateDotsByPercent = (percent: number) => {
    if (!wrapperRef.current) return;
    const dots = Array.from(wrapperRef.current.querySelectorAll('.timeline-dot')) as HTMLElement[];
    const total = stepsArray.length;
    const upto = Math.floor((percent / 100) * total) - 1;
    dots.forEach((d, idx) => {
      if (idx <= upto) d.classList.add('revealed');
      else d.classList.remove('revealed');
    });
  };

  // auto reveal when wrapper enters viewport
  React.useEffect(() => {
    if (!showAllSteps || !autoRevealOnEnter || !wrapperRef.current) return;
    const total = stepsArray.length;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dots = wrapperRef.current?.querySelectorAll('.timeline-dot');
            stepEls.current.forEach((el, i) => {
              if (!el) return;
              setTimeout(() => {
                el.classList.add('revealed');
                const pct = Math.round(((i + 1) / total) * 100);
                if (progressRef.current) progressRef.current.style.width = `${pct}%`;
                updateDotsByPercent(pct);
              }, i * revealStaggerMs);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, [showAllSteps, autoRevealOnEnter, revealStaggerMs, stepsArray.length]);

  if (showAllSteps) {
    return (
      <div className="mx-auto w-full max-w-4xl" {...rest}>
        <div className="stepper-wrapper" ref={wrapperRef} style={{ ['--step-count' as any]: stepsArray.length }}>
          <div className="timeline" aria-hidden>
            <div className="timeline-line" />
            <div className="timeline-progress" ref={progressRef} />
            <div className="timeline-dots">
              {stepsArray.map((_, i) => (
                <div key={i} className="timeline-dot" data-index={i}>
                  <span className="timeline-dot-label">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stepper grid-flow-col gap-4 sm:gap-3 xs:gap-2 grid md:grid-cols-3">
            {stepsArray.map((child, i) => (
              <div 
                key={i} 
                ref={(el: HTMLDivElement | null) => { stepEls.current[i] = el; }} 
                className="step"
                data-step-index={i+1}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center p-4" {...rest}>
      <div className={`mx-auto w-full max-w-4xl rounded-4xl ${stepCircleContainerClassName}`}>
        <div className={`${stepContainerClassName} flex w-full items-center p-4`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      // if navigating forward, ensure current step validates
                      if (clicked > currentStep && validateStep && !validateStep(currentStep)) return;
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      if (clicked > currentStep && validateStep && !validateStep(currentStep)) return;
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper isCompleted={isCompleted} currentStep={currentStep} direction={direction} className={`space-y-2 px-4 ${contentClassName}`}>
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`px-4 pb-4 ${footerClassName}`}>
            <div className={`mt-6 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button onClick={handleBack} className="rounded px-2 py-1 text-neutral-600 hover:text-neutral-900" {...backButtonProps}>
                  {backButtonText}
                </button>
              )}
              <button onClick={isLastStep ? handleComplete : handleNext} className="flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#C7E70C_0%,#A3E635_100%)] py-2 px-4 font-medium text-[#07222b]" {...nextButtonProps}>
                {isLastStep ? finalButtonText : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className = '' }: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div style={{ position: 'relative', overflow: 'hidden' }} animate={{ height: isCompleted ? 0 : parentHeight }} transition={{ type: 'spring', duration: 0.4 }} className={className}>
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div ref={containerRef as any} custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} style={{ position: 'absolute', left: 0, right: 0, top: 0 }}>
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? '50%' : '-50%', opacity: 0 }),
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="px-4 py-2">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators = false }: StepIndicatorProps) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div onClick={handleClick} className="relative cursor-pointer outline-none focus:outline-none mx-2" animate={status} initial={false}>
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#e6e6e6' },
          active: { scale: 1.08, backgroundColor: '#A3E635' },
          complete: { scale: 1.0, backgroundColor: '#A3E635' },
        }}
        transition={{ duration: 0.28 }}
        className="flex h-10 w-10 items-center justify-center rounded-full font-semibold"
      >
        <span className={`text-sm font-semibold ${status === 'inactive' ? 'text-neutral-600' : 'text-[#07222b]'}`}>
          {step}
        </span>
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  // line animates width and color when a step is complete
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#C7E70C' } // green when complete
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded" style={{ backgroundColor: '#eef2f7' }}>
      <motion.div className="absolute left-0 top-0 h-full" variants={lineVariants} initial={false} animate={isComplete ? 'complete' : 'incomplete'} transition={{ duration: 0.4 }} />
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}


