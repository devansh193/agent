import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface StepImageProps {
  currentStep: number;
}

const images = [
  {
    src: "/placeholder.png",
    alt: "Upload data interface demonstration",
  },
  {
    src: "/placeholder.png",
    alt: "Insights interface demonstration",
  },
  {
    src: "/placeholder.png",
    alt: "Click start interface demonstration",
  },
];

export function StepImage({ currentStep }: StepImageProps) {
  const image = images[currentStep % images.length];

  return (
    <div className="relative md:h-[500px] p-2 mt-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            height={1000}
            width={1500}
            className="rounded-xl shadow-2xl border border-neutral-200"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
