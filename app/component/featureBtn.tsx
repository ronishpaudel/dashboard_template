import React, { useState } from "react";

const FeaturedProduct = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div>Featured Product</div>
      <button
        onClick={toggleButton}
        type="button"
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
          isToggled
            ? "bg-orange-500 dark:bg-orange-500"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <span className="sr-only">Toggle</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            isToggled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export { FeaturedProduct };
