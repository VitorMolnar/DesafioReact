import React, { useEffect, useState } from 'react';

interface PersonalInfoFormProps {
  formData: {
    fullName: string;
    birthDate: string;
    email: string;
    phone: string;
  };
  updateFormData: (newData: Partial<PersonalInfoFormProps['formData']>) => void;
  setIsFormValid: (isValid: boolean) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, updateFormData, setIsFormValid }) => {
  const [ageError, setAgeError] = useState('');
  const [dateError, setDateError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isDateValid = (birthDate: string) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(birthDate)) {
        setDateError('Data inválida');
        return false;
      }

      const birth = new Date(birthDate);
      const year = birth.getFullYear();
      if (year < 1900 || year > new Date().getFullYear()) {
        setDateError('Data inválida');
        return false;
      }

      setDateError('');
      return true;
    };

    const isAgeValid = (birthDate: string) => {
      const today = new Date();
      const birth = new Date(birthDate);
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const isValid = age > 18 || (age === 18 && monthDiff >= 0 && today.getDate() >= birth.getDate());
      setAgeError(isValid ? '' : 'O usuário deve ter pelo menos 18 anos.');
      return isValid;
    };

    const isFormValid =
      formData.fullName.trim() !== '' &&
      formData.birthDate.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      isDateValid(formData.birthDate) &&
      isAgeValid(formData.birthDate);

    setIsFormValid(isFormValid);
  }, [formData, setIsFormValid]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateFormData({ birthDate: value });

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      const isDateValid = (birthDate: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthDate)) {
          setDateError('Data inválida');
          return false;
        }

        const birth = new Date(birthDate);
        const year = birth.getFullYear();
        if (year < 1900 || year > new Date().getFullYear()) {
          setDateError('Data inválida');
          return false;
        }

        setDateError('');
        return true;
      };
      
      isDateValid(value);
    }, 3000);

    setTypingTimeout(timeout);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
    updateFormData({ phone });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Informações Pessoais</h2>
      <form>
        <label className="block mb-2">
          Nome completo
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Data de nascimento
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleDateChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
          {dateError && <p className="text-red-500 mt-1">{dateError}</p>}
          {!dateError && ageError && <p className="text-red-500 mt-1">{ageError}</p>}
        </label>
        <label className="block mb-2">
          Endereço de e-mail
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
        <label className="block mb-2">
          Telefone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full p-2 border border-blue-900 rounded mt-1 focus:outline-none focus:border-blue-600"
            required
          />
        </label>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
