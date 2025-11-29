import React from 'react';

export enum CaseType {
  INTRO = 'INTRO',
  CASE = 'CASE',
  SUMMARY = 'SUMMARY'
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: QuizOption[];
  explanation: string | React.ReactNode; // Feedback específico de la pregunta
}

export interface CaseData {
  id: string;
  title: string;
  patientInfo: {
    demographics: string;
    history: string;
    symptoms: string;
  };
  questions: Question[]; // Ahora es un array de preguntas
  deepDive: {
    title: string;
    content: string | React.ReactNode;
    pearl: string;
    error: string;
  };
}
