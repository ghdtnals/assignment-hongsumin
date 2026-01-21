"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { signupSchema } from "@/src/lib/schema";

type SignupInput = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignupInput) => {
    try {
      console.log("회원가입 시도:", data);
      router.push("/signin");
    } catch (err) {
      console.error("회원가입 오류:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">회원가입</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              성함
            </label>
            <input
              {...register("name")}
              type="text"
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                errors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="홍길동"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              이메일
            </label>
            <input
              {...register("email")}
              type="email"
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              {...register("password")}
              type="password"
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="영문, 숫자, 특수문자 조합 8자 이상"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              {...register("passwordConfirm")}
              type="password"
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                errors.passwordConfirm
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 hover:cursor-pointer transition-all shadow-lg disabled:bg-gray-300"
          >
            {isSubmitting ? "회원가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있으신가요?
          <Link
            href="/signin"
            className="ml-2 text-blue-600 font-bold hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
