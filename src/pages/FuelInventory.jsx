import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';

function Transactions() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <main>
          <h1>Fuel Inventory</h1>
        </main>

      </div>
    </div>
  );
}

export default Transactions;