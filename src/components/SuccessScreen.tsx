import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mb-4">
          Cadastro Concluído com Sucesso!
        </h2>
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-blue-600 text-5xl md:text-6xl" />
        </div>
        <p className="text-base md:text-lg text-blue-900 mb-2">
          Obrigado por se cadastrar!
        </p>
        <p className="text-base md:text-lg text-blue-900 mb-2">
          Seu cadastro foi concluído e agora é só aguardar.
        </p>
        <p className="text-base md:text-lg text-blue-900">
          Um de nossos especialistas entrará em contato com você em breve para dar sequência ao seu atendimento.
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;
