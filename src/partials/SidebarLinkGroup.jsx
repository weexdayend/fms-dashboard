import React, { useState } from 'react';

function SidebarLinkGroup({
  children,
  activecondition,
}) {

  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <li className={`rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${open && 'bg-gray-200 hover:bg-gray-200'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;