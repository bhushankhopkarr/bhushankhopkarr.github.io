// src/components/ProjectCard.js
import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl opacity-0 animate-fade-in">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-2">{project.description}</p>
            <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline mt-2 inline-block"
            >
                View Project
            </a>
        </div>
    );
};

export default ProjectCard;
