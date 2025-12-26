"use client";
import { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

export default function SignaturePadComponent({
  onEnd,
  width = 500,
  height = 200,
}) {
  const canvasRef = useRef(null);
  const padRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    padRef.current = new SignaturePad(canvas, {
      minWidth: 0.5,
      maxWidth: 2.5,
      penColor: "black",
    });

    const pad = padRef.current;
    const handleEnd = () => {
      const data = pad.toDataURL("image/png");
      onEnd(data);
    };
    pad.onEnd = handleEnd;

    return () => {
      pad.off && pad.off("end", handleEnd);
    };
  }, []);

  function clear() {
    padRef.current.clear();
    onEnd(null);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", display: "block" }}
      />
      <div className="mt-2">
        <button type="button" onClick={clear} className="px-3 py-1 border text-black">
          Clear
        </button>
      </div>
    </div>
  );
}
