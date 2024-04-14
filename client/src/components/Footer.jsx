import React from 'react';

const Footer = () => {
    return (
        <footer className="pt-5 bottom-0 w-full bg-white">
            <div className="flex flex-col items-center justify-center p-5">
                <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                    <a className="hover:text-gray-900" href="#">Home</a>
                    <a className="hover:text-gray-900" href="#">How it Works</a>
                    <a className="hover:text-gray-900" href="#">About</a>
                    <a className="hover:text-gray-900" href="#">Github</a>
                    <a className="hover:text-gray-900" href="#">Contact</a>
                </nav>

                <div className="flex justify-center space-x-5 mt-5 pb-5">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="Instagram" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt="LinkedIn" />
                    </a>
                </div>
                <p className="text-center text-gray-700 font-medium">&copy; 2024, Made with Love {'💖'} . All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
