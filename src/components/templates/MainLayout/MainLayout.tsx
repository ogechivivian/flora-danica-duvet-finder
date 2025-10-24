import React, { useState } from 'react';
import type { UserPreferences, Duvet, DuvetRecommendation } from '../../../types/duvet';
import { GuidedSelection } from '../../organisms/GuidedSelection';
import { RecommendationResults } from '../../organisms/RecommendationResults';
import { DuvetComparison } from '../../organisms/DuvetComparison';
import { calculateRecommendationScore } from '../../../utils/recommendations';
import duvetDataJson from '../../../data/duvets.json';
import './MainLayout.css';

const duvetData = duvetDataJson as { duvets: Duvet[] };

type AppState = 'welcome' | 'selection' | 'results' | 'comparison';

export const MainLayout: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [recommendations, setRecommendations] = useState<DuvetRecommendation[]>([]);
  const [comparisonDuvets, setComparisonDuvets] = useState<[Duvet, Duvet] | null>(null);

  const handleStartSelection = () => {
    setAppState('selection');
  };

  const handleSelectionComplete = (preferences: UserPreferences) => {
    // Calculate recommendations based on preferences
    const recommendations = duvetData.duvets.map(duvet => 
      calculateRecommendationScore(duvet, preferences)
    );
    
    setRecommendations(recommendations);
    setAppState('results');
  };

  const handleCompare = (duvet1: Duvet, duvet2: Duvet) => {
    setComparisonDuvets([duvet1, duvet2]);
    setAppState('comparison');
  };

  const handleBackToResults = () => {
    setAppState('results');
    setComparisonDuvets(null);
  };

  const handleStartOver = () => {
    setAppState('welcome');
    setRecommendations([]);
    setComparisonDuvets(null);
  };

  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="main-layout__header-content">
          <h1 className="main-layout__title">Flora Danica Duvet Finder</h1>
          <p className="main-layout__subtitle">
            Find the perfect duvet for your sleep comfort
          </p>
        </div>
      </header>

      <main className="main-layout__main">
        {appState === 'welcome' && (
          <div className="main-layout__welcome">
            <div className="main-layout__welcome-content">
              <h2>Welcome to Your Personal Duvet Guide</h2>
              <p>
                Finding the right duvet can transform your sleep quality. Our interactive guide 
                will help you discover the perfect Flora Danica duvet based on your personal 
                preferences, sleep habits, and lifestyle needs.
              </p>
              <div className="main-layout__welcome-features">
                <div className="main-layout__feature">
                  <span className="main-layout__feature-icon">🎯</span>
                  <div>
                    <h3>Personalized Recommendations</h3>
                    <p>Answer a few simple questions to get tailored suggestions</p>
                  </div>
                </div>
                <div className="main-layout__feature">
                  <span className="main-layout__feature-icon">⚖️</span>
                  <div>
                    <h3>Side-by-Side Comparison</h3>
                    <p>Compare any two duvets to understand the differences</p>
                  </div>
                </div>
                <div className="main-layout__feature">
                  <span className="main-layout__feature-icon">🛏️</span>
                  <div>
                    <h3>Expert Guidance</h3>
                    <p>Get detailed explanations for why each duvet suits you</p>
                  </div>
                </div>
              </div>
              <button 
                className="main-layout__start-button"
                onClick={handleStartSelection}
              >
                Start Finding Your Perfect Duvet
              </button>
            </div>
          </div>
        )}

        {appState === 'selection' && (
          <GuidedSelection onComplete={handleSelectionComplete} />
        )}

        {appState === 'results' && (
          <RecommendationResults
            recommendations={recommendations}
            onCompare={handleCompare}
            onStartOver={handleStartOver}
          />
        )}

        {appState === 'comparison' && comparisonDuvets && (
          <DuvetComparison
            duvet1={comparisonDuvets[0]}
            duvet2={comparisonDuvets[1]}
            onBack={handleBackToResults}
          />
        )}
      </main>

      <footer className="main-layout__footer">
        <p>&copy; 2025 Flora Danica. Part of Dykon A/S. All rights reserved.</p>
      </footer>
    </div>
  );
};