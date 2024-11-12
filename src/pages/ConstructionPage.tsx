import React from 'react';
import Footer from '../components/Footer';

const ConstructionPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="flex-grow flex flex-col items-center justify-center text-blue-900 p-4">
        <img
          src="/images/developer-working.gif"
          alt="Em construção"
          className="w-full max-w-md h-auto"
        />
        <p className="mt-4 text-lg text-center sm:text-xl text-blue-900">
          Ooops! Ainda estamos trabalhando nesta página!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ConstructionPage;
