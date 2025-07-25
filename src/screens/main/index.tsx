import React from 'react'

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Tailwind Test</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
        Click me!
      </button>
    </div>
  </div>
  )
}

export default MainPage
