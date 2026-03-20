import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
}

export const PublishDialog = ({
  open,
  onClose,
  onConfirm,
}: PublishDialogProps) => {
  const [title, setTitle] = useState("");

  const handleConfirm = () => {
    if (!title.trim()) return;
    onConfirm(title.trim());
    setTitle("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 border-zinc-700 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Publish Article</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
            placeholder="Введіть заголовок..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
            autoFocus
          />
        </div>

        <DialogFooter className="gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!title.trim()}
            className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Publish ↗
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
