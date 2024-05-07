"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
const Homepage = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-3/4 flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* IMAGE CONTAINER */}
        <div className="h-full lg:h-full lg:w-1/2 relative ">
          <Image src="/hero.png" alt="" fill className="object-contain rounded-lg" />
        </div>
        {/* TEXT CONTAINER */}
        <div className="h-3/4 lg:h-full lg:w-1/2 flex flex-col gap-8 items-center justify-center m-auto ">
          {/* TITLE */}
          <h1 className="text-6xl md:text-8xl font-bold text-center">
            ESP32 DASHBOARD         </h1>
          {/* DESC */}
          <p className="md:text-2xl text-center">
            Welcome to the ESP32 project dashboard click on the button bellow to explore the dashboard
          </p>
          {/* BUTTONS */}
          <div className="w-full flex gap-4 items-center justify-center ">
            <Link href={'/dashboard'}>

              <button className="p-4 rounded-lg ring-1 ring-black bg-black text-white">
          Dashboard        </button>
            </Link>
            {/* <button className="p-4 rounded-lg ring-1 ring-black">
              Contact Me
            </button> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
