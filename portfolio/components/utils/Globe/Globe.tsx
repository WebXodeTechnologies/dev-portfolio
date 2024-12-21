"use client"; // Ensures this component is client-side only

import { useEffect } from "react";
import { globeConfig } from "../../utils/config.globe";
import { World } from "../Globe/index";

const Globe = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = document.getElementById("scene-container");
      if (container && !container.querySelector("canvas")) {
        const world = new World(container, undefined, globeConfig);
        world.start();
      }
    }

    return () => {
      const container = document.getElementById("scene-container");
      if (container) {
        container.innerHTML = ""; // Clear the container
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Container with max width and height restrictions */}
      <div className="relative w-full h-full overflow-hidden">
        
        {/* Globe container */}
        <div className="relative w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
          {/* The gradient at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b pointer-events-none from-transparent dark:to-black to-white z-40" />
          
          {/* Globe rendering container */}
          <div className="absolute top-0 left-0 right-10 w-full h-full z-10">
            <div id="scene-container" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globe;
