import React from 'react';
import type { Duvet } from '../../../types/duvet';
import { Card } from '../../atoms/Card';
import { Badge } from '../../atoms/Badge';
import './DuvetCard.css';

export interface DuvetCardProps {
  duvet: Duvet;
  onClick?: () => void;
  isSelected?: boolean;
  showComparison?: boolean;
}

export const DuvetCard: React.FC<DuvetCardProps> = ({
  duvet,
  onClick,
  isSelected = false,
  showComparison = false,
}) => {
  const formatPrice = (price: number, currency: string) => {
    return `${price} ${currency}`;
  };

  const getWarmthColor = (warmth: string) => {
    switch (warmth) {
      case 'cool': return 'info';
      case 'medium': return 'success';
      case 'warm': return 'warning';
      case 'extra-warm': return 'error';
      default: return 'info';
    }
  };

  return (
    <Card
      variant={isSelected ? 'highlighted' : showComparison ? 'comparison' : 'default'}
      onClick={onClick}
      aria-label={`${duvet.name} - ${formatPrice(duvet.price, duvet.currency)}`}
      className="duvet-card"
    >
      <div className="duvet-card__image">
        <img 
          src={duvet.imageUrl} 
          alt={duvet.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-duvet.jpg';
          }}
        />
      </div>
      
      <div className="duvet-card__content">
        <h3 className="duvet-card__title">{duvet.name}</h3>
        <p className="duvet-card__brand">{duvet.brand}</p>
        
        <div className="duvet-card__badges">
          <Badge variant={getWarmthColor(duvet.warmthLevel)} size="small">
            {duvet.warmthLevel.replace('-', ' ')}
          </Badge>
          <Badge variant="info" size="small">
            {duvet.season}
          </Badge>
          {duvet.allergyFriendly === 'yes' && (
            <Badge variant="success" size="small">
              Allergy Friendly
            </Badge>
          )}
          {duvet.sustainability.sustainable && (
            <Badge variant="success" size="small">
              Sustainable
            </Badge>
          )}
        </div>
        
        <p className="duvet-card__description">{duvet.description}</p>
        
        <div className="duvet-card__details">
          <div className="duvet-card__price">
            {formatPrice(duvet.price, duvet.currency)}
          </div>
          <div className="duvet-card__rating">
            <span className="duvet-card__stars">
              {'★'.repeat(Math.floor(duvet.rating))}
              {'☆'.repeat(5 - Math.floor(duvet.rating))}
            </span>
            <span className="duvet-card__review-count">
              ({duvet.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};