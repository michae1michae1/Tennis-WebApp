import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TennisBallDecoration } from "@/components/ui/tennis-ball";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const directionRef = useRef<Record<number, boolean>>({});
  
  const titles = useMemo(
    () => [
      "Experience", 
      "Community", 
      "Events", 
      "Ability", 
      "Journey",
      "Game",
      "Performance",
      "Potential",
      "Strategy",
      "Confidence",
      "Ranking",
      "Precision",
      "Passion",
      "Matches",
      "Competition",
      "Career",
      "Network",
      "Training",
      "Coordination",
      "Focus",
      "Challenge",
      "Victories",
      "Championship"
    ],
    []
  );

  // Initialize random directions for each word transition
  useEffect(() => {
    titles.forEach((_, index) => {
      if (directionRef.current[index] === undefined) {
        directionRef.current[index] = Math.random() > 0.5;
      }
    });
  }, [titles]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-center relative pt-8 md:pt-16">
      {/* Tennis-themed gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
      
      {/* Tennis ball decorations */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <TennisBallDecoration count={5} />
      </div>
      
      <div className="flex flex-col justify-center items-center w-full max-w-4xl z-10 px-4 text-center mt-0 md:mt-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-wrap justify-center">
            <span>Elevate Your</span>
            <span className="ml-2 text-primary">Tennis</span>
          </div>
          <div className="h-16 sm:h-20 md:h-24 relative w-full mt-2 overflow-hidden">
            {titles.map((title, index) => {
              const goesUp = directionRef.current[index] || false;
              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, y: goesUp ? 100 : -100 }}
                  animate={{
                    opacity: titleNumber === index ? 1 : 0,
                    y: titleNumber === index ? 0 : 
                      (titleNumber > index) 
                        ? (goesUp ? -100 : 100) // Exit direction opposite of entry
                        : (goesUp ? 100 : -100)  // Entry direction
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                >
                  {title}
                </motion.div>
              );
            })}
          </div>
        </motion.h1>
        
        <motion.p
          className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          Create, manage, and participate in custom tennis events. 
          Use popular formats and structures, or create your own!
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 md:mt-10">
          <Link href="/tournaments/create">
            <motion.button
              className="bg-primary text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg w-full sm:w-auto"
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
              className="bg-secondary text-text px-6 py-3 rounded-full font-medium text-lg shadow-lg w-full sm:w-auto"
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