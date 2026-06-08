import React, { useRef, useState } from "react";

interface ThreeDTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default: 12)
  perspective?: number; // CSS perspective distance (default: 1000)
}

export default function ThreeDTiltCard({
  children,
  className = "",
  maxTilt = 12,
  perspective = 1000,
}: ThreeDTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
  });
  
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: "translate(-50%, -50%)",
    top: "0px",
    left: "0px",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Relative coordinates inside the target item card bounds
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to normalized floating variables (-0.5 to 0.5)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Calculate rotation bounds based on settings
    const rotateX = -normY * maxTilt;
    const rotateY = normX * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)", // fast tick tracking
    });

    // Animate a custom circular reflective highlights sphere matching mouse exact alignment
    setGlareStyle({
      opacity: 0.18,
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%)",
      background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
    });
  };

  const handleMouseLeave = () => {
    // Gracefully restore normal flat perspective state
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    });

    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0,
      transition: "opacity 0.6s ease",
    }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative select-none will-change-transform rounded-2xl ${className}`}
    >
      {/* Glare Shine Mask Background */}
      <div 
        className="absolute pointer-events-none rounded-2xl w-[260px] h-[260px] blur-[22px] z-10 mix-blend-overlay transition-opacity duration-300"
        style={glareStyle}
      />
      {children}
    </div>
  );
}
