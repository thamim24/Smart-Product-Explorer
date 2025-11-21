'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[var(--hero-bg-start)] via-[var(--card)] to-[var(--hero-bg-end)] py-24 px-6">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-accent/20 to-purple-600/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-blue-500/15 to-accent/15 rounded-full blur-3xl"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center max-w-5xl mx-auto"
      >
        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-[var(--text)] via-accent to-purple-600 bg-clip-text text-transparent">
            Smart Product
          </span>
          <br />
          <span className="text-[var(--text)]">Explorer</span>
        </motion.h1>
        
        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8 font-light"
        >
          Discover products instantly with <span className="text-accent font-medium">real-time search</span>,
          <span className="text-accent font-medium"> dynamic filters</span>, and
          <span className="text-accent font-medium"> intelligent recommendations</span>.
        </motion.p>
        
        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center items-center"
        >
          {['100+ Products', 'Real-time Filters', 'Smart Search', 'Grid & List View'].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="px-5 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-full text-sm font-medium text-[var(--text-secondary)] shadow-lg hover:shadow-xl hover:border-accent/30 hover:text-accent transition-all duration-300 cursor-default"
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}