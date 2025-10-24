import React, { useState } from 'react';
import type { DuvetRecommendation, Duvet } from '../../../types/duvet';
import { DuvetCard } from '../../molecules/DuvetCard';
import { Button } from '../../atoms/Button';
import { getRecommendationSummary } from '../../../utils/recommendations';
import './RecommendationResults.css';

export interface RecommendationResultsProps {
  recommendations: DuvetRecommendation[];
  onCompare: (duvet1: Duvet, duvet2: Duvet) => void;
  onStartOver: () => void;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  recommendations,
  onCompare,
  onStartOver,
}) => {
  const [selectedForComparison, setSelectedForComparison] = useState<Duvet[]>([]);

  const handleSelectForComparison = (duvet: Duvet) => {
    setSelectedForComparison(prev => {
      if (prev.find(d => d.id === duvet.id)) {
        // Remove from selection
        return prev.filter(d => d.id !== duvet.id);
      } else if (prev.length < 2) {
        // Add to selection
        return [...prev, duvet];
      } else {
        // Replace oldest selection
        return [prev[1], duvet];
      }
    });
  };

  const handleCompare = () => {
    if (selectedForComparison.length === 2) {
      onCompare(selectedForComparison[0], selectedForComparison[1]);
    }
  };

  const topRecommendations = recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <div className="recommendation-results">
      <div className="recommendation-results__header">
        <h2 className="recommendation-results__title">
          Your Duvet Recommendations
        </h2>
        <p className="recommendation-results__subtitle">
          Based on your preferences, here are the best matches for you
        </p>
        
        {selectedForComparison.length > 0 && (
          <div className="recommendation-results__comparison-controls">
            <p className="recommendation-results__comparison-text">
              {selectedForComparison.length === 1 
                ? 'Select one more duvet to compare'
                : `Compare ${selectedForComparison[0].name} vs ${selectedForComparison[1].name}`
              }
            </p>
            <div className="recommendation-results__comparison-buttons">
              {selectedForComparison.length === 2 && (
                <Button onClick={handleCompare}>
                  Compare Selected
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => setSelectedForComparison([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="recommendation-results__grid">
        {topRecommendations.map((recommendation, index) => (
          <div key={recommendation.duvet.id} className="recommendation-results__item">
            <div className="recommendation-results__rank">
              #{index + 1}
              <span className="recommendation-results__score">
                {Math.round(recommendation.score)}% match
              </span>
            </div>
            
            <DuvetCard
              duvet={recommendation.duvet}
              onClick={() => handleSelectForComparison(recommendation.duvet)}
              isSelected={selectedForComparison.some(d => d.id === recommendation.duvet.id)}
              showComparison={selectedForComparison.length > 0}
            />
            
            <div className="recommendation-results__explanation">
              <h4>Why this matches you:</h4>
              <p>{getRecommendationSummary(recommendation)}</p>
              
              <div className="recommendation-results__reasons">
                {recommendation.reasons.map((reason, idx) => (
                  <div 
                    key={idx}
                    className={`recommendation-results__reason ${
                      reason.match ? 'recommendation-results__reason--positive' : 'recommendation-results__reason--negative'
                    }`}
                  >
                    <strong>{reason.category}:</strong> {reason.reason}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recommendation-results__actions">
        <Button variant="outline" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </div>
  );
};