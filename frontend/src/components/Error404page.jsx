import React from 'react';
import { Link } from 'react-router-dom';

const Error404page = () => {
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to={'/home'}>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </Link>
    </div>
  );
};

export default Error404page;
