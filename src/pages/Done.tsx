import React from "react";
import { MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Done = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* ✅ Check icon animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="border-[5px] border-[#9D8CFF] text-[#B9AFFF] rounded-full p-5 mb-6 shadow-[0_0_25px_rgba(157,140,255,0.5)]"
      >
        <MdOutlineDone size={90} />
      </motion.div>

      {/* 💬 Text section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-3xl font-semibold">Welcome to Faishion.AI</h1>
        <p className="text-gray-400 mt-2">
          You’re now logged in — your personalized fashion journey begins.
        </p>

        <Link
          to="https://www.faishion.ai/howitworks"
          className="inline-block mt-6 px-8 py-2.5 rounded-md bg-gradient-to-r from-[#9D8CFF] to-[#B9AFFF] hover:from-[#B9AFFF] hover:to-[#9D8CFF] text-black font-medium transition-all shadow-lg"
        >
          Explore How It Works
        </Link>
      </motion.div>

      {/* ✨ Soft bottom glow */}
      <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-[#9D8CFF]/30 to-transparent blur-3xl"></div>
    </div>
  );
};

export default React.memo(Done);
