import React, { useState } from 'react';

interface ConfirmationFormProps {
  formData: {
    fullName: string;
    birthDate: string;
    email: string;
    phone: string;
    zip: string;
    country: string;
    state: string;
    city: string;
    street: string;
    isBillingSameAsResidential: boolean;
    occupation: string;
    company: string;
    industry: string;
    salaryRange: string;
    interests: string[];
    discoveredBy: string[];
  };
  updateFormData: (newData: { termsAccepted: boolean }) => void;
  onSubmit: () => void;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ formData, updateFormData, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleCheckboxChange = () => {
    setIsModalOpen(true);
  };

  const handleConfirmTerms = () => {
    setTermsAccepted(true);
    setIsModalOpen(false);
    updateFormData({ termsAccepted: true });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Finalização e Confirmação</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-900">Resumo dos Dados</h3>
        <ul className="mt-2 text-blue-900">
          <li><strong>Nome completo:</strong> {formData.fullName}</li>
          <li><strong>Data de nascimento:</strong> {formData.birthDate}</li>
          <li><strong>Email:</strong> {formData.email}</li>
          <li><strong>Telefone:</strong> {formData.phone}</li>
          <li><strong>Endereço:</strong> {formData.street}, {formData.city}, {formData.state}, {formData.zip}</li>
          <li><strong>Ocupação:</strong> {formData.occupation}</li>
          <li><strong>Empresa:</strong> {formData.company}</li>
          <li><strong>Ramo de atividade:</strong> {formData.industry}</li>
          <li><strong>Salário aproximado:</strong> {formData.salaryRange}</li>
          <li><strong>Interesses:</strong> {formData.interests.join(', ')}</li>
          <li><strong>Como conheceu:</strong> {formData.discoveredBy.join(', ')}</li>
        </ul>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={handleCheckboxChange}
            className="mr-2 accent-blue-900"
          />
          <span className="text-blue-900">Aceito os</span> 
          <span className="text-blue-600 underline cursor-pointer ml-1" onClick={handleCheckboxChange}>Termos e Condições</span>
        </label>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-blue-900">Termos e Condições</h3>
            <p className="mb-4 text-blue-900">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
              Cras venenatis euismod malesuada. Nulla auctor fringilla libero, ac aliquam velit tempor et. Integer nec lorem
              eros. Nullam a urna ut nisi tincidunt facilisis.
            </p>
            <button
              onClick={handleConfirmTerms}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Concordo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;
