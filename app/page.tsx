"use client";

import Caption from "@components/home/Caption";
import Carousel from "@components/home/Carousel";
import Feed from "@components/home/Feed";
import LearnMoreHome from "@components/home/LearnMoreHome";
import usePathNameStore from "@store/usePathNameStore";
import { useEffect } from "react";

const Home = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);
  useEffect(() => {
    setPathName("/");
  }, []);
  return (
    <>
      <Caption />
      <Carousel />
      <Feed />
      <LearnMoreHome />
    </>
  );
};

export default Home;
