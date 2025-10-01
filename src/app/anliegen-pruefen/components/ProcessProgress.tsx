import React from 'react';

type ProcessProgressProps = {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  onSelectStep?: (step: number) => void;
};

export default function ProcessProgress({ currentStep, totalSteps, steps, onSelectStep }: ProcessProgressProps) {
  return (
    <div className="process-progress">
      <div className="steps-progress">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const cls = `step ${stepNum === currentStep ? 'active' : ''} ${stepNum < currentStep ? 'completed' : ''}`;
          return (
            <React.Fragment key={index}>
              <button
                type="button"
                className={cls}
                onClick={() => onSelectStep ? onSelectStep(stepNum) : undefined}
                aria-label={step}
                title={step}
              >
                <div className="step-number">{stepNum}</div>
              </button>
              {index < steps.length - 1 && (
                <div className={`connector ${stepNum < currentStep ? 'completed' : ''}`} aria-hidden />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}


