import React, { ReactNode } from 'react';

import GradientText from '../components/ui/text/GradientText';

/**
 * Processes text and converts special gradient patterns into GradientText components
 * Pattern format: {{gradient:text}} or {{gradient:text:startColor:endColor}}
 *
 * @param text - The text to process
 * @returns Array of React nodes with gradient text applied where specified
 */
export const textWithGradient = (text: string, mainTitle = false): ReactNode[] => {
  // Match {{gradient:text}} or {{gradient:text:startColor:endColor}}
  const pattern = /\{\{gradient:(.*?)(?::(.*?):(.*?))?\}\}/g;
  const parts: ReactNode[] = [];

  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Add regular text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const gradientText = match[1];
    const startColor = match[2]; // Optional
    const endColor = match[3]; // Optional

    // Create GradientText component with optional colors
    if (startColor && endColor) {
      parts.push(
        <GradientText
          key={`gradient-${match.index}`}
          startColor={startColor}
          endColor={endColor}
          mainTitle={mainTitle}
        >
          {gradientText}
        </GradientText>,
      );
    } else {
      parts.push(
        <GradientText mainTitle={mainTitle} key={`gradient-${match.index}`}>
          {gradientText}
        </GradientText>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

/**
 * Wraps the textWithGradient function to return a React fragment
 * Useful when you need to return a single React element
 *
 * @param text - The text to process
 * @returns React fragment containing processed text
 */
export const renderWithGradient = (text: string): React.ReactElement => (
  <>{textWithGradient(text)}</>
);
