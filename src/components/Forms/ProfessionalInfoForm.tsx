import React, { useEffect } from 'react';

interface ProfessionalInfoFormProps {
  formData: {
    occupation: string;
    company: string;
    industry: string;
    salaryRange: string;
  };
  updateFormData: (newData: Partial<ProfessionalInfoFormProps['formData']>) => void;
  setIsFormValid: (isValid: boolean) => void;
}

const ProfessionalInfoForm: React.FC<ProfessionalInfoFormProps> = ({ formData, updateFormData, setIsFormValid }) => {
  useEffect(() => {
    const isFormValid =
      formData.occupation.trim() !== '' &&
      formData.company.trim() !== '' &&
      formData.industry.trim() !== '' &&
      formData.salaryRange.trim() !== '';
    setIsFormValid(isFormValid);
  }, [formData, setIsFormValid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Informações Profissionais</h2>
      <form>
        <label className="block mb-2">
          Ocupação atual
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Empresa onde trabalha
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Ramo de atividade
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Salário aproximado
          <select
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          >
            <option value="">Selecione uma faixa salarial</option>
            <option value="Até R$2.000">Até R$2.000</option>
            <option value="R$2.000 - R$5.000">R$2.000 - R$5.000</option>
            <option value="R$5.000 - R$10.000">R$5.000 - R$10.000</option>
            <option value="R$10.000 - R$20.000">R$10.000 - R$20.000</option>
            <option value="Mais de R$20.000">Mais de R$20.000</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default ProfessionalInfoForm;
