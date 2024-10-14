"use client";

import usePathNameStore from "@store/usePathNameStore";
import { useEffect } from "react";

const SolutionsPage = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);
  useEffect(() => {
    setPathName("/solutions");
  }, []);
  return <div>El blog</div>;
};

export default SolutionsPage;
