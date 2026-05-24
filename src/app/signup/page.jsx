"use client";

import React, { useState } from "react";
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

import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";

import {
  Mail,
  User,
  Image,
  Lock,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signUp.email({
        email: user.email,
        image: user.image,
        name: user.name,
        password: user.password,
      });

      if (data) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else if (error) {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-[#081120] px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
            <Sparkles size={16} />
            Join Wanderlust
          </div>

          <h1 className="text-4xl font-bold">Create Account</h1>

          <p className="mt-3 text-sm text-gray-400">
            Sign up to explore premium travel experiences
          </p>
        </div>

        {/* Card */}
        <Card className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1220]/95 p-6 shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

          <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

          <Form
            onSubmit={onSubmit}
            className="relative z-10 flex flex-col gap-5"
          >

            {/* Name */}
            <TextField isRequired name="name" type="text">
              <Label className="flex items-center gap-2 text-gray-300">
                <User size={16} className="text-cyan-400" /> Name
              </Label>
              <Input className="input" placeholder="Enter your name" />
              <FieldError />
            </TextField>

            {/* Image */}
            <TextField name="image" type="url">
              <Label className="flex items-center gap-2 text-gray-300">
                <Image size={16} className="text-cyan-400" /> Image URL
              </Label>
              <Input className="input" placeholder="Image URL" />
              <FieldError />
            </TextField>

            {/* Email */}
            <TextField isRequired name="email" type="email">
              <Label className="flex items-center gap-2 text-gray-300">
                <Mail size={16} className="text-cyan-400" /> Email
              </Label>
              <Input className="input" placeholder="john@example.com" />
              <FieldError />
            </TextField>

            {/* Password */}
            <TextField isRequired name="password" type="password">
              <Label className="flex items-center gap-2 text-gray-300">
                <Lock size={16} className="text-cyan-400" /> Password
              </Label>
              <Input className="input" placeholder="Enter password" />
              <Description className="text-xs text-gray-500">
                Min 8 chars, uppercase & number
              </Description>
              <FieldError />
            </TextField>

            {/* Submit Button with Loader */}
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold transition hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Loading...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </Form>

          {/* Google */}
          <Button
            onClick={handleGoogleSignIn}
            className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Sign up with Google
          </Button>
        </Card>
      </div>

      {/* global input style helper */}
      <style jsx>{`
        .input {
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;