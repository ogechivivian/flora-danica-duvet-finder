import React, { useState } from 'react';
import type { UserPreferences } from '../../../types/duvet';
import type { QuestionOption } from '../../molecules/QuestionCard';
import { QuestionCard } from '../../molecules/QuestionCard';
import './GuidedSelection.css';

const questions = [
  {
    id: 'sleepTemperature',
    question: 'How do you typically sleep?',
    options: [
      { 
        value: 'cold', 
        label: 'I get cold easily', 
        description: 'You prefer extra warmth and cozy bedding' 
      },
      { 
        value: 'warm', 
        label: 'I sleep at normal temperature', 
        description: 'You like moderate warmth, not too hot or cold' 
      },
      { 
        value: 'hot', 
        label: 'I get warm easily', 
        description: 'You prefer lighter, cooler bedding' 
      },
    ] as QuestionOption[],
  },
  {
    id: 'season',
    question: 'Which season do you need the duvet for?',
    options: [
      { 
        value: 'summer', 
        label: 'Summer', 
        description: 'Light and breathable for warm nights' 
      },
      { 
        value: 'winter', 
        label: 'Winter', 
        description: 'Extra warmth for cold nights' 
      },
      { 
        value: 'spring-autumn', 
        label: 'Spring/Autumn', 
        description: 'Moderate warmth for transitional seasons' 
      },
      { 
        value: 'all-season', 
        label: 'All seasons', 
        description: 'Versatile comfort year-round' 
      },
    ] as QuestionOption[],
  },
  {
    id: 'allergies',
    question: 'Do you have allergies or sensitivities?',
    options: [
      { 
        value: 'true', 
        label: 'Yes, I have allergies', 
        description: 'Need hypoallergenic materials' 
      },
      { 
        value: 'false', 
        label: 'No allergies', 
        description: 'All materials are fine for me' 
      },
    ] as QuestionOption[],
  },
  {
    id: 'budget',
    question: 'What is your budget range?',
    options: [
      { 
        value: 'low', 
        label: 'Budget-friendly (Under 600 DKK)', 
        description: 'Great value options' 
      },
      { 
        value: 'medium', 
        label: 'Mid-range (600-1200 DKK)', 
        description: 'Balance of quality and price' 
      },
      { 
        value: 'high', 
        label: 'Premium (1200+ DKK)', 
        description: 'Top quality and luxury features' 
      },
    ] as QuestionOption[],
  },
  {
    id: 'sustainability',
    question: 'How important is sustainability to you?',
    options: [
      { 
        value: 'true', 
        label: 'Very important', 
        description: 'I prefer eco-friendly and sustainable products' 
      },
      { 
        value: 'false', 
        label: 'Not a priority', 
        description: 'Other factors are more important to me' 
      },
    ] as QuestionOption[],
  },
];

export interface GuidedSelectionProps {
  onComplete: (preferences: UserPreferences) => void;
}

export const GuidedSelection: React.FC<GuidedSelectionProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Convert answers to UserPreferences
      const preferences: UserPreferences = {
        sleepTemperature: answers.sleepTemperature as any,
        season: answers.season as any,
        allergies: answers.allergies === 'true',
        budget: answers.budget as any,
        sustainability: answers.sustainability === 'true',
      };
      onComplete(preferences);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="guided-selection">
      <div className="guided-selection__progress">
        <div className="guided-selection__progress-bar">
          <div 
            className="guided-selection__progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="guided-selection__progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedValue={answers[currentQuestion.id]}
        onSelect={handleAnswer}
        onNext={handleNext}
        onBack={handleBack}
        showBackButton={currentQuestionIndex > 0}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
};