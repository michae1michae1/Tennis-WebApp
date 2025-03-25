"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Define TennisBall component props 
interface TennisBallProps {
  size?: number;
  className?: string;
  animate?: boolean;
  shadow?: boolean;
  rotationSpeed?: number; // Custom rotation speed
  initialRotation?: number; // New parameter for starting rotation position
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

export const TennisBall = ({
  size = 60,
  className,
  animate = true,
  shadow = true,
  rotationSpeed = 30, // Default rotation speed
  initialRotation = 0, // Default starting rotation
  position = {},
}: TennisBallProps) => {

  return (
    <motion.div
      className={cn("absolute", className)}
      style={{
        width: size,
        height: size,
        ...position,
      }}
      initial={{ rotate: initialRotation }}
      animate={animate ? { 
        rotate: initialRotation + 360, 
        y: [0, -20, 0] 
      } : { 
        rotate: initialRotation 
      }}
      transition={{
        rotate: {
          duration: rotationSpeed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        },
        y: {
          duration: rotationSpeed / 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }
      }}
    >
      {/* Tennis ball */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-white overflow-hidden opacity-40", // Changed from bg-[#bfd62f] to bg-white and added opacity
          shadow && "shadow-lg"
        )}
      >
        {/* Shadow effect if enabled */}
        {shadow && (
          <div className="absolute w-full h-[10%] bg-black/20 -bottom-2 left-0 rounded-[50%] blur-sm z-[-1]"></div>
        )}
        
        {/* Seam lines */}
        <div className="absolute inset-0 z-10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            version="1.1" 
            x="0px" 
            y="0px" 
            viewBox="0 0 90 90" 
            enableBackground="new 0 0 90 90" 
            xmlSpace="preserve"
            fill="#bfd62f" // fill color for the tennis ball seams
          >
            <g>
                <path d="M37.129,60.914c-12.148-7.377-25.392-9.458-34.948-6.412c0.01,0.815-0.879,1.319-0.652,2.171C6.67,75.868,24.185,90,45,90   c4.115,0,8.101-0.552,11.888-1.587c0.698-0.191,0.864-1.788,1.182-2.983C55.289,76.579,47.839,67.42,37.129,60.914z" />
                <path d="M51.728,29.688c13.19,6.311,27.124,5.521,33.771-1.275c-0.024-0.041-0.047-0.082-0.064-0.125   c-0.377-0.919,0.43-2.186-0.007-3.073C78.106,10.282,62.755,0,45,0c-3.231,0-6.383,0.34-9.42,0.987   c-0.891,0.19-1.828,0.258-2.644,0.648c-0.894,0.427-0.876,2.532-1.496,3.34C31.794,13.879,39.631,23.9,51.728,29.688z" />
                <path d="M87.519,30.226c-0.183-0.524-0.925-0.879-1.485-1.286c-5.598,8.827-21.039,10.492-35.574,3.538   C37.16,26.113,29.006,14.632,30.29,5.145c-1.321-0.279-3.16-1.468-4.071-1.05C10.744,11.211,0,26.852,0,45   c0,1.208,0.047,2.406,0.141,3.59c0.089,1.129,0.73,2.413,1.278,3.642c9.649-4.434,24.299-2.716,37.628,5.38   c11.797,7.163,19.638,17.549,21.644,27.194c1.027,0.674,2.125,1.535,2.781,1.24C79.113,78.996,90,63.27,90,45   C90,39.825,89.126,34.853,87.519,30.226z" />
            </g>
            </svg>
        </div>
      </div>
    </motion.div>
  );
};

export const TennisBallDecoration: React.FC<{
  className?: string;
  count?: number;
}> = ({ className, count = 5 }) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* First ball - top left */}
      <TennisBall 
        size={120} 
        className="hidden md:block"
        position={{ top: "15%", left: "5%" }}
        rotationSpeed={25}
        initialRotation={0}
      />
      <TennisBall 
        size={80} 
        className="md:hidden"
        position={{ top: "10%", left: "2%" }}
        rotationSpeed={25}
        initialRotation={0}
      />

      {/* Second ball - top right */}
      <TennisBall 
        size={155} 
        className="hidden md:block"
        position={{ top: "10%", right: "8%" }}
        rotationSpeed={35}
        initialRotation={72}
        shadow
      />
      <TennisBall 
        size={95} 
        className="md:hidden"
        position={{ top: "8%", right: "5%" }}
        rotationSpeed={35}
        initialRotation={72}
        shadow
      />

      {/* Third ball - bottom left */}
      <TennisBall 
        size={175} 
        className="hidden md:block"
        position={{ bottom: "22%", left: "10%" }}
        rotationSpeed={30}
        initialRotation={144}
      />
      <TennisBall 
        size={105} 
        className="md:hidden"
        position={{ bottom: "15%", left: "8%" }}
        rotationSpeed={30}
        initialRotation={144}
      />

      {count > 3 && (
        <>
          <TennisBall 
            size={145} 
            className="hidden md:block"
            position={{ bottom: "30%", right: "12%" }}
            rotationSpeed={40}
            initialRotation={216}
            shadow
          />
          <TennisBall 
            size={85} 
            className="md:hidden"
            position={{ bottom: "25%", right: "10%" }}
            rotationSpeed={40}
            initialRotation={216}
            shadow
          />
        </>
      )}

      {count > 4 && (
        <>
          <TennisBall 
            size={95} 
            className="hidden md:block"
            position={{ top: "40%", left: "30%" }}
            rotationSpeed={20}
            initialRotation={288}
          />
          <TennisBall 
            size={65} 
            className="md:hidden"
            position={{ top: "35%", left: "25%" }}
            rotationSpeed={20}
            initialRotation={288}
          />
        </>
      )}
    </div>
  );
};