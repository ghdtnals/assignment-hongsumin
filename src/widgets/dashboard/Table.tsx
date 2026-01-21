"use client";

import { useState, useMemo } from "react";

import Select from "@/src/components/Select";
import SearchInput from "@/src/components/SearchInput";
import Pagination from "@/src/components/Pagination";

import { SORT_OPTIONS, TABLE_HEADERS } from "@/src/constants/Table";

interface TableProps {
  data: any[];
  totalCount: number;
  perPage: number;
}

const Table = ({ data, totalCount, perPage }: TableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "환자수",
    direction: "desc",
  });

  const filteredAndSortedData = useMemo(() => {
    if (!data) return [];

    let items = [...data];

    if (searchTerm) {
      items = items.filter((item) => {
        const department = String(item["진료과목(표시과목)"] || "");
        const hospitalType = String(item["의료기관종별"] || "");
        return (
          department.includes(searchTerm) || hospitalType.includes(searchTerm)
        );
      });
    }

    items.sort((a, b) => {
      const aValue = Number(a[sortConfig.key] || 0);
      const bValue = Number(b[sortConfig.key] || 0);
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    return items;
  }, [data, searchTerm, sortConfig]);

  const handleSortChange = (combinedValue: string) => {
    const [key, direction] = combinedValue.split("-");
    setSortConfig({ key, direction: direction as "asc" | "desc" });
  };

  return (
    <div className="mt-8 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="mb-6 flex justify-between gap-4 flex-row items-center">
        <h2 className="text-2xl font-extrabold text-gray-900">전체 데이터</h2>

        <div className="flex flex-wrap items-center gap-3 w-auto">
          <Select
            options={SORT_OPTIONS}
            selectedOption={`${sortConfig.key}-${sortConfig.direction}`}
            onSelect={handleSortChange}
            placeholder="정렬 선택"
          />
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="검색어를 입력하세요."
          />
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl border border-gray-200 shadow-inner">
        <table className="w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h.key}
                  className="border-b border-gray-200 px-6 py-4 text-center font-bold text-gray-700"
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAndSortedData.map((row, i) => (
              <tr key={i} className="transition-colors hover:bg-blue-50/50">
                <td className="border-b border-gray-100 px-6 py-4 text-center text-gray-600">
                  {row["진료년도"]}
                </td>
                <td className="whitespace-nowrap border-b border-gray-100 px-6 py-4 text-center">
                  <span className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700">
                    {row["의료기관종별"]}
                  </span>
                </td>
                <td className="border-b border-gray-100 px-6 py-4 font-bold text-gray-800">
                  {row["진료과목(표시과목)"]}
                </td>
                <td className="border-b border-gray-100 px-6 py-4 text-right">
                  {Number(row["명세서청구건수"] || 0).toLocaleString()}
                </td>
                <td className="border-b border-gray-100 px-6 py-4 text-right">
                  {Number(row["보험자부담금(선별포함)"] || 0).toLocaleString()}
                </td>
                <td className="border-b border-gray-100 px-6 py-4 text-right ">
                  {Number(
                    row["요양급여비용총액(선별포함)"] || 0,
                  ).toLocaleString()}
                </td>
                <td className="border-b border-gray-100 px-6 py-4 text-right text-[#ef4444]">
                  {Number(row["환자수"] || 0).toLocaleString()}
                </td>
                <td className="border-b border-gray-100 px-6 py-4 text-right text-[#3b82f6]">
                  {Number(row["입내원일수"] || 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Pagination
          totalItems={totalCount}
          itemsPerPage={perPage}
          maxPageButtons={5}
        />
      </div>
    </div>
  );
};

export default Table;
