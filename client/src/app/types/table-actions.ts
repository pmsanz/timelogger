import { MouseEvent } from "react";

export type TableActionsType = {
  clickRowCallback: (value: number) => void;
  modifyCallback: (event: MouseEvent<HTMLButtonElement>, value: number) => void;
  deleteCallback: (event: MouseEvent<HTMLButtonElement>, value: number) => void;
};
