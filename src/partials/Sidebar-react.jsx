import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

import {
  BiHomeCircle,
  BiFoodMenu,
  BiSpreadsheet,
  BiUser,
  BiReceipt
} from 'react-icons/bi';

import {
  FiChevronRight,
} from 'react-icons/fi';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 border-r border-slate-300 drop-shadow-sm bg-zinc-100 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >

        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <div width="32" height="32" viewBox="0 0 32 32">
            FMS
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <ul className="mt-3">

              {/* Dashboard */}
              <li className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${pathname === '/' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                <NavLink end to="/" className={`block truncate transition duration-150 ${pathname === '/' && 'font-semibold text-blue-600'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiHomeCircle className={`text-xl text-slate-400 ${pathname === '/' && 'text-blue-600'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                  </div>
                </NavLink>
              </li>

              {/* Transactions */}
              <li className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${pathname === '/transactions' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                <NavLink end to="/transactions" className={`block truncate transition duration-150 ${pathname === '/transactions' && 'font-semibold text-blue-600'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiReceipt className={`text-xl text-slate-400 ${pathname === '/transactions' && 'text-blue-600'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Transactions</span>
                  </div>
                </NavLink>
              </li>

              {/* Fuel Inventory */}
              <li className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 ${pathname === '/fuel-inventory' && 'bg-slate-900'}`}>
                <NavLink end to="/fuel-inventory" className={`block text-slate-400 hover:text-slate-800 truncate transition duration-150 ${pathname === '/fuel-inventory' && 'font-bold text-zinc-100 hover:text-zinc-50'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiFoodMenu className={`text-xl text-slate-400 ${pathname === '/fuel-inventory' && 'text-green-500'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Fuel Inventory</span>
                  </div>
                </NavLink>
              </li>

              {/* Event Viewer */}
              <li className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 ${pathname === '/event-viewer' && 'bg-slate-900'}`}>
                <NavLink end to="/event-viewer" className={`block text-slate-400 hover:text-slate-800 truncate transition duration-150 ${pathname === '/event-viewer' && 'font-bold text-zinc-100 hover:text-zinc-50'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiSpreadsheet className={`text-xl text-slate-400 ${pathname === '/event-viewer' && 'text-green-500'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Event Viewer</span>
                  </div>
                </NavLink>
              </li>

              <h3 className="text-xs uppercase text-slate-300 pl-3 mt-10 mb-5">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Master Data</span>
              </h3>

              {/* E-Commerce */}
              <SidebarLinkGroup activecondition={pathname.includes('ecommerce')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a href="#0" className={`block text-slate-400 hover:block truncate transition duration-150 ${pathname.includes('ecommerce') && 'hover:text-slate-200'}`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BiUser className={`text-xl text-slate-400 ${pathname === '/fuel-inventory' && 'text-green-500'}`} />
                            <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Accounts</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <FiChevronRight className={`text-xl text-slate-400 transition ${open && 'transform rotate-90 transition'}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-12 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Customers</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Orders</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Invoices</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Shop</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Shop 2</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Single Product</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Cart</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Cart 2</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Pay</span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;