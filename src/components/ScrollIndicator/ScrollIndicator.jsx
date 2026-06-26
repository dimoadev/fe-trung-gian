import React, { useEffect, useState } from "react";
import "./index.css";

function ScrollIndicator() {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    window?.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div
        id="progressbar"
        className="z-10"
        style={{ width: `${scrollTop}%` }}
      ></div>
    </>
  );
}

export default ScrollIndicator;
