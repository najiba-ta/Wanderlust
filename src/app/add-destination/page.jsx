'use client'

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  TextArea,
  TextField,
  Select,
  Card,
} from "@heroui/react";

import {
  Globe,
  MapPinned,
  Wallet,
  CalendarDays,
  ImageIcon,
  FileText,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

const AddDestinationPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());

    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(destination),
      }
    );

    await res.json();

    toast.success("Destination added successfully!");
  };

  return (
    <div className="min-h-screen bg-[#081120] px-4 py-12 text-white">
      <div className="container mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
            <Sparkles size={16} />
            Travel Admin Panel
          </div>

          <h1 className="text-5xl font-bold tracking-tight">
            Add New Destination
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400">
            Create beautiful travel destinations with detailed information,
            pricing and travel experience for your users.
          </p>
        </div>

        {/* Card */}
        <Card className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1220]/95 shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

          {/* Glow */}
          <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <form
            onSubmit={onSubmit}
            className="relative z-10 p-8 md:p-10"
          >

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              {/* Destination Name */}
              <div className="md:col-span-2">
                <TextField name="destinationName" isRequired>
                  <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <MapPinned size={16} className="text-cyan-400" />
                    Destination Name
                  </Label>

                  <Input
                    placeholder="Bali Paradise"
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* Country */}
              <TextField name="country" isRequired>
                <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Globe size={16} className="text-cyan-400" />
                  Country
                </Label>

                <Input
                  placeholder="Indonesia"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

                <FieldError />
              </TextField>

              {/* Category */}
              <div>
                <Select
                  name="category"
                  isRequired
                  className="w-full"
                  placeholder="Select category"
                >
                  <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Sparkles size={16} className="text-cyan-400" />
                    Category
                  </Label>

                  <Select.Trigger className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="rounded-2xl border border-white/10 bg-[#0f172a] text-white backdrop-blur-xl">
                    <ListBox>
                      {[
                        "Beach",
                        "Mountain",
                        "City",
                        "Adventure",
                        "Cultural",
                        "Luxury",
                      ].map((item) => (
                        <ListBox.Item
                          key={item}
                          id={item}
                          textValue={item}
                          className="rounded-xl px-4 py-3 transition hover:bg-cyan-500/10"
                        >
                          {item}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Price */}
              <TextField name="price" type="number" isRequired>
                <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Wallet size={16} className="text-cyan-400" />
                  Price (USD)
                </Label>

                <Input
                  type="number"
                  placeholder="1299"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

                <FieldError />
              </TextField>

              {/* Duration */}
              <TextField name="duration" isRequired>
                <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <CalendarDays size={16} className="text-cyan-400" />
                  Duration
                </Label>

                <Input
                  placeholder="7 Days / 6 Nights"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

                <FieldError />
              </TextField>

              {/* Departure Date */}
              <div className="md:col-span-2">
                <TextField name="departureDate" type="date" isRequired>
                  <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <CalendarDays size={16} className="text-cyan-400" />
                    Departure Date
                  </Label>

                  <Input
                    type="date"
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired>
                  <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <ImageIcon size={16} className="text-cyan-400" />
                    Image URL
                  </Label>

                  <Input
                    type="url"
                    placeholder="https://example.com/bali.jpg"
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField name="description" isRequired>
                  <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FileText size={16} className="text-cyan-400" />
                    Description
                  </Label>

                  <TextArea
                    placeholder="Describe the travel experience..."
                    className="min-h-[150px] rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />

                  <FieldError />
                </TextField>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              <Button
                type="submit"
                className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-base font-semibold text-white shadow-[0_8px_30px_rgba(14,165,233,0.35)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_35px_rgba(14,165,233,0.45)] active:scale-[0.98]"
              >
                {/* Shine Animation */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <span className="relative">
                  Add Destination
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddDestinationPage;