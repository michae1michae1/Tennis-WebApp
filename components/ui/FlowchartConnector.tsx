'use client';

import React from 'react';

interface FlowchartConnectorProps {
  elements: {
    id: string;
    label: string;
    icon: string;
  }[];
}

export default function FlowchartConnector({ elements }: FlowchartConnectorProps) {
  if (elements.length <= 1) {
    return null;
  }

  return (
    <div className="relative mt-2 mb-4">
      {elements.map((element, index) => {
        // Don't render connector after the last element
        if (index === elements.length - 1) return null;
        
        return (
          <div key={`connector-${element.id}-${index}`} className="relative flex justify-center py-2">
            <div className="absolute top-0 bottom-0 w-0.5 bg-primary"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white text-xs">
              →
            </div>
          </div>
        );
      })}
    </div>
  );
} 