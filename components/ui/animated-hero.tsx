import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TennisBallDecoration } from "@/components/ui/tennis-ball";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Experience", "Community", "Events", "Games", "Journey"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-center relative pt-16">
      {/* Tennis-themed gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
      
      {/* Tennis ball decorations */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <TennisBallDecoration count={5} />
      </div>
      
      <div className="flex flex-col justify-center items-center w-full max-w-4xl z-10 px-4 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight flex flex-wrap justify-center"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span>Elevate Your</span>{" "} 
          <span className="text-primary">Tennis</span>{" "}
          <div className="relative flex justify-center overflow-hidden h-[1.5em] w-full mt-1 md:mt-0 md:w-auto md:inline-flex">
            <div className="relative px-6">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute left-0 right-0 font-bold whitespace-nowrap flex justify-center"
                  initial={{ opacity: 0, y: "100%" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -100 : 100,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
              <span className="opacity-0 whitespace-nowrap">{titles.reduce((a, b) => a.length > b.length ? a : b)}</span>
            </div>
          </div>
        </motion.h1>
        
        <motion.p
          className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          Create, manage, and participate in custom tennis tournaments and ladder systems. 
          Use popular formats and structures, or create your own!
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
          <Link href="/tournaments/create">
            <motion.button
              className="bg-primary text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              Create Tournament
            </motion.button>
          </Link>

          <Link href="/tournaments">
            <motion.button
              className="bg-secondary text-text px-6 py-3 rounded-full font-medium text-lg shadow-lg"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              View Tournaments
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export { Hero }; 