"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { clearTranslatedText } from "@/redux/translate";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [showClearButton, setShowClearButton] = React.useState(false);

    const combinedRef = React.useCallback(
      (node: HTMLTextAreaElement) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(node);
          } else {
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          }
        }
        internalRef.current = node;
      },
      [ref]
    );

    const dispatch = useDispatch();
    const handleClear = () => {
      dispatch(clearTranslatedText())
      if (internalRef.current) {
        internalRef.current.value = "";
        internalRef.current.style.height = "auto";
        setShowClearButton(false);
      }
    };

    React.useEffect(() => {
      const textarea = internalRef.current;
      if (textarea) {
        const handleInput = () => {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
          setShowClearButton(textarea.value.length > 0);
        };
        textarea.addEventListener("input", handleInput);

        // Başlangıçta textarea boyutunu ayarla
        handleInput();

        return () => {
          textarea.removeEventListener("input", handleInput);
        };
      }
    }, []);

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[150px] text-2xl mt-2 placeholder:text-2xl w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={combinedRef}
          {...props}
        />
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 text-xl hover:bg-slate-200 rounded-full px-3"
          >
            X
          </button>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
