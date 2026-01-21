"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { nameUpdateSchema, passwordUpdateSchema } from "@/src/lib/schema";
import * as z from "zod";

type NameInput = z.infer<typeof nameUpdateSchema>;
type PwInput = z.infer<typeof passwordUpdateSchema>;

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    email: "user@example.com",
  });

  const {
    register: regName,
    handleSubmit: handleNameSubmit,
    reset: resetName,
    formState: {
      errors: nameErrors,
      isSubmitting: isNameSubmitting,
      isDirty: isNameDirty,
    },
  } = useForm<NameInput>({
    resolver: zodResolver(nameUpdateSchema),
    defaultValues: { name: userInfo.name },
    mode: "onChange",
  });

  const {
    register: regPw,
    handleSubmit: handlePwSubmit,
    reset: resetPw,
    formState: {
      errors: pwErrors,
      isSubmitting: isPwSubmitting,
      isValid: isPwValid,
    },
  } = useForm<PwInput>({
    resolver: zodResolver(passwordUpdateSchema),
    mode: "onChange",
  });

  const onNameUpdate = (data: NameInput) => {
    console.log("이름이 성공적으로 변경되었습니다.");
    setUserInfo((prev) => ({ ...prev, name: data.name }));
    resetName({ name: data.name });
  };

  const onPwUpdate = (data: PwInput) => {
    console.log("비밀번호가 성공적으로 변경되었습니다.");
    resetPw();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <main className="py-24 px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <h1 className="text-3xl font-black text-gray-900">내 정보 관리</h1>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
              프로필 설정
            </h2>
            <form
              onSubmit={handleNameSubmit(onNameUpdate)}
              className="flex flex-col gap-6"
            >
              <Input label="이메일 계정" value={userInfo.email} disabled />

              <div className="flex flex-col items-end gap-2">
                <Input
                  label="이름"
                  placeholder="변경할 이름을 입력하세요"
                  error={nameErrors.name?.message}
                  {...regName("name")}
                />
                <Button
                  label="이름 변경"
                  isSubmitting={isNameSubmitting}
                  variant="primary"
                  fullWidth={false}
                  className="px-8 py-3 text-sm"
                  disabled={!isNameDirty || isNameSubmitting}
                />
              </div>
            </form>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
              비밀번호 변경
            </h2>
            <form
              onSubmit={handlePwSubmit(onPwUpdate)}
              className="flex flex-col gap-6"
            >
              <Input
                label="현재 비밀번호"
                isPassword
                placeholder="현재 비밀번호를 입력하세요"
                error={pwErrors.currentPassword?.message}
                {...regPw("currentPassword")}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="신규 비밀번호"
                  isPassword
                  placeholder="영문, 숫자, 특수문자 조합 (8자 이상)"
                  error={pwErrors.newPassword?.message}
                  {...regPw("newPassword")}
                />
                <Input
                  label="신규 비밀번호 확인"
                  isPassword
                  placeholder="비밀번호 재입력"
                  error={pwErrors.confirmPassword?.message}
                  {...regPw("confirmPassword")}
                />
              </div>

              <Button
                label="비밀번호 업데이트"
                isSubmitting={isPwSubmitting}
                className="mt-2"
                disabled={!isPwValid || isPwSubmitting}
              />
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
