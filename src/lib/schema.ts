import * as z from "zod";

// 일반 회원용 이름 필드
export const nameField = z
  .string()
  .min(1, "성함을 입력해주세요.")
  .min(2, "성함은 2자 이상이어야 합니다.")
  .max(8, "성함은 8자 이하이어야 합니다.")
  .refine((val) => !/\s/.test(val), "성함에 공백을 포함할 수 없습니다.");

// 문의하기용 이름 필드
export const contactNameField = z
  .string()
  .min(1, "성함을 입력해주세요.")
  .min(2, "성함은 2글자 이상 입력해주세요.")
  .max(20, "성함은 20자 이내로 입력해주세요.")
  .refine((val) => !/\s/.test(val), "이름에 공백을 포함할 수 없습니다.");

// 공통 이메일 필드
export const emailField = z
  .string()
  .min(1, "이메일을 입력해주세요.")
  .email("올바른 이메일 형식을 입력해주세요.");

// 공통 비밀번호 필드
export const passwordField = z
  .string()
  .min(1, "비밀번호를 입력해주세요.")
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "영문, 숫자, 특수문자를 모두 포함해야 합니다.",
  );

// 로그인 유효성 검사 스키마
export const signinSchema = z.object({
  email: emailField,
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

// 회원가입 유효성 검사 스키마
export const signupSchema = z
  .object({
    name: nameField,
    email: emailField,
    password: passwordField,
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

// 이름 수정 유효성 검사 스키마
export const nameUpdateSchema = z.object({
  name: nameField,
});

// 비밀번호 수정 유효성 검사 스키마
export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    newPassword: passwordField,
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "현재 비밀번호와 다른 신규 비밀번호를 입력해주세요.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "신규 비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 문의하기 유효성 검사 스키마
export const contactSchema = z.object({
  name: contactNameField,
  email: emailField,
  company: z
    .string()
    .max(20, "회사명은 20자 이내로 입력해주세요.")
    .refine((val) => val.length === 0 || val.length >= 2, {
      message: "회사명은 2글자 이상 입력해주세요.",
    })
    .optional()
    .or(z.literal("")),
  content: z.string().min(1, "문의 내용을 입력해주세요."),
});
