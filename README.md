# Flora Danica Duvet Finder

An interactive React + TypeScript application to help users find the perfect Flora Danica duvet based on their personal preferences and sleep habits.

## Project Overview

This project is developed as part of the MMD 3rd semester Web Development specialization for Dykon A/S. It demonstrates modern web technologies to create an engaging user experience for duvet selection.

## Features

- **Guided Selection Process**: 5-question interactive flow to understand user preferences
- **Personalized Recommendations**: Algorithm-based matching with detailed explanations
- **Side-by-Side Comparison**: Compare any two duvets with highlighted differences
- **Atomic Design Architecture**: Structured component hierarchy for maintainability
- **Full Accessibility**: Keyboard navigation, ARIA labels, and proper focus management

## Technology Stack

- **React 18** with **TypeScript** for type-safe component development
- **Vite** for fast development and building
- **Atomic Design** pattern for component organization
- **CSS3** with custom properties for styling
- **JSON** data storage for duvet information

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd flora-danica-tool
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Atomic Design Structure

### Atoms
- **Button**: Interactive button with variants and accessibility features
- **Card**: Container component with different visual states
- **Badge**: Small informational labels with color coding

### Molecules
- **DuvetCard**: Product display card with image, details, and selection state
- **QuestionCard**: Interactive question interface with radio button options

### Organisms
- **GuidedSelection**: Complete question flow with progress tracking
- **RecommendationResults**: Grid display of recommended duvets with explanations
- **DuvetComparison**: Side-by-side product comparison interface

### Templates
- **MainLayout**: Application wrapper with header, main content, and footer

## Recommendation Algorithm

The recommendation system evaluates duvets based on:

1. **Sleep Temperature Matching** (25 points)
2. **Season Compatibility** (20 points)
3. **Allergy Considerations** (20 points)
4. **Budget Alignment** (15 points)
5. **Sustainability Preferences** (10 points)

Each duvet receives a score out of 100, with detailed explanations for matches and mismatches.

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- ARIA labels and roles for screen readers
- Keyboard navigation support for all interactive elements
- Focus indicators that meet WCAG contrast requirements
- Alternative text for all images
- Form labels and fieldsets for question groups

## Contributors

- MMD Web Development Team
- Project supervised by Laila Nadine V. Kjær & Luise Lind Steenholdt
