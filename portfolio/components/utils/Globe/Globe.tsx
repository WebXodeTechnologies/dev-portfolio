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
    <div
    id="scene-container"
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 10,
      left: 0,
      right: 0,
      bottom: 0,
      animation: "fadeIn 1.5s ease-out",
      zIndex: 1, // Globe's base z-index (ensure it stays below text)
    }}
  >
    <div
      style={{
        width: "100%", // Adjust the size of the globe container to make it appropriately large
        height: "100%", // Adjust the size of the globe container
        maxWidth: "500px", // Prevents the globe from becoming too large on bigger screens
        overflow: "hidden",
        position: "relative",
        backgroundColor:"red",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)", // Soft shadow for an attractive look
      }}
    ></div>
  </div>
  );
}; 

export default Globe;
