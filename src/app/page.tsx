"use client";

import { useState, useEffect, useCallback } from "react";
import Chart from "../widgets/home/chart";
import Table from "../widgets/home/Table";
import ContactForm from "../components/ContactForm";
import Button from "../components/Button";
import Sidebar, { MenuType } from "@/src/widgets/home/SideBar";
import { getDashboardData } from "@/src/lib/api";

export default function Home() {
  const [currentMenu, setCurrentMenu] = useState<MenuType>("대시보드 홈");
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [chartData, setChartData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [chartPage, setChartPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const perPage = 10;

  const handleMenuChange = (menu: MenuType) => {
    setCurrentMenu(menu);
    if (menu === "문의") setIsContactSubmitted(false);
    if (menu === "대시보드 홈") setCurrentTablePage(1);
  };

  const fetchChartData = useCallback(async (targetPage: number) => {
    try {
      const { data } = await getDashboardData(targetPage, 20);
      setChartData((prev) => (targetPage === 1 ? data : [...prev, ...data]));
      setChartPage(targetPage);
    } catch (error) {
      console.error("차트 데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  }, []);

  const fetchTableData = useCallback(
    async (targetPage: number) => {
      try {
        setLoading(true);
        const { data, totalCount } = await getDashboardData(
          targetPage,
          perPage,
        );
        setTableData(data);
        setTotalCount(totalCount);
      } catch (error) {
        console.error(
          "테이블 데이터를 불러오는 중 오류가 발생했습니다:",
          error,
        );
      } finally {
        setLoading(false);
      }
    },
    [perPage],
  );

  useEffect(() => {
    fetchChartData(1);
  }, [fetchChartData]);

  useEffect(() => {
    if (currentMenu === "대시보드 홈") {
      fetchTableData(currentTablePage);
    }
  }, [currentTablePage, currentMenu, fetchTableData]);

  return (
    <div className="flex pt-16 min-h-screen bg-gray-50">
      <Sidebar currentMenu={currentMenu} onMenuChange={handleMenuChange} />

      <main className="flex-1 ml-50 p-8 pb-24 min-w-0">
        <div className="max-w-1200 mx-auto">
          <h1 className="text-2xl font-black text-gray-900 mb-8">
            {currentMenu}
          </h1>

          {currentMenu === "대시보드 홈" && (
            <div className="flex flex-col gap-10">
              <section>
                <div className="flex justify-between items-end min-w-0 mb-4">
                  <span className="text-blue-600 font-bold text-sm uppercase">
                    Visual Analytics
                  </span>
                </div>
                <Chart
                  data={chartData}
                  onLoadMore={() => fetchChartData(chartPage + 1)}
                  hasMore={true}
                />
              </section>

              <section>
                <span className="text-blue-600 font-bold text-sm uppercase mb-4 block">
                  Data Statistics
                </span>
                <Table
                  data={tableData}
                  totalCount={totalCount}
                  perPage={perPage}
                  currentPage={currentTablePage}
                  onPageChange={(page) => setCurrentTablePage(page)}
                />
              </section>
            </div>
          )}

          {currentMenu === "문의" && (
            <div className="max-w-2xl mx-auto py-4">
              {isContactSubmitted ? (
                <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6">
                    ✓
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    문의가 접수되었습니다!
                  </h2>
                  <p className="text-gray-500 mb-10 leading-relaxed">
                    내용 확인 후 최대한 빨리 답변 드리겠습니다.
                  </p>
                  <div className="flex flex-col w-full gap-3">
                    <Button
                      label="대시보드로 돌아가기"
                      variant="primary"
                      onClick={() => handleMenuChange("대시보드 홈")}
                    />
                    <Button
                      label="다른 문의 접수하기"
                      variant="outline"
                      onClick={() => setIsContactSubmitted(false)}
                    />
                  </div>
                </div>
              ) : (
                <ContactForm onSuccess={() => setIsContactSubmitted(true)} />
              )}
            </div>
          )}

          {currentMenu === "설정" && (
            <div className="text-gray-600">설정 페이지입니다.</div>
          )}
        </div>
      </main>
    </div>
  );
}
