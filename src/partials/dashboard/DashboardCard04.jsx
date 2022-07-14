import React from 'react';
import { HiArrowSmUp, HiChartBar } from 'react-icons/hi';

function DashboardCard01() {

  return (
    <div className="flex flex-col col-span-full sm:col-span-3 sm:col-span-3 bg-white shadow-lg rounded-2xl border border-slate-200">
      <div className="px-5 pt-5 mb-6">
        <div className='justify items-center mb-4'>
          <div className='flex'>
            <div className='flex items-start'>
              <div className='p-3 bg-purple-100 rounded-xl'>
                <HiChartBar className={`text-3xl text-purple-500`} />
              </div>
            </div>
            <div className='flex items-center ml-4'>
              <div className='justify items-center'>
                <h2 className="text-xs font-semibold text-slate-600">Weekly Consumption</h2>
                <h4 className='text-xl font-bold'>100K ltr.</h4>
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className="flex items-start">
            <div className='justify items-center mb-2'>
              <h2 className="text-xs font-semibold text-slate-400">Previous</h2>
              <h4>80K ltr.</h4>
            </div>
          </div>
          <div className="flex items-center ml-5">
            <div className='justify items-center mb-2'>
              <h2 className="text-xs font-semibold text-slate-400">Change</h2>
              <h4>+20.00%</h4>
            </div>
          </div>
          <div className="flex items-end ml-5">
            <div className='justify items-center mb-2'>
              <HiArrowSmUp className='text-2xl text-green-500' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
