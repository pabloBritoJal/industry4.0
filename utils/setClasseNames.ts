import classNames from "classnames";

const setClasseNames = (isOpen: boolean) => {
  const classNameLinks = classNames(
    "absolute left-0 top-20 bg-white w-full h-screen lg:h-1 lg:block lg:static lg:bg-transparent lg:col-span-2",
    {
      hidden: !isOpen,
    }
  );
  const classNameInputSearch = classNames(
    "absolute top-[360px] lg:top-0 z-50 left-0 px-8 w-full lg:relative lg:items-center lg:flex lg:px-3",
    {
      hidden: !isOpen,
    }
  );
  const classNameCloseIcon = classNames({
    hidden: !isOpen,
  });
  const classNameHambrugerIcon = classNames({
    hidden: isOpen,
  });
  return {
    classNameLinks,
    classNameInputSearch,
    classNameCloseIcon,
    classNameHambrugerIcon,
  };
};

export default setClasseNames;
