"use client"; // Ensures this component is client-side only

import { useEffect } from "react";
import { globeConfig } from "../../utils/config.globe";
import { World } from "../Globe/index";

const Globe = () => {
  useEffect(() => {
    // Ensure this only runs in the browser, as the code depends on the DOM and window
    if (typeof window !== "undefined") {
      // Check if the canvas doesn't exist already
      if (!document.getElementById("globe-canvas")) {
        const container = document.querySelector("#scene-container");
        const world = new World(container as Element, undefined, globeConfig);
        world.start();
      }
    }

    // Cleanup function to remove the globe when the component is unmounted
    return () => {
      const canvasElement = document.getElementById("globe-canvas");
      if (canvasElement) {
        canvasElement.remove();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      id="scene-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 40,
        left: 100,
        right: 0,
        bottom: 0,
        animation: "fadeIn 1.5s ease-out",
        zIndex: 1, // Globe's base z-index (ensure it stays below text)
      }}
    >
      <div
        style={{
          width: "90%", // Adjust the size of the globe container to make it appropriately large
          height: "90%", // Adjust the size of the globe container
          maxWidth: "300px", // Prevents the globe from becoming too large on bigger screens
          overflow: "hidden",
          position: "relative",
          borderRadius: "50%", // Keep it circular
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)", // Soft shadow for an attractive look
        }}
      ></div>
    </div>
  );
};

export default Globe;
