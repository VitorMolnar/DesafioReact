import React, { useEffect } from 'react';

interface AddressFormProps {
  formData: {
    zip: string;
    country: string;
    state: string;
    city: string;
    street: string;
    isBillingSameAsResidential: boolean;
  };
  updateFormData: (newData: Partial<AddressFormProps['formData']>) => void;
  setIsFormValid: (isValid: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, updateFormData, setIsFormValid }) => {
  useEffect(() => {
    const isFormValid =
      formData.zip.trim() !== '' &&
      formData.country.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.street.trim() !== '';
    setIsFormValid(isFormValid);
  }, [formData, setIsFormValid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'zip') {
      const maskedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);

      updateFormData({ [name]: maskedValue });

      if (maskedValue.length === 9) {
        fetchAddress(maskedValue);
      }
    } else {
      updateFormData({ [name]: value });
    }
  };

  const fetchAddress = async (zip: string) => {
    const sanitizedZip = zip.replace('-', '');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${sanitizedZip}/json/`);
      const data = await response.json();
      if (!data.erro) {
        updateFormData({
          state: data.uf,
          city: data.localidade,
          street: data.logradouro,
        });
      } else {
        alert('CEP não encontrado');
      }
    } catch (error) {
      alert('Erro ao buscar o CEP');
    }
  };

  return (
    <div className="px-4 sm:px-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center sm:text-left">Informações de Endereço</h2>
      <form className="space-y-4">
        <label className="block mb-2">
          CEP
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
            maxLength={9}
          />
        </label>
        <label className="block mb-2">
          País
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Estado
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Cidade
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Rua
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="flex items-center mt-4 bg-blue-50 p-2 rounded">
          <input
            type="checkbox"
            onChange={() => updateFormData({ isBillingSameAsResidential: !formData.isBillingSameAsResidential })}
            checked={formData.isBillingSameAsResidential}
            className="mr-2 accent-blue-900"
          />
          <span className="text-blue-900 text-sm sm:text-base">O endereço de cobrança é o mesmo que o residencial</span>
        </label>
      </form>
    </div>
  );
};

export default AddressForm;
