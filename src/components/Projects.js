// src/components/Projects.js
import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projectsData';

const Projects = () => {
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowCards(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="projects" className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
        <h2 className="text-4xl mb-6">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showCards && projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
            ))}
        </div>
        </section>
    );
};

export default Projects;
