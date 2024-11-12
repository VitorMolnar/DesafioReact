import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo-wizard.png";

interface HeaderProps {
  resetForm: () => void;
  currentStep: number;
  setStep: (step: number) => void;
  completedSteps: number[];
}

const Header: React.FC<HeaderProps> = ({ resetForm, currentStep, setStep, completedSteps }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStartOver = () => {
    resetForm();
    navigate("/");
  };

  const navigateToStep = (step: number) => {
    const allPreviousStepsCompleted = Array.from({ length: step - 1 }, (_, i) => i + 1).every(
      (prevStep) => completedSteps.includes(prevStep)
    );

    if (allPreviousStepsCompleted) {
      setStep(step);
      setIsMenuOpen(false);
    } else {
      alert("Você precisa completar as etapas anteriores para acessar esta página.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 w-full h-24 p-4 bg-blue-900 shadow-md z-20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={handleStartOver} className="focus:outline-none">
            <img src={logo} alt="Wizard Logo" className="h-16" />
          </button>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 rounded-bl-lg rounded-br-lg`}
        style={{ height: "auto" }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-blue-900">Menu</h2>
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigate('/construction')}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToStep(1)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500"
              >
                Informações Pessoais
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToStep(2)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500"
              >
                Endereço
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToStep(3)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500"
              >
                Informações Profissionais
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToStep(4)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500"
              >
                Preferências
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToStep(5)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500"
              >
                Confirmação
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
