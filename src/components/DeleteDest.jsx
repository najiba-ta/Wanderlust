"use client";

import { AlertDialog, Button } from "@heroui/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteDest({ dest }) {
  const { _id, destinationName } = dest;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const data = await res.json();

      toast.success("Destination deleted successfully!");
      router.push("/destination");
      router.refresh();
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  return (
    <AlertDialog>
      {/* Trigger */}
      <div className="flex justify-end">
        <Button
          variant="danger"
          className="group flex items-center gap-2 rounded-2xl bg-rose-500/10 px-4 py-2 text-rose-300 transition hover:bg-rose-500/20 hover:text-white"
        >
          <RiDeleteBin5Fill className="transition group-hover:scale-110" />
          Delete
        </Button>
      </div>

      <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/60">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] rounded-2xl border border-white/10 bg-[#0b1220] text-white shadow-2xl">

            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <RiDeleteBin5Fill className="text-rose-400" />
              </AlertDialog.Icon>

              <AlertDialog.Heading className="text-xl font-bold">
                Delete destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="text-gray-400">
              This will permanently delete{" "}
              <strong className="text-white">{destinationName}</strong> and all
              of its data. This action cannot be undone.
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex gap-3">
              <Button
                slot="close"
                variant="tertiary"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                className="flex-1 rounded-xl bg-rose-500 text-white hover:bg-rose-600"
              >
                Delete
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}