import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-[var(--shadow-card)]"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </Button>
            {title && <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)] pr-10">{title}</h2>}
            <div className={title ? "mt-6" : ""}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
