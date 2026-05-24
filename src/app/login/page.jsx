"use client";

import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import React from "react";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";

import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Login successful!");
      router.push("/");
    }

    if (error) {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-[#081120] px-4 py-20 text-white">
      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300 backdrop-blur-md">
            <Sparkles size={16} />
            Welcome Back
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Login
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Access your travel dashboard
          </p>
        </div>

        {/* Card */}
        <Card className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1220]/95 p-6 shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

          {/* Glow */}
          <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

          <Form
            onSubmit={onSubmit}
            className="relative z-10 flex w-full flex-col gap-5"
          >

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
            >
              <Label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} className="text-cyan-400" />
                Email
              </Label>

              <Input
                placeholder="john@example.com"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
            >
              <Label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
                <Lock size={16} className="text-cyan-400" />
                Password
              </Label>

              <Input
                placeholder="Enter your password"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />

              <Description className="text-xs text-gray-500">
                Use your registered credentials
              </Description>

              <FieldError />
            </TextField>

            {/* Button */}
            <Button
              type="submit"
              className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(14,165,233,0.35)] transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <LogIn size={16} className="relative" />
              <span className="relative">Login</span>
            </Button>

          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;