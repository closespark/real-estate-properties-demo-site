'use client';

import { useEffect } from 'react';

interface HubSpotCTAProps {
  ctaId: string;
  portalId: string;
}

export default function HubSpotCTA({ ctaId, portalId }: HubSpotCTAProps) {
  useEffect(() => {
    // Load HubSpot CTA script
    const script = document.createElement('script');
    script.src = `//cta-redirect.hubspot.com/cta/redirect/${portalId}/${ctaId}`;
    script.async = true;
    script.defer = true;
    
    const wrapper = document.getElementById(`hubspot-cta-${ctaId}`);
    if (wrapper) {
      wrapper.appendChild(script);
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [ctaId, portalId]);

  return (
    <div 
      id={`hubspot-cta-${ctaId}`} 
      className="hubspot-cta-wrapper"
    />
  );
}
