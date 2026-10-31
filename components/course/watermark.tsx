'use client';

import React from 'react';

interface WatermarkProps {
  studentName: string;
  studentPhone: string;
}

export default function Watermark({ studentName, studentPhone }: WatermarkProps) {
  const text = `${studentName} • ${studentPhone}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none fixed inset-0 z-40 overflow-hidden opacity-[0.035] flex flex-wrap content-around justify-around gap-16 p-8"
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="text-xs font-bold text-navy transform -rotate-12 whitespace-nowrap"
        >
          {text}
        </span>
      ))}
    </div>
  );
}

