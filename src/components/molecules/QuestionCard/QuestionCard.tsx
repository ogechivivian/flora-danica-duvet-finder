import React from 'react';
import { Button } from '../../atoms/Button';
import './QuestionCard.css';

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuestionCardProps {
  question: string;
  options: QuestionOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onNext?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  isLastQuestion?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  showBackButton = false,
  isLastQuestion = false,
}) => {
  return (
    <div className="question-card">
      <h2 className="question-card__title">{question}</h2>
      
      <div className="question-card__options" role="radiogroup" aria-labelledby="question-title">
        {options.map((option) => (
          <label
            key={option.value}
            className={`question-card__option ${
              selectedValue === option.value ? 'question-card__option--selected' : ''
            }`}
          >
            <input
              type="radio"
              name="question-option"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onSelect(option.value)}
              className="question-card__radio"
            />
            <div className="question-card__option-content">
              <div className="question-card__option-label">{option.label}</div>
              {option.description && (
                <div className="question-card__option-description">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      
      <div className="question-card__actions">
        {showBackButton && onBack && (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        {selectedValue && onNext && (
          <Button variant="primary" onClick={onNext}>
            {isLastQuestion ? 'Get Recommendations' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
};