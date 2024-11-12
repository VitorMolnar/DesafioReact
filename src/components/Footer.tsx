import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold mb-4">Entre em Contato</h3>
        <p className="mb-4">Se precisar de assistência, estamos aqui para ajudar! Entre em contato conosco por meio das redes sociais ou telefone.</p>

        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://facebook.com" aria-label="Facebook" className="text-white hover:text-blue-500">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="text-white hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="text-white hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="text-white hover:text-blue-600">
            <FaLinkedin size={24} />
          </a>
        </div>

        <p className="mb-4">Telefone: (11) 1234-5678</p>
        <p>Email: contato@conectacorp.com</p>

        <div className="mt-4 text-blue-200 text-sm">
          © 2024 ConectaCorp. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
