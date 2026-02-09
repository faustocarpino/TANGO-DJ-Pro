import React, { useState, useRef, useEffect } from 'react';

interface KnobProps {
  label: string;
  value: number; 
  min: number;
  max: number;
  onChange: (val: number) => void;
  color?: string;
}

export const Knob: React.FC<KnobProps> = ({ label, value, min, max, onChange, color = "blue" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastY = useRef<number>(0);
  const touchId = useRef<number | null>(null);

  const handleStart = (y: number, id: number | null = null) => {
    setIsDragging(true);
    lastY.current = y;
    touchId.current = id;
  };

  const handleMove = (y: number) => {
    if (!isDragging) return;
    const delta = lastY.current - y;
    const sensitivity = 0.008; // Increased for better iPad response
    const newVal = Math.min(max, Math.max(min, value + delta * (max - min) * sensitivity * 5));
    onChange(newVal);
    lastY.current = y;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (touchId.current === null) handleMove(e.clientY);
    };
    const onMouseUp = () => {
      if (touchId.current === null) setIsDragging(false);
    };

    if (isDragging && touchId.current === null) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const rotation = ((value - min) / (max - min)) * 270 - 135;

  return (
    <div className="flex flex-col items-center gap-1 touch-none">
      <div 
        className="relative w-14 h-14 rounded-full bg-zinc-800 border-2 border-zinc-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.5)] cursor-ns-resize flex items-center justify-center active:bg-zinc-700 transition-colors"
        onMouseDown={(e) => handleStart(e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientY, e.touches[0].identifier)}
        onTouchMove={(e) => {
          // Fix: Explicitly cast the touch element to any to access its properties and avoid 'unknown' errors
          const touch = Array.from(e.changedTouches).find((t: any) => t.identifier === touchId.current) as any;
          if (touch) handleMove(touch.clientY);
        }}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div 
          className={`absolute w-1.5 h-4 bg-${color}-500 rounded-full top-1`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '50% 175%',
            boxShadow: `0 0 10px ${color === 'blue' ? '#3b82f6' : color === 'red' ? '#ef4444' : '#10b981'}`
          }}
        />
        <div className="text-[9px] font-black text-zinc-500 uppercase pointer-events-none select-none tracking-tighter">{label}</div>
      </div>
      <span className="text-[10px] text-zinc-400 font-mono font-bold">
        {value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1)}
      </span>
    </div>
  );
};