import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-dvh flex justify-center items-center flex-col gap-2">
      <h1 className="text-4xl mb-5">404 PAGE NOT FOUND</h1>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 px-6
        to-blue-700 hover:bg-gradient-to-br active:brightness-75 font-medium rounded-lg py-2.5 text-center"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default NotFound;
