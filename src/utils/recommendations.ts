import type { 
  Duvet, 
  UserPreferences, 
  DuvetRecommendation, 
  RecommendationReason,
  ComparisonDifference 
} from '../types/duvet';

export const calculateRecommendationScore = (
  duvet: Duvet,
  preferences: UserPreferences
): DuvetRecommendation => {
  let score = 0;
  const reasons: RecommendationReason[] = [];

  // Sleep temperature matching
  if (preferences.sleepTemperature) {
    const tempScore = getTemperatureScore(duvet.warmthLevel, preferences.sleepTemperature);
    score += tempScore.score;
    reasons.push({
      category: 'Temperature',
      reason: tempScore.reason,
      match: tempScore.score > 0,
    });
  }

  // Season matching
  if (preferences.season) {
    const seasonScore = getSeasonScore(duvet.season, preferences.season);
    score += seasonScore.score;
    reasons.push({
      category: 'Season',
      reason: seasonScore.reason,
      match: seasonScore.score > 0,
    });
  }

  // Allergy consideration
  if (preferences.allergies) {
    const allergyScore = getAllergyScore(duvet.allergyFriendly);
    score += allergyScore.score;
    reasons.push({
      category: 'Allergies',
      reason: allergyScore.reason,
      match: allergyScore.score > 0,
    });
  }

  // Budget consideration
  if (preferences.budget) {
    const budgetScore = getBudgetScore(duvet.price, preferences.budget);
    score += budgetScore.score;
    reasons.push({
      category: 'Budget',
      reason: budgetScore.reason,
      match: budgetScore.score > 0,
    });
  }

  // Sustainability consideration
  if (preferences.sustainability) {
    const sustainabilityScore = getSustainabilityScore(duvet.sustainability.sustainable);
    score += sustainabilityScore.score;
    reasons.push({
      category: 'Sustainability',
      reason: sustainabilityScore.reason,
      match: sustainabilityScore.score > 0,
    });
  }

  return {
    duvet,
    score: Math.max(0, Math.min(100, score)),
    reasons,
  };
};

const getTemperatureScore = (warmthLevel: string, sleepTemp: string) => {
  const matches: Record<string, string[]> = {
    cold: ['extra-warm', 'warm'],
    warm: ['medium', 'cool'],
    hot: ['cool'],
  };

  if (matches[sleepTemp]?.includes(warmthLevel)) {
    return {
      score: 25,
      reason: `Perfect warmth level for ${sleepTemp} sleepers`,
    };
  } else {
    return {
      score: -10,
      reason: `May be too ${warmthLevel === 'cool' ? 'cool' : 'warm'} for ${sleepTemp} sleepers`,
    };
  }
};

const getSeasonScore = (duvetSeason: string, prefSeason: string) => {
  if (duvetSeason === prefSeason || duvetSeason === 'all-season') {
    return {
      score: 20,
      reason: `Ideal for ${prefSeason} use`,
    };
  } else {
    return {
      score: -5,
      reason: `Designed for ${duvetSeason}, not optimal for ${prefSeason}`,
    };
  }
};

const getAllergyScore = (allergyFriendly: string) => {
  if (allergyFriendly === 'yes' || allergyFriendly === 'hypoallergenic') {
    return {
      score: 20,
      reason: 'Suitable for allergy sufferers with hypoallergenic materials',
    };
  } else {
    return {
      score: -15,
      reason: 'Contains materials that may trigger allergies',
    };
  }
};

const getBudgetScore = (price: number, budget: string) => {
  const budgetRanges = {
    low: { min: 0, max: 600 },
    medium: { min: 600, max: 1200 },
    high: { min: 1200, max: Infinity },
  };

  const range = budgetRanges[budget as keyof typeof budgetRanges];
  
  if (price >= range.min && price <= range.max) {
    return {
      score: 15,
      reason: `Fits within your ${budget} budget range`,
    };
  } else if (price < range.min) {
    return {
      score: 5,
      reason: 'Even more affordable than your budget',
    };
  } else {
    return {
      score: -10,
      reason: `Above your ${budget} budget range`,
    };
  }
};

const getSustainabilityScore = (isSustainable: boolean) => {
  if (isSustainable) {
    return {
      score: 10,
      reason: 'Made with sustainable materials and practices',
    };
  } else {
    return {
      score: -5,
      reason: 'Not certified as sustainable',
    };
  }
};

export const compareDuvets = (duvet1: Duvet, duvet2: Duvet): ComparisonDifference[] => {
  const differences: ComparisonDifference[] = [];

  const comparisons = [
    { property: 'price', label: 'Price', getValue: (d: Duvet) => `${d.price} ${d.currency}` },
    { property: 'warmthLevel', label: 'Warmth Level', getValue: (d: Duvet) => d.warmthLevel },
    { property: 'fillingType', label: 'Filling Type', getValue: (d: Duvet) => d.fillingType },
    { property: 'season', label: 'Season', getValue: (d: Duvet) => d.season },
    { property: 'allergyFriendly', label: 'Allergy Friendly', getValue: (d: Duvet) => d.allergyFriendly },
    { property: 'washable', label: 'Machine Washable', getValue: (d: Duvet) => d.washable ? 'Yes' : 'No' },
    { property: 'sustainable', label: 'Sustainable', getValue: (d: Duvet) => d.sustainability.sustainable ? 'Yes' : 'No' },
    { property: 'weight', label: 'Weight', getValue: (d: Duvet) => `${d.weight}g` },
    { property: 'threadCount', label: 'Thread Count', getValue: (d: Duvet) => d.threadCount.toString() },
    { property: 'rating', label: 'Rating', getValue: (d: Duvet) => `${d.rating}/5` },
  ];

  for (const comparison of comparisons) {
    const value1 = comparison.getValue(duvet1);
    const value2 = comparison.getValue(duvet2);
    
    differences.push({
      property: comparison.property,
      label: comparison.label,
      duvet1Value: value1,
      duvet2Value: value2,
      isDifferent: value1 !== value2,
    });
  }

  return differences;
};

export const getRecommendationSummary = (recommendation: DuvetRecommendation): string => {
  const positiveReasons = recommendation.reasons.filter(r => r.match);
  const negativeReasons = recommendation.reasons.filter(r => !r.match);

  let summary = `This duvet scores ${Math.round(recommendation.score)}% match. `;

  if (positiveReasons.length > 0) {
    summary += `It's great because: ${positiveReasons.map(r => r.reason).join(', ')}. `;
  }

  if (negativeReasons.length > 0) {
    summary += `Consider that: ${negativeReasons.map(r => r.reason).join(', ')}.`;
  }

  return summary;
};