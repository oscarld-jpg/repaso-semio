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

export interface CaseData {
  id: string;
  title: string;
  patientInfo: {
    demographics: string;
    history: string;
    symptoms: string;
  };
  quiz: {
    question: string;
    options: QuizOption[];
    explanation: string; // Immediate feedback logic
  };
  deepDive: {
    title: string; // e.g., "Score de Wells"
    content: string | React.ReactNode;
    pearl: string; // "Perla Clínica"
    error: string; // "Error Mortal"
    imagePlaceholder?: string; // URL for a placeholder image
  };
}

export interface AppState {
  currentStepIndex: number;
  hasAnswered: boolean;
  score: number;
}