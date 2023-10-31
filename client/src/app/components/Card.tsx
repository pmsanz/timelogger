import React, { FC } from "react";

type CardProp = {
  title?: string;
};
const Card: FC<CardProp> = ({ children, title }) => {
  return (
    <div className="paper mt-8 p-10">
      {title ? (
        <h1 className="text-2xl font-medium mb-8 text-center">{title}</h1>
      ) : null}
      {children}
    </div>
  );
};

export default Card;
