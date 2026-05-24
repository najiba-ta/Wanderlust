"use client";

import { authClient } from "@/lib/auth-client";
import { Trash2, TriangleAlert } from "lucide-react";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

export function BookingCancelAlert({ bookingId }) {

  const handleCancelBooking = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      await res.json();

      toast.success("Booking cancelled successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 700);

    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <AlertDialog>

      {/* Trigger Button */}
      <Button
        variant="light"
        className="group h-12 overflow-hidden rounded-2xl border border-rose-500/20 bg-rose-500/10 px-5 font-medium text-rose-300 transition-all duration-300 hover:scale-[1.03] hover:border-rose-400/40 hover:bg-rose-500/20 hover:text-white"
      >
        <span className="flex items-center gap-2">
          <Trash2
            size={18}
            className="transition-transform duration-300 group-hover:rotate-6"
          />
          Cancel Booking
        </span>
      </Button>

      {/* Dialog */}
      <AlertDialog.Backdrop className="bg-black/70 backdrop-blur-sm">
        <AlertDialog.Container>

          <AlertDialog.Dialog className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1220] text-white shadow-[0_10px_60px_rgba(0,0,0,0.55)] sm:max-w-[450px]">

            {/* Glow */}
            <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-rose-500/10 blur-3xl" />

            <AlertDialog.CloseTrigger className="text-gray-400 hover:text-white" />

            {/* Header */}
            <AlertDialog.Header className="relative z-10 flex flex-col items-center border-b border-white/5 pb-6 pt-8 text-center">

              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10">
                <TriangleAlert
                  size={38}
                  className="text-rose-400"
                />
              </div>

              <AlertDialog.Heading className="text-2xl font-bold tracking-tight text-white">
                Cancel This Booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body className="relative z-10 px-8 py-6 text-center">
              <p className="leading-7 text-gray-400">
                Are you sure you want to cancel this booking?
                Once cancelled, your reservation details will be removed permanently.
              </p>
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer className="relative z-10 flex gap-3 border-t border-white/5 px-6 py-5">

              <Button
                slot="close"
                className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] text-gray-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
              >
                Keep Booking
              </Button>

              <Button
                onClick={handleCancelBooking}
                slot="close"
                className="h-12 flex-1 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 font-semibold text-white shadow-[0_8px_25px_rgba(244,63,94,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(244,63,94,0.45)] active:scale-[0.98]"
              >
                Delete Booking
              </Button>

            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}