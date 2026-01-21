const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ApiResponse {
  data: any[];
  totalCount: number;
}

export const getDashboardData = async (
  page: number,
  perPage: number,
): Promise<ApiResponse> => {
  const url = `${BASE_URL}?page=${page}&perPage=${perPage}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Infuser ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    data: result.data || [],
    totalCount: result.totalCount || 0,
  };
};
