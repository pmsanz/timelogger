import React, { FC } from "react";

import { GrDescend, GrAscend } from "react-icons/gr";
import { TableColumnType } from "../types/table-column";
import { TableActionsType } from "../types/table-actions";

type TableProps = {
  columns: TableColumnType[];
  data: any[];
  rowKey: string;
  actions: TableActionsType;
};

const Table: FC<TableProps> = ({ columns, data, actions, rowKey }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={`${col.title + index}`} className="table-th">
                {col.title}
                {col?.sortCallback ? (
                  <>
                    <button
                      className="ml-2"
                      onClick={() => {
                        col?.sortCallback && col?.sortCallback(true);
                      }}
                    >
                      <GrAscend />
                    </button>
                    <button
                      className="ml-2"
                      onClick={() => {
                        col?.sortCallback && col?.sortCallback(false);
                      }}
                    >
                      <GrDescend />
                    </button>
                  </>
                ) : null}
              </th>
            ))}
            <th className="table-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item[rowKey]}
              className="bg-white border-b  hover:bg-gray-100 hover:cursor-pointer"
              onClick={() => actions.clickRowCallback(item[rowKey])}
            >
              {columns.map((col, index) => {
                if (index === 0) {
                  return (
                    <td
                      key={index}
                      className="table-td font-medium text-gray-700"
                    >
                      {item[col.prop]}
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="table-td">
                      {item[col.prop]}
                    </td>
                  );
                }
              })}
              <td className="table-td">
                <button
                  className="font-medium text-blue-600 hover:underline"
                  onClick={(e) => actions.modifyCallback(e, item[rowKey])}
                >
                  Modify
                </button>
                <button
                  className="font-medium text-red-600 hover:underline ml-2"
                  onClick={(e) => actions.deleteCallback(e, item[rowKey])}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
