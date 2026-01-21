"use client";

import React, { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

interface ChartProps {
  data: any[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const Chart = ({ data, onLoadMore, hasMore }: ChartProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const xAxisRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (xAxisRef.current) {
      xAxisRef.current.scrollLeft = target.scrollLeft;
    }

    if (!onLoadMore || !hasMore) return;
    if (target.scrollWidth - (target.scrollLeft + target.clientWidth) < 150) {
      onLoadMore();
    }
  };

  const ITEM_WIDTH = 120;
  const chartInnerWidth = Math.max(data.length * ITEM_WIDTH, 1200);
  const CHART_HEIGHT = 400;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="relative flex w-full" style={{ height: CHART_HEIGHT }}>
        <div style={{ width: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 50, left: 10, right: 0, bottom: 50 }}
            >
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 10, fill: "#ef4444", fontWeight: "bold" }}
                tickCount={5}
                axisLine={{ stroke: "#ef4444" }}
                tickLine={{ stroke: "#ef4444" }}
              >
                <Label
                  value="환자수"
                  position="top"
                  offset={20}
                  style={{ fontSize: 12, fill: "#ef4444", fontWeight: "bold" }}
                />
              </YAxis>
              <XAxis hide />
              <Line
                yAxisId="left"
                dataKey="환자수"
                stroke="transparent"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar z-10"
          style={{ width: "calc(100% - 200px)" }}
        >
          <div style={{ width: chartInnerWidth, height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                style={{ aspectRatio: 1.618 }}
                data={data}
                margin={{
                  top: 50,
                  right: ITEM_WIDTH / 2,
                  left: ITEM_WIDTH / 2,
                  bottom: 50,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f5f5f5"
                />
                <XAxis
                  dataKey="진료과목(표시과목)"
                  padding={{ left: 0, right: 0 }}
                  hide
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 10, fill: "#ef4444", fontWeight: "bold" }}
                  axisLine={{ stroke: "#ef4444" }}
                  tickLine={{ stroke: "#ef4444" }}
                  hide
                >
                  <Label
                    value="환자수"
                    position="top"
                    offset={20}
                    style={{
                      fontSize: 12,
                      fill: "#ef4444",
                      fontWeight: "bold",
                    }}
                  />
                </YAxis>
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 10, fill: "#3b82f6", fontWeight: "bold" }}
                  axisLine={{ stroke: "#3b82f6" }}
                  tickLine={{ stroke: "#3b82f6" }}
                  hide
                >
                  <Label
                    value="일수"
                    position="top"
                    offset={20}
                    style={{
                      fontSize: 12,
                      fill: "#3b82f6",
                      fontWeight: "bold",
                    }}
                  />
                </YAxis>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: any) => [
                    Number(value).toLocaleString() + " 명",
                    "",
                  ]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="환자수"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#ef4444",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="입내원일수"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#3b82f6",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ width: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 50, right: 10, left: 0, bottom: 50 }}
            >
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 10, fill: "#3b82f6", fontWeight: "bold" }}
                axisLine={{ stroke: "#3b82f6" }}
                tickLine={{ stroke: "#3b82f6" }}
              >
                <Label
                  value="일수"
                  position="top"
                  offset={20}
                  style={{ fontSize: 12, fill: "#3b82f6", fontWeight: "bold" }}
                />
              </YAxis>
              <XAxis hide />
              <Line
                yAxisId="right"
                dataKey="입내원일수"
                stroke="transparent"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex w-full mt-2 border-t border-gray-50">
        <div style={{ width: 100 }} className="flex-none" />
        <div
          ref={xAxisRef}
          className="overflow-hidden flex-none no-scrollbar"
          style={{ width: "calc(100% - 200px)" }}
        >
          <div style={{ width: chartInnerWidth }} className="flex">
            {data.map((item, index) => (
              <div
                key={index}
                style={{ width: ITEM_WIDTH }}
                className="flex-none text-center text-[12px] text-gray-700 font-medium py-3 break-keep px-2"
              >
                {item["진료과목(표시과목)"]}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 100 }} className="flex-none" />
      </div>

      <div className="flex justify-center gap-8 border-t border-gray-50 pt-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
          <span className="text-sm font-bold text-gray-700">환자수 (명)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
          <span className="text-sm font-bold text-gray-700">
            입내원일수 (일)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chart;
