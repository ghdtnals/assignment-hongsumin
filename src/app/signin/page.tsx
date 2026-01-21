"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import EyeOpenIcon from "@/src/assets/icons/eye-open.svg";
import EyeClosedIcon from "@/src/assets/icons/eye-closed.svg";

const signinSchema = z.object({
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "영문, 숫자, 특수문자를 모두 포함해야 합니다.",
    ),
});

type SigninInput = z.infer<typeof signinSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SigninInput) => {
    try {
      console.log("로그인 시도:", data);
      router.push("/");
    } catch (err) {
      console.error("로그인 오류:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">로그인</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              이메일
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              비밀번호
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                className={`w-full p-3 border rounded-xl outline-none transition-all ${
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
              >
                <img
                  src={showPassword ? EyeOpenIcon.src : EyeClosedIcon.src}
                  alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  className="w-5 h-5 opacity-60"
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 hover:cursor-pointer transition-all shadow-lg disabled:bg-gray-300"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          계정이 없으신가요?
          <Link
            href="/signup"
            className="ml-2 text-blue-600 font-bold hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
