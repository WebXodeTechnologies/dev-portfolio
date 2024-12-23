"use client"; // Ensures this component is client-side only

import { useEffect } from "react";
import { globeConfig } from "../../utils/config.globe";
import { World } from "../Globe/index";

const Globe = () => {
  useEffect(() => {
    const initializeGlobe = () => {
      const container = document.getElementById("scene-container");
      if (container && !container.querySelector("canvas")) {
        const world = new World(container, undefined, globeConfig);
        world.start();
      }
    };

    if (typeof window !== "undefined") {
      initializeGlobe();
    }

    return () => {
      const container = document.getElementById("scene-container");
      if (container) container.innerHTML = ""; // Clear the container
    };
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      <div className="relative">
        {/* Globe rendering container */}
        <div className="relative">
          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none z-10" />

          {/* Globe container */}
          <div id="scene-container" className="relative" />
        </div>
      </div>
    </div>
  );
};

export default Globe;
