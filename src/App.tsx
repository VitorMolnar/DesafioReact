import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Steps from './components/Steps';
import PersonalInfoForm from './components/Forms/PersonalInfoForm';
import AddressForm from './components/Forms/AddressForm';
import ProfessionalInfoForm from './components/Forms/ProfessionalInfoForm';
import PreferencesInterestsForm from './components/Forms/PreferencesInterestsForm';
import ConfirmationForm from './components/Forms/ConfirmationForm';
import SuccessScreen from './components/SuccessScreen';
import ConstructionPage from './pages/ConstructionPage';
import { fadeIn } from './animations';

interface FormData {
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
  termsAccepted?: boolean;
}

function App() {
  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    birthDate: '',
    email: '',
    phone: '',
    zip: '',
    country: 'Brasil',
    state: '',
    city: '',
    street: '',
    isBillingSameAsResidential: false,
    occupation: '',
    company: '',
    industry: '',
    salaryRange: '',
    interests: [],
    discoveredBy: [],
    termsAccepted: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (isFormValid) {
      markStepAsCompleted(step);
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const markStepAsCompleted = (currentStep: number) => {
    setCompletedSteps((prevSteps) => {
      if (!prevSteps.includes(currentStep)) {
        return [...prevSteps, currentStep];
      }
      return prevSteps;
    });
  };

  const handleSubmit = () => {
    console.log("JSON com os dados:", formData);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setIsFormValid(false);
    setIsSubmitted(false);
    setCompletedSteps([]);
    setFormData({
      fullName: '',
      birthDate: '',
      email: '',
      phone: '',
      zip: '',
      country: 'Brasil',
      state: '',
      city: '',
      street: '',
      isBillingSameAsResidential: false,
      occupation: '',
      company: '',
      industry: '',
      salaryRange: '',
      interests: [],
      discoveredBy: [],
      termsAccepted: false,
    });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-blue-50">
        <Header
          resetForm={resetForm}
          currentStep={step}
          setStep={setStep}
          completedSteps={completedSteps}
        />
        <div className="flex-grow pt-24">
          <Routes>
            <Route path="/construction" element={<ConstructionPage />} />
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="flex flex-col min-h-screen"
                >
                  <div className="flex-grow flex items-center justify-center">
                    {isSubmitted ? (
                      <SuccessScreen />
                    ) : (
                      <div className="w-full max-w-5xl mx-auto p-4 sm:p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                        <Steps currentStep={step} />
                        <main
                          className="flex-1 bg-white p-6 sm:p-8 shadow-md rounded-lg overflow-y-auto custom-scrollbar"
                          style={{ height: '500px' }}
                        >
                          <motion.div {...fadeIn} key={step}>
                            {step === 1 && (
                              <PersonalInfoForm
                                formData={formData}
                                updateFormData={updateFormData}
                                setIsFormValid={setIsFormValid}
                              />
                            )}
                            {step === 2 && (
                              <AddressForm
                                formData={formData}
                                updateFormData={updateFormData}
                                setIsFormValid={setIsFormValid}
                              />
                            )}
                            {step === 3 && (
                              <ProfessionalInfoForm
                                formData={formData}
                                updateFormData={updateFormData}
                                setIsFormValid={setIsFormValid}
                              />
                            )}
                            {step === 4 && (
                              <PreferencesInterestsForm
                                formData={formData}
                                updateFormData={updateFormData}
                                setIsFormValid={setIsFormValid}
                              />
                            )}
                            {step === 5 && (
                              <ConfirmationForm
                                formData={formData}
                                updateFormData={updateFormData}
                                onSubmit={handleSubmit}
                              />
                            )}
                          </motion.div>
                          <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0">
                            {step > 1 && (
                              <button onClick={handlePrevious} className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto">
                                Anterior
                              </button>
                            )}
                            <div className="flex-1 flex justify-end">
                              {step < 5 ? (
                                <button
                                  onClick={handleNext}
                                  className={`px-4 py-2 rounded w-full sm:w-auto ${
                                    isFormValid
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  }`}
                                  disabled={!isFormValid}
                                >
                                  Próximo
                                </button>
                              ) : (
                                <button
                                  onClick={handleSubmit}
                                  className={`px-4 py-2 rounded w-full sm:w-auto ${
                                    isFormValid
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  }`}
                                  disabled={!isFormValid}
                                >
                                  Finalizar Cadastro
                                </button>
                              )}
                            </div>
                          </div>
                        </main>
                      </div>
                    )}
                  </div>
                  <Footer />
                </motion.div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
