import { captions } from "@locales/en/captions";

const Caption = () => {
  return (
    <section className="w-full flex-center flex-col px-5">
      <h1 className="head_text text-center">
        {captions.title}
        <br />
        <span className="orange_gradient text-center">{captions.subtitle}</span>
      </h1>
      <p className="desc text-center">{captions.description}</p>
    </section>
  );
};

export default Caption;
