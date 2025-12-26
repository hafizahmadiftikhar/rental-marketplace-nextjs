"use client";
import { useRef, useEffect, useCallback } from "react";
import SignaturePad from "signature_pad";

export default function SignaturePadComponent({
  onEnd,
  width = 500,
  height = 200,
}) {
  const canvasRef = useRef(null);
  const padRef = useRef(null);
  const onEndRef = useRef(onEnd);

  // Keep onEnd ref updated
  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Initialize SignaturePad
    const pad = new SignaturePad(canvas, {
      minWidth: 0.5,
      maxWidth: 2.5,
      penColor: "black",
      backgroundColor: "rgb(255, 255, 255)",
    });

    padRef.current = pad;

    // Handle signature end
    pad.addEventListener("endStroke", () => {
      if (!pad.isEmpty()) {
        const data = pad.toDataURL("image/png");
        console.log("✅ Signature captured!"); // Debug
        onEndRef.current?.(data);
      }
    });

    return () => {
      pad.off();
    };
  }, [width, height]);

  const clear = useCallback(() => {
    if (padRef.current) {
      padRef.current.clear();
      onEndRef.current?.(null);
    }
  }, []);

  return (
    <div className="w-full">
      <p className="text-sm text-gray-600 mb-2">Draw your signature below:</p>
      <canvas
        ref={canvasRef}
        className="border border-gray-400 rounded bg-white w-full"
        style={{ 
          maxWidth: `${width}px`, 
          height: `${height}px`,
          touchAction: "none" // Important for mobile
        }}
      />
      <div className="mt-2 flex gap-2">
        <button 
          type="button" 
          onClick={clear} 
          className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300 border border-gray-400"
        >
          Clear Signature
        </button>
      </div>
    </div>
  );
}