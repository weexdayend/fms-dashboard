import React from 'react';

function WelcomeBanner() {
  return (
    <div className="relative bg-indigo-100 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

      {/* Background illustration */}
      <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
        <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
            <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
            <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Good evening! 👋</h1>
        <p>Here it is our monitoring data for today:</p>
      </div>

    </div>
  );
}

export default WelcomeBanner;
