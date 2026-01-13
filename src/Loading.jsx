import React from 'react';

const Loading = ({ children }) => (
  <div className="loading-container">
    <div className="flex items-center justify-center">
      <div
        className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-wp-blue-dark rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">{children}</span>
      </div>
    </div>
  </div>
);

export default Loading;
