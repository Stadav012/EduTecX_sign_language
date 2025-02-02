import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] pointer-events-none -z-10">
      {/* Side decorative elements */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1200 800">
        {/* Left side hand sign */}
        <motion.path
          d="M100,300 C120,280 130,290 130,310 C130,330 120,340 100,320 Z M140,290 C160,270 170,280 170,300 C170,320 160,330 140,310 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Right side hand sign */}
        <motion.path
          d="M900,300 C920,280 930,290 930,310 C930,330 920,340 900,320 Z M940,290 C960,270 970,280 970,300 C970,320 960,330 940,310 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 2 }}
        />

        {/* Left side book symbol */}
        <motion.path
          d="M150,500 L200,500 L200,550 L150,550 Z M150,510 C170,505 180,505 200,510"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* Right side graduation cap */}
        <motion.path
          d="M850,500 L900,480 L950,500 L900,520 Z M900,520 L900,540 M880,530 L920,530"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 2.5 }}
        />

        {/* Center educational elements */}
        {/* Math Equation: y = mx + b */}
        <motion.path
          d="M200,300 L220,300 M240,290 L240,310 M260,300 L280,300 M300,280 L320,320 M340,300 L360,300"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Binary Numbers: 1010 */}
        <motion.path
          d="M400,200 L400,240 M450,200 M450,240 L450,200 M500,200 M500,240 L500,200 M550,200 L550,240"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1, delay: 2 }}
        />

        {/* Quadratic Formula: -b ± √(b² - 4ac)/2a */}
        <motion.path
          d="M200,400 L230,400 M240,390 L260,410 M270,400 L290,400 M300,390 C320,390 320,410 300,410 M330,400 L350,400 M360,380 L360,420 M380,400 L400,400"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1, delay: 1 }}
        />

        {/* Programming Syntax: if(x){} */}
        <motion.path
          d="M600,300 L620,300 L620,340 L600,340 Z M640,300 L660,320 L640,340 M680,300 L680,340 M700,300 L720,300 L720,340 L700,340"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1, delay: 3 }}
        />

        {/* Circuit Diagram Elements */}
        <motion.path
          d="M800,500 L850,500 M870,480 L870,520 M890,500 L940,500 M900,480 C920,480 920,520 900,520"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1, delay: 4 }}
        />

        {/* Large signing hand on right side */}
        <motion.path
          d="M800,200 C830,180 840,190 850,220 C860,250 870,260 880,240 C890,220 900,230 910,260 C920,290 930,280 940,250 C950,220 960,230 970,260 L980,290 C990,310 995,300 990,280 C980,240 970,200 950,180 C930,160 910,170 900,200 C890,170 870,160 850,180 C830,160 810,170 800,200 Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 0.5 }}
        />

        {/* Additional signing gestures */}
        <motion.path
          d="M750,350 C770,330 780,340 790,360 C800,380 810,370 820,350"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 2 }}
        />

        {/* Communication waves */}
        <motion.path
          d="M700,150 Q750,130 800,150 Q850,170 900,150"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Additional educational symbol */}
        <motion.path
          d="M850,600 C870,580 890,580 910,600 L910,640 L850,640 L850,600 M860,620 L900,620"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 2 }}
        />

        {/* Stick figure reading animation */}
        <motion.path
          d="M1000,400 L1000,460 M1000,410 L980,430 M1000,410 L1020,430 M1000,460 L980,500 M1000,460 L1020,500"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Book in hands */}
        <motion.path
          d="M970,430 L1030,430 L1030,450 L970,450 Z M1000,430 L1000,450 M980,440 L990,440 M1010,440 L1020,440"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.4, 0.8, 1], repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
        />

        {/* Head movement animation */}
        <motion.path
          d="M990,380 A10,10 0 0 1 1010,380 A10,10 0 0 1 990,380"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1],
            opacity: [0, 1, 1, 1],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 4
          }}
          style={{ transformOrigin: '1000px 400px' }}
        />

        {/* Body and limbs - follows head */}
        <motion.path
          d="M1000,400 L1000,460 M1000,410 L980,430 M1000,410 L1020,430 M1000,460 L980,500 M1000,460 L1020,500"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 1] }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 4,
            delay: 1.5
          }}
        />

        {/* Book in hands - after body */}
        <motion.path
          d="M970,430 L1030,430 L1030,450 L970,450 Z M1000,430 L1000,450 M980,440 L990,440 M1010,440 L1020,440"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 1] }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 4,
            delay: 3
          }}
        />

        {/* Thought bubble - appears last */}
        <motion.path
          d="M1030,350 A5,5 0 0 1 1040,350 A5,5 0 0 1 1030,350 M1045,340 A8,8 0 0 1 1060,340 A8,8 0 0 1 1045,340 M1065,320 A12,12 0 0 1 1090,320 A12,12 0 0 1 1065,320"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 4,
            delay: 4.5
          }}
        />
      </svg>
    </div>
  );
}