import React from 'react';
import type { Duvet } from '../../../types/duvet';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { compareDuvets } from '../../../utils/recommendations';
import './DuvetComparison.css';

export interface DuvetComparisonProps {
  duvet1: Duvet;
  duvet2: Duvet;
  onBack: () => void;
}

export const DuvetComparison: React.FC<DuvetComparisonProps> = ({
  duvet1,
  duvet2,
  onBack,
}) => {
  const differences = compareDuvets(duvet1, duvet2);

  const formatPrice = (price: number, currency: string) => {
    return `${price} ${currency}`;
  };

  const getComparisonSummary = () => {
    const priceDiff = duvet1.price - duvet2.price;
    const summary = [];

    if (Math.abs(priceDiff) > 100) {
      summary.push(
        priceDiff > 0 
          ? `${duvet2.name} is ${Math.abs(priceDiff)} DKK cheaper`
          : `${duvet1.name} is ${Math.abs(priceDiff)} DKK cheaper`
      );
    }

    const warmthDiff = differences.find(d => d.property === 'warmthLevel');
    if (warmthDiff?.isDifferent) {
      summary.push(`Different warmth levels: ${warmthDiff.duvet1Value} vs ${warmthDiff.duvet2Value}`);
    }

    const allergyDiff = differences.find(d => d.property === 'allergyFriendly');
    if (allergyDiff?.isDifferent) {
      const allergyFriendly = allergyDiff.duvet1Value === 'yes' || allergyDiff.duvet1Value === 'hypoallergenic' 
        ? duvet1.name : duvet2.name;
      summary.push(`${allergyFriendly} is better for allergies`);
    }

    return summary.length > 0 ? summary.join('. ') : 'Both duvets are quite similar in key features.';
  };

  return (
    <div className="duvet-comparison">
      <div className="duvet-comparison__header">
        <Button variant="outline" onClick={onBack}>
          ← Back to Results
        </Button>
        <h2 className="duvet-comparison__title">Duvet Comparison</h2>
      </div>

      <div className="duvet-comparison__summary">
        <h3>Key Differences</h3>
        <p>{getComparisonSummary()}</p>
      </div>

      <div className="duvet-comparison__grid">
        <div className="duvet-comparison__product">
          <div className="duvet-comparison__product-header">
            <img 
              src={duvet1.imageUrl} 
              alt={duvet1.name}
              className="duvet-comparison__image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder-duvet.jpg';
              }}
            />
            <div>
              <h3 className="duvet-comparison__product-title">{duvet1.name}</h3>
              <p className="duvet-comparison__product-brand">{duvet1.brand}</p>
              <div className="duvet-comparison__price">
                {formatPrice(duvet1.price, duvet1.currency)}
              </div>
            </div>
          </div>
        </div>

        <div className="duvet-comparison__vs">VS</div>

        <div className="duvet-comparison__product">
          <div className="duvet-comparison__product-header">
            <img 
              src={duvet2.imageUrl} 
              alt={duvet2.name}
              className="duvet-comparison__image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder-duvet.jpg';
              }}
            />
            <div>
              <h3 className="duvet-comparison__product-title">{duvet2.name}</h3>
              <p className="duvet-comparison__product-brand">{duvet2.brand}</p>
              <div className="duvet-comparison__price">
                {formatPrice(duvet2.price, duvet2.currency)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="duvet-comparison__details">
        <h3>Detailed Comparison</h3>
        <div className="duvet-comparison__table">
          <div className="duvet-comparison__table-header">
            <div className="duvet-comparison__table-cell">Feature</div>
            <div className="duvet-comparison__table-cell">{duvet1.name}</div>
            <div className="duvet-comparison__table-cell">{duvet2.name}</div>
          </div>
          
          {differences.map((diff) => (
            <div 
              key={diff.property}
              className={`duvet-comparison__table-row ${
                diff.isDifferent ? 'duvet-comparison__table-row--different' : ''
              }`}
            >
              <div className="duvet-comparison__table-cell duvet-comparison__table-cell--label">
                {diff.label}
                {diff.isDifferent && (
                  <Badge variant="warning" size="small">Different</Badge>
                )}
              </div>
              <div className="duvet-comparison__table-cell">
                {diff.duvet1Value.toString()}
              </div>
              <div className="duvet-comparison__table-cell">
                {diff.duvet2Value.toString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="duvet-comparison__features">
        <div className="duvet-comparison__features-column">
          <h4>{duvet1.name} Features</h4>
          <ul>
            {duvet1.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="duvet-comparison__features-column">
          <h4>{duvet2.name} Features</h4>
          <ul>
            {duvet2.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};