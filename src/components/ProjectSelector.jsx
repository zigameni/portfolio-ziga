import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectSelector = ({ projects, selectedIndex, onSelect }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Project Pills */}
            <div className="flex flex-wrap gap-3 items-center">
                {projects.map((project, index) => (
                    <motion.button
                        key={index}
                        onClick={() => onSelect(index)}
                        className={`
              relative flex items-center gap-2 px-4 py-2 rounded-full
              transition-all duration-300
              ${selectedIndex === index
                            ? 'bg-opacity-10 bg-white text-white'
                            : 'bg-opacity-5 bg-white hover:bg-opacity-10 text-opacity-70 text-white hover:text-white'
                        }
            `}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="relative">
                            <img
                                src={project.logo}
                                alt={project.title}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            {selectedIndex === index && (
                                <motion.div
                                    className="absolute -inset-1 border border-white border-opacity-30 rounded-full"
                                    layoutId="selectedProject"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </div>

                        <span className="text-sm font-medium truncate max-w-[120px]">
              {project.title}
            </span>

                        <AnimatePresence>
                            {selectedIndex === index && (
                                <motion.div
                                    className="absolute inset-0 border-2 border-white border-opacity-20 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.button>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white bg-opacity-10 h-1 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-white bg-opacity-50"
                    initial={{ width: '0%' }}
                    animate={{
                        width: `${((selectedIndex + 1) / projects.length) * 100}%`
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
};

export default ProjectSelector;