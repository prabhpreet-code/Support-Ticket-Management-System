import React from 'react'

const Navbar = () => {
  return (
    <header className="relative w-full border-b bg-white pb-4">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
      <div className="inline-flex items-center space-x-2">

     <span className="font-bold mb-5 mt-2 text-[22px]">Support Ticket System</span>
      </div>
      <div className="hidden lg:block">
        <ul className="inline-flex space-x-8">
         <li>
            <a
              href="/"
              className="text-sm font-semibold text-gray-800 text-[18px] hover:text-gray-900"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm font-semibold text-gray-800 text-[18px] hover:text-gray-900"
            >
             Ticket 
            </a>
          </li>
          <li>
            <a
              href="/supportAgent"
              className="text-sm font-semibold text-gray-800 text-[18px] hover:text-gray-900"
            >
              Agent
            </a>
          </li>
          
        </ul>
      </div>
      
      <div className="lg:hidden">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-6 w-6 cursor-pointer"
        >
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg> */}
      </div>
    </div>
  </header>
  )
}

export default Navbar
