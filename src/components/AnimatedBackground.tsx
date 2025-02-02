import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] pointer-events-none -z-10">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-primary/5 to-background/10 animate-pulse" />
      
      {/* Handwriting SVG Animation */}
      <svg className="absolute w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
        <motion.path
          d="M200,500 C300,400 400,300 500,500 C600,700 700,600 800,500"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.path
          d="M300,200 C400,300 500,400 600,300 S700,200 800,300"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.path
          d="M200,700 Q400,600 600,700 T1000,700"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </svg>
    </div>
  );
}