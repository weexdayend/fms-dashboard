import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

import {
  BiHomeCircle,
  BiFoodMenu,
  BiSpreadsheet,
  BiUser,
  BiReceipt,
  BiCar,
  BiGitBranch,
  BiGasPump,
  BiFolderOpen,
  BiMessageError,
  BiRightArrowCircle,

  BiCaretRight,
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
        <div className="flex justify-between py-5 sm:px-2">
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
          <NavLink end to="/" className="items-center">
            <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
              <span className="text-md truncate transition text-blue-500 duration-150">FMS</span>
            </span>
            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <div className="px-6">
                <div className="block items-center truncate transition duration-150">
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block text-2xl tracking-wide text-slate-400">DASHBOARD</span>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block text-xs tracking-wide text-blue-500">Fuel Management System</span>
                </div>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="space-y-8">
          <div>
            <ul className="mt-auto">

              {/* Dashboard */}
              <li className={`px-3 py-3 rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${pathname === '/' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                <NavLink end to="/" className={`block truncate transition duration-150 text-slate-500 ${pathname === '/' && 'font-semibold text-blue-500'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiHomeCircle className={`text-xl text-slate-500 ${pathname === '/' && 'text-blue-500'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                  </div>
                </NavLink>
              </li>

              {/* Transactions */}
              <li className={`px-3 py-3 rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${pathname === '/transactions' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                <NavLink end to="/transactions" className={`block truncate transition duration-150 text-slate-500 ${pathname === '/transactions' && 'font-semibold text-blue-500'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiReceipt className={`text-xl text-slate-500 ${pathname === '/transactions' && 'text-blue-500'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Transactions</span>
                  </div>
                </NavLink>
              </li>

              {/* Fuel Inventory */}
              <li className={`px-3 py-3 rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${pathname === '/fuel-inventory' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                <NavLink end to="/fuel-inventory" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/fuel-inventory' && 'font-semibold text-blue-500'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiFoodMenu className={`text-xl text-slate-500 ${pathname === '/fuel-inventory' && 'text-blue-500'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Fuel Inventory</span>
                  </div>
                </NavLink>
              </li>

              {/* Event Viewer */}
              <li className={`px-3 py-3 rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${pathname === '/event-viewer' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                <NavLink end to="/event-viewer" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/event-viewer' && 'font-semibold text-blue-500'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiSpreadsheet className={`text-xl text-slate-500 ${pathname === '/event-viewer' && 'text-blue-500'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Event Viewer</span>
                  </div>
                </NavLink>
              </li>

              <h3 className="text-xs uppercase text-slate-300 pl-3 mt-8 mb-5">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
                <span className="lg:hidden lg:sidebar-expanded:block truncate transition duration-150 2xl:block">Master Data</span>
              </h3>

              {/* Accounts */}
              <SidebarLinkGroup activecondition={pathname.includes('account')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a href="#0" className={`block px-3 py-3 rounded-md`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BiUser className={`text-xl text-slate-500`} />
                            <span className="text-sm text-slate-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Accounts</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <FiChevronRight className={`text-xl text-slate-500 transition ${open && 'transform rotate-90 transition'}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block rounded-md bg-gray-200 transition-all ease-in duration-200 2xl:block">
                        <ul className={`${!open && 'hidden'}`}>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/account/users' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/account/users' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/account/users" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/account/users' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/account/users' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">List User</span>
                              </div>
                            </NavLink>
                          </li>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/account/users/form' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/account/users/form' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/account/users/form" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/account/users/form' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/account/users/form' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Create User</span>
                              </div>
                            </NavLink>
                          </li>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/account/roles' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/account/roles' && 'bg-slate-900 hover:none'}`}>
                            <NavLink end to="/account/roles" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/account/roles' && 'font-bold text-zinc-100 hover:text-zinc-50'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/account/roles' && 'text-green-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">List Role</span>
                              </div>
                            </NavLink>
                          </li>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/account/roles/form' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/account/roles/form' && 'bg-slate-900 hover:none'}`}>
                            <NavLink end to="/account/roles/form" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/account/roles/form' && 'font-bold text-zinc-100 hover:text-zinc-50'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/account/roles/form' && 'text-green-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Create Role</span>
                              </div>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Equipments */}
              <SidebarLinkGroup activecondition={pathname.includes('equipments')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a href="#0" className={`block px-3 py-3 rounded-md`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BiCar className={`text-xl text-slate-500`} />
                            <span className="text-sm text-slate-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Equipments</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <FiChevronRight className={`text-xl text-slate-500 transition ${open && 'transform rotate-90 transition'}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block rounded-md bg-gray-200 transition-all ease-in duration-200 2xl:block">
                        <ul className={`${!open && 'hidden'}`}>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/equipments/list' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/equipments/list' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/equipments/list" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/equipments/list' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/equipments/list' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">List Equipment</span>
                              </div>
                            </NavLink>
                          </li>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/equipments/group' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/equipments/group' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/equipments/group" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/equipments/group' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/equipments/group' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Equipment Group</span>
                              </div>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Vendor */}
              <SidebarLinkGroup activecondition={pathname.includes('vendor')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a href="#0" className={`block px-3 py-3 rounded-md`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BiGitBranch className={`text-xl text-slate-500`} />
                            <span className="text-sm text-slate-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Vendors</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <FiChevronRight className={`text-xl text-slate-500 transition ${open && 'transform rotate-90 transition'}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block rounded-md bg-gray-200 transition-all ease-in duration-200 2xl:block">
                        <ul className={`${!open && 'hidden'}`}>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/vendor/list' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/vendor/list' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/vendor/list" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/vendor/list' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/vendor/list' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Vendor List</span>
                              </div>
                            </NavLink>
                          </li>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/vendor/services' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/vendor/services' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/vendor/services" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/vendor/services' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/vendor/services' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Vendor Services</span>
                              </div>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* anks */}
              <SidebarLinkGroup activecondition={pathname.includes('tanks')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a href="#0" className={`block px-3 py-3 rounded-md`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BiGasPump className={`text-xl text-slate-500`} />
                            <span className="text-sm text-slate-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tanks</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <FiChevronRight className={`text-xl text-slate-500 transition ${open && 'transform rotate-90 transition'}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`${!open && 'hidden'}`}>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/tanks/list' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/tanks/list' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/tanks/list" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/tanks/list' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/tanks/list' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Vendor List</span>
                              </div>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Datas */}
              <SidebarLinkGroup activecondition={pathname.includes('datas')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a href="#0" className={`block px-3 py-3 rounded-md`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BiFolderOpen className={`text-xl text-slate-500`} />
                            <span className="text-sm text-slate-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Datas</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <FiChevronRight className={`text-xl text-slate-500 transition ${open && 'transform rotate-90 transition'}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`${!open && 'hidden'}`}>
                          <li className={`pl-7 py-3 rounded-md ${pathname !== '/datas/list' && 'hover:bg-gray-300 ease-in duration-200'} ${pathname === '/datas/list' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                            <NavLink end to="/datas/list" className={`block text-slate-500 truncate transition duration-150 ${pathname === '/datas/list' && 'font-semibold text-blue-500'}`}>
                              <div className="flex items-center">
                                <div viewBox="0 0 24 24">
                                  <BiCaretRight className={`text-sm text-slate-500 ${pathname === '/datas/list' && 'text-blue-500'}`} />
                                </div>
                                <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Vendor List</span>
                              </div>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <h3 className="text-xs uppercase text-slate-300 pl-3 mt-8 mb-5">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
                <span className="lg:hidden lg:sidebar-expanded:block truncate transition duration-150 2xl:block">Others</span>
              </h3>

              {/* Error Reasons */}
              <li className={`px-3 py-3 rounded-md mb-0.5 last:mb-0 hover:bg-gray-200 ease-in duration-200 ${pathname === '/error-reasons' && 'bg-indigo-100 hover:bg-indigo-100'}`}>
                <NavLink end to="/error-reasons" className={`block truncate transition duration-150 text-slate-500 ${pathname === '/error-reasons' && 'font-semibold text-blue-500'}`}>
                  <div className="flex items-center">
                    <div viewBox="0 0 24 24">
                      <BiMessageError className={`text-xl text-slate-500 ${pathname === '/error-reasons' && 'text-blue-500'}`} />
                    </div>
                    <span className="text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Error Reasons</span>
                  </div>
                </NavLink>
              </li>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <BiRightArrowCircle className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;