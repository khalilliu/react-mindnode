import React, { useEffect, useState } from "react";

export default (callback: Function) => {
  const [flag, setFlag] = useState<number>(0);
  const handleResize = () => {
    setFlag(Date.now());
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    console.log('resize')
    callback();
  }, [flag]);
};
