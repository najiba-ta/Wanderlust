"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";

import {
  Pencil,
  Globe,
  CalendarDays,
  ImageIcon,
  FileText,
  Wallet,
  Sparkles,
  MapPinned,
} from "lucide-react";

import toast from "react-hot-toast";

export function EditModal({ dest }) {
  const {
    _id,
    imageUrl,
    price,
    country,
    destinationName,
    duration,
    category,
    description,
    departureDate,
  } = dest;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(destination),
      }
    );

    await res.json();

    toast.success("Destination updated successfully!");
  };

  return (
    <Modal>

      {/* Trigger Button */}
      <div className="flex justify-end">
        <Button
          variant="light"
          className="group h-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/40 hover:bg-cyan-400/20 hover:text-white active:scale-[0.98]"
        >
          Edit Destination

          <Pencil
            size={17}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
        </Button>
      </div>

      <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
        <Modal.Container placement="auto">

          <Modal.Dialog className="max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/10 bg-[#0b1220] text-white shadow-[0_20px_80px_rgba(0,0,0,0.65)] sm:max-w-3xl">

            {/* Glow */}
            <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            <Modal.CloseTrigger className="absolute right-5 top-5 text-gray-500 transition hover:text-white" />

            {/* Header */}
            <Modal.Header className="relative z-10 border-b border-white/5 px-8 pb-6 pt-8">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                  <Pencil
                    size={28}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <Modal.Heading className="text-3xl font-bold tracking-tight text-white">
                    Edit Destination
                  </Modal.Heading>

                  <p className="mt-1 text-sm text-gray-400">
                    Update destination details and travel information.
                  </p>
                </div>
              </div>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="relative z-10 p-8">

              <form
                onSubmit={onSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">

                  {/* Destination Name */}
                  <div className="md:col-span-2">
                    <TextField
                      defaultValue={destinationName}
                      name="destinationName"
                      isRequired
                    >
                      <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                        <MapPinned
                          size={16}
                          className="text-cyan-400"
                        />
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
                  <TextField
                    defaultValue={country}
                    name="country"
                    isRequired
                  >
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                      <Globe
                        size={16}
                        className="text-cyan-400"
                      />
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
                      defaultValue={category}
                      name="category"
                      isRequired
                      className="w-full"
                      placeholder="Select category"
                    >
                      <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                        <Sparkles
                          size={16}
                          className="text-cyan-400"
                        />
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
                  <TextField
                    defaultValue={price}
                    name="price"
                    type="number"
                    isRequired
                  >
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                      <Wallet
                        size={16}
                        className="text-cyan-400"
                      />
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
                  <TextField
                    defaultValue={duration}
                    name="duration"
                    isRequired
                  >
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                      <CalendarDays
                        size={16}
                        className="text-cyan-400"
                      />
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
                    <TextField
                      defaultValue={departureDate}
                      name="departureDate"
                      type="date"
                      isRequired
                    >
                      <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                        <CalendarDays
                          size={16}
                          className="text-cyan-400"
                        />
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
                    <TextField
                      defaultValue={imageUrl}
                      name="imageUrl"
                      isRequired
                    >
                      <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                        <ImageIcon
                          size={16}
                          className="text-cyan-400"
                        />
                        Image URL
                      </Label>

                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      />

                      <FieldError />
                    </TextField>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <TextField
                      defaultValue={description}
                      name="description"
                      isRequired
                    >
                      <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                        <FileText
                          size={16}
                          className="text-cyan-400"
                        />
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

                {/* Footer Buttons */}
                <Modal.Footer className="mt-4 flex gap-3 border-t border-white/5 px-0 pt-6">

                  <Button
                    slot="close"
                    className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    slot="close"
                    className="group relative h-12 flex-1 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(14,165,233,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(14,165,233,0.45)] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                    <span className="relative">
                      Save Changes
                    </span>
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}