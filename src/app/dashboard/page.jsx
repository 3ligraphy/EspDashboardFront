"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import WindTurbineCalculator from "./DashboardContainer";
const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const text = "Esp32 Dashboard";
  const words = text.split(" ");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setError(true);
        }
      );
  };

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
        <div style={{ direction: "rtl", textAlign: "right" }}>
            {words.map((word, wordIndex) => (
              <motion.div
                key={wordIndex}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: wordIndex * 0.1,
                }}
                style={{ display: "inline-block", marginRight: "0.5rem" }}
              >
               
                  <span key={wordIndex}>{word}</span>
             
              </motion.div>
            ))}
            😊
          </div>
        </div>
<WindTurbineCalculator/>
      </div>
    </motion.div>
  );
};

export default ContactPage;
