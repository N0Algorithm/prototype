"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isNight, setIsNight] = useState(true);
  const [moveStage, setMoveStage] = useState(0);
  const [rotate, setRotate] = useState(0);

  // Movement sequence for Hello 👋
  const positions = [
    { x: -200, y: 0 },
    { x: 0, y: 0 },
    { x: 200, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: -150 },
    { x: 0, y: 0 },
    { x: 0, y: 150 },
    { x: 0, y: 0 },
  ];

  // Trigger movement + spin when clicking the button
  const handleMove = async () => {
    for (let i = 0; i < positions.length; i++) {
      setMoveStage(i);
      setRotate((r) => r + 180); // spin 180° each step
      await new Promise((r) => setTimeout(r, 600));
    }
  };

  return (
    <motion.main
      animate={{
        backgroundColor: isNight ? "#0f172a" : "#f1f5f9",
        color: isNight ? "#f8fafc" : "#0f172a",
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Animated + Spinning Hello */}
      <motion.div
        animate={{
          ...positions[moveStage],
          rotate: rotate, // rotation added here
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.6,
        }}
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          display: "inline-block",
        }}
      >
        Hello 👋
      </motion.div>

      {/* Night Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 10 }}
        animate={{
          backgroundColor: isNight ? "#334155" : "#e2e8f0",
          color: isNight ? "#f8fafc" : "#0f172a",
        }}
        transition={{ duration: 0.4 }}
        onClick={() => setIsNight(!isNight)}
        style={{
          marginBottom: "2rem",
          padding: "0.8rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          fontWeight: 600,
        }}
      >
        {isNight ? "☀️ Day Mode" : "🌙 Night Mode"}
      </motion.button>

      {/* Move Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: "0.8rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          backgroundColor: isNight ? "#64748b" : "#94a3b8",
          color: "#fff",
          fontWeight: 600,
        }}
        onClick={handleMove}
      >
        Move Me 🚀
      </motion.button>
    </motion.main>
  );
}
