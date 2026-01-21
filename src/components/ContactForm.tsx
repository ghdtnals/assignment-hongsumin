"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { contactSchema } from "@/src/lib/schema";
import Input from "./Input";
import Button from "./Button";

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      content: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    localStorage.setItem(
      "latestContact",
      JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
      }),
    );
    onSuccess();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          label="* 성함"
          placeholder="성함을 입력해주세요."
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="* 이메일"
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="회사 (선택)"
          placeholder="회사명을 입력해주세요."
          error={errors.company?.message}
          {...register("company")}
        />

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            * 내용
          </label>
          <textarea
            rows={5}
            placeholder="문의 내용을 입력해주세요."
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none text-sm ${
              errors.content
                ? "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-blue-500"
            }`}
            {...register("content")}
          />
          {errors.content && (
            <p className="mt-1 text-red-500 text-xs font-medium">
              {errors.content.message}
            </p>
          )}
        </div>

        <Button type="submit" label="제출하기" variant="primary" />
      </form>
    </div>
  );
};

export default ContactForm;
