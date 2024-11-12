import React, { useEffect } from 'react';

interface PreferencesInterestsFormProps {
  formData: {
    interests: string[];
    discoveredBy: string[];
  };
  updateFormData: (newData: Partial<PreferencesInterestsFormProps['formData']>) => void;
  setIsFormValid: (isValid: boolean) => void;
}

const PreferencesInterestsForm: React.FC<PreferencesInterestsFormProps> = ({ formData, updateFormData, setIsFormValid }) => {
  useEffect(() => {
    const isFormValid = formData.interests.length > 0 && formData.discoveredBy.length > 0;
    setIsFormValid(isFormValid);
  }, [formData, setIsFormValid]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'interests' | 'discoveredBy') => {
    const { value, checked } = e.target;
    updateFormData({
      [field]: checked
        ? [...formData[field], value]
        : formData[field].filter((item) => item !== value),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Preferências e Interesses</h2>
      <form>
        <fieldset className="mb-4">
          <legend className="text-lg font-semibold text-blue-900">Produtos ou serviços de interesse</legend>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Consultoria"
              checked={formData.interests.includes('Consultoria')}
              onChange={(e) => handleCheckboxChange(e, 'interests')}
              className="mr-2 accent-blue-900"
            />
            Consultoria
          </label>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Treinamento"
              checked={formData.interests.includes('Treinamento')}
              onChange={(e) => handleCheckboxChange(e, 'interests')}
              className="mr-2 accent-blue-900"
            />
            Treinamento
          </label>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Suporte técnico"
              checked={formData.interests.includes('Suporte técnico')}
              onChange={(e) => handleCheckboxChange(e, 'interests')}
              className="mr-2 accent-blue-900"
            />
            Suporte técnico
          </label>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Desenvolvimento personalizado"
              checked={formData.interests.includes('Desenvolvimento personalizado')}
              onChange={(e) => handleCheckboxChange(e, 'interests')}
              className="mr-2 accent-blue-900"
            />
            Desenvolvimento personalizado
          </label>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-lg font-semibold text-blue-900">Como conheceu a ConectaCorp?</legend>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Indicação"
              checked={formData.discoveredBy.includes('Indicação')}
              onChange={(e) => handleCheckboxChange(e, 'discoveredBy')}
              className="mr-2 accent-blue-900"
            />
            Indicação
          </label>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Redes sociais"
              checked={formData.discoveredBy.includes('Redes sociais')}
              onChange={(e) => handleCheckboxChange(e, 'discoveredBy')}
              className="mr-2 accent-blue-900"
            />
            Redes sociais
          </label>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Site"
              checked={formData.discoveredBy.includes('Site')}
              onChange={(e) => handleCheckboxChange(e, 'discoveredBy')}
              className="mr-2 accent-blue-900"
            />
            Site
          </label>
          <label className="block text-blue-900">
            <input
              type="checkbox"
              value="Outros"
              checked={formData.discoveredBy.includes('Outros')}
              onChange={(e) => handleCheckboxChange(e, 'discoveredBy')}
              className="mr-2 accent-blue-900"
            />
            Outros
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default PreferencesInterestsForm;
