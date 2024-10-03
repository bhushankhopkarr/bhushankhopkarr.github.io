// src/components/Hero.js
import React from 'react';

const Hero = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-blue-500">
            <div className="text-center">
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
                    Bhushan Khopkar <sup className="text-sm align-super">DEVELOPER</sup>
                </h1>
            </div>
        </section>
    );
};

export default Hero;
