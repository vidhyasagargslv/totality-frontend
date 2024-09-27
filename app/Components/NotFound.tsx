import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <h2 className="text-2xl font-bold mb-4">No Properties Found</h2>
      <p className="text-gray-600">Please try adjusting your filters.</p>
    </div>
  );
};

export default NotFound;