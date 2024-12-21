import React from "react";
import { MacbookScroll } from "../components/ui/macbook-scroll";
import Link from "next/link";
import Image1 from "../public/b1.svg";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden w-full">
      <h1 className="heading text-center my-4">
        Revolutionizing Digital Interactions
      </h1>
      <h3 className="text-purple heading mt-10 text-center"> Explore Now</h3>
      <MacbookScroll
        title={
          <span className="mb-5">
            Scroll-Through Excellence: Interactive Web Design in Action
          </span>
        }
        src={Image1}
        showGradient={false}
      />
    </div>
  );
}
