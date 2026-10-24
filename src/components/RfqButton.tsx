import React from 'react';

/**
 * "Check our RFQ site" button.
 * Button only for now: nothing opens when it is clicked.
 * When the RFQ site link is ready, set RFQ_SITE_URL and the button
 * will open it in a new tab.
 */
export const RFQ_SITE_URL = '';

interface RfqButtonProps {
  className?: string;
  onAfterClick?: () => void;
}

export const RfqButton: React.FC<RfqButtonProps> = ({ className = '', onAfterClick }) => {
  const handleClick = () => {
    if (RFQ_SITE_URL) window.open(RFQ_SITE_URL, '_blank', 'noopener,noreferrer');
    onAfterClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center whitespace-nowrap font-semibold cursor-pointer bg-[#D2430F] hover:bg-[#A8340A] text-white transition-colors ${className}`}
    >
      Check our RFQ site
    </button>
  );
};
