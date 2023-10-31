export type TableColumnType = {
  title: string;
  prop: string;
  sortCallback?: (value: boolean) => void;
};
