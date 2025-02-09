import { ChevronsUpDown } from "lucide-react";
import DropDownMenu from "./DropDownMenu";
import { useState } from "react";

export default function Table({ columns, data, setItem, item, children, dropDown }) {
  const [sortedBy, setSortedBy] = useState({ col: "", mode: "ASC" });
  const keys = columns.map((col) => col.accessor);

  const changeCol = (col) => {
    setSortedBy((prev) =>
      prev.col === col ? { ...prev, mode: prev.mode === "ASC" ? "DESC" : "ASC" } : { col: col, mode: "ASC" }
    );
  };

  function number(a, b) {
    return sortedBy.mode === "ASC" ? a - b : b - a;
  }
  function strings(a, b) {
    const nameA = String(a).toLowerCase();
    const nameB = String(b).toLowerCase();
    if (nameA < nameB) return sortedBy.mode === "ASC" ? -1 : 1;
    if (nameA > nameB) return sortedBy.mode === "ASC" ? 1 : -1;
    return 0;
  }
  
  const sortedData = data.sort((a, b) =>
    isNaN(a[sortedBy.col]) ? strings(a[sortedBy.col], b[sortedBy.col]) : number(a[sortedBy.col], b[sortedBy.col])
  );

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-50">
        <thead className="bg-gray-100 dark:bg-gray-900">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => changeCol(col.accessor)}>
                  {col.colName}
                  <ChevronsUpDown size={16} className="hover:text-gray-500 dark:hover:text-gray-300" />
                </div>
              </th>
            ))}
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((t, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 even:bg-gray-50 dark:even:bg-gray-900 transition"
            >
              {keys.map((key) =>
                Array.isArray(t[key]) ? (
                  <td className="px-4 py-2 text-sm font-medium flex flex-wrap gap-1">
                    {t[key].map((g, idx) => (
                      <span key={idx} className="border px-2 py-1 text-xs rounded-lg dark:border-purple-400 dark:bg-purple-600">
                        {g}
                      </span>
                    ))}
                  </td>
                ) : (
                  <td className="px-4 py-2 text-sm">{t[key]}</td>
                )
              )}
              <td className="px-4 py-2 text-right text-sm font-medium">
                {dropDown ? (
                  <DropDownMenu item={t} setSelectedItem={setItem} selectedItem={item}>
                    {children}
                  </DropDownMenu>
                ) : (
                  children
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
