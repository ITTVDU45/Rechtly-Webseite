'use client';

import React from 'react';
import './DiagonalCards.css';

type CardData = {
  label: string;
  value: string;
};

interface DiagonalCardsProps {
  leftCards: CardData[];
  rightCards: CardData[];
}

const DiagonalCards: React.FC<DiagonalCardsProps> = ({ leftCards, rightCards }) => {
  return (
    <section className="diagonal-cards">
      <div className="diagonal-cards__container">
        <div className="diagonal-cards__grid">
          <div className="diagonal-cards__left">
            {leftCards.map((card, index) => (
              <div key={`left-${index}`} className="diagonal-card">
                <div className="diagonal-card__label">{card.label}</div>
                <div className="diagonal-card__value">{card.value}</div>
              </div>
            ))}
          </div>
          <div className="diagonal-cards__right">
            {rightCards.map((card, index) => (
              <div key={`right-${index}`} className="diagonal-card diagonal-card--dark">
                <div className="diagonal-card__label">{card.label}</div>
                <div className="diagonal-card__value">{card.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="diagonal-cards__disclaimer">
          *Es handelt sich um eine Beispielrechnung. Die tatsächlichen Ansprüche können im Einzelfall variieren.
        </div>
      </div>
    </section>
  );
};

export default DiagonalCards;
