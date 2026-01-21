export const SORT_OPTIONS = [
  { label: "청구건수 많은순", value: "명세서청구건수-desc" },
  { label: "청구건수 적은순", value: "명세서청구건수-asc" },
  { label: "보험자부담금 높은순", value: "보험자부담금(선별포함)-desc" },
  { label: "보험자부담금 낮은순", value: "보험자부담금(선별포함)-asc" },
  { label: "요양급여총액 높은순", value: "요양급여비용총액(선별포함)-desc" },
  { label: "요양급여총액 낮은순", value: "요양급여비용총액(선별포함)-asc" },
  { label: "환자수 많은순", value: "환자수-desc" },
  { label: "환자수 적은순", value: "환자수-asc" },
  { label: "입내원일수 많은순", value: "입내원일수-desc" },
  { label: "입내원일수 적은순", value: "입내원일수-asc" },
];

export const TABLE_HEADERS = [
  { label: "진료년도", key: "진료년도" },
  { label: "의료기관종별", key: "의료기관종별" },
  { label: "진료과목", key: "진료과목(표시과목)" },
  { label: "청구건수", key: "명세서청구건수" },
  { label: "보험자부담금", key: "보험자부담금" },
  { label: "요양급여총액", key: "요양급여비용총액" },
  { label: "환자수", key: "환자수" },
  { label: "입내원일수", key: "입내원일수" },
];
