import React from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StepsProps {
  currentStep: number;
}

const StyledStepLabel = styled(StepLabel)({
  '& .MuiStepLabel-label': {
    color: '#1E3A8A',
  },
  '& .Mui-active': {
    color: '#2563EB !important',
  },
  '& .Mui-completed': {
    color: '#1E3A8A',
  },
});

const StyledStepContent = styled(StepContent)({
  color: '#4B5563',
});

const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Informações Pessoais', description: 'Preencha seus dados pessoais para começar.' },
    { id: 2, label: 'Endereço', description: 'Informe o endereço para continuarmos.' },
    { id: 3, label: 'Informações Profissionais', description: 'Insira informações sobre sua ocupação.' },
    { id: 4, label: 'Preferências', description: 'Informe suas preferências e interesses.' },
    { id: 5, label: 'Confirmação', description: 'Revise e confirme seus dados.' },
  ];

  return (
    <Stepper activeStep={currentStep - 1} orientation="vertical">
      {steps.map((step) => (
        <Step key={step.id}>
          <StyledStepLabel>{step.label}</StyledStepLabel>
          {currentStep === step.id && (
            <StyledStepContent>
              <span className="text-sm">{step.description}</span>
            </StyledStepContent>
          )}
        </Step>
      ))}
    </Stepper>
  );
};

export default Steps;
