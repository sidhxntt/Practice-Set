import React from 'react'

const Loading = () => {
  return (
    <section className="bg-white">
    <div className="container px-6 py-10 mx-auto animate-pulse">
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
        {[...Array(8)].map((_, index) => (
          <div className="w-full" key={index}>
            <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
            <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg"></h1>
            <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg"></p>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Loading