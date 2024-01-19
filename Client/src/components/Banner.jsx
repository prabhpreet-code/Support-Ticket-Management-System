import React from 'react'

const Banner = () => {
  return (
    
     <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
      <div className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
        <p className="text-center text-xs font-semibold leading-normal md:text-sm">
          Share your thoughts
        </p>
      </div>
      <p className="text-center italic text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
        We would love to hear from you!
      </p>
      <p className="mx-auto max-w-4xl  text-center text-base text-gray-600 md:text-xl">
        Register Your Ticket
      </p>
    </div>
   
  )
}

export default Banner
