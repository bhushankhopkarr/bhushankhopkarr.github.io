// src/components/Footer.js
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full py-2 bg-transparent text-center text-white">
        <p className="text-sm">&copy; {currentYear} Bhushan Khopkar. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
