import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Little Bee</h3>
            <p className="text-sm mb-4">
              Your one-stop shop for all baby needs! Safe, affordable, and adorable products for your little one.
            </p>
            <p className="text-sm">© 2025 Little Bee. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/products" className="hover:text-blue-400">Shop</a></li>
              <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
              <li><a href="/terms" className="hover:text-blue-400">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-xl hover:text-blue-400" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-xl hover:text-blue-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl hover:text-blue-400" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl hover:text-blue-400" />
              </a>
            </div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@littlebee.com</p>
            <p className="text-sm">Phone: +91 7012949560</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
