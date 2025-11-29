import React, { useState, useRef, useEffect } from 'react';
import { CLINICAL_CASES } from './constants';
import { ProgressBar } from './components/ProgressBar';
import { Card } from './components/Card';
import { AlertBox } from './components/AlertBox';
import { 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  User,
  History,
  AlertCircle
} from 'lucide-react';

const TOTAL_STEPS = CLINICAL_CASES.length + 2; // +2 for Intro and Summary

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top on step change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep, isAnswerRevealed]);

  const handleStart = () => setCurrentStep(1);

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  };

  const handleOptionClick = (optionId: string) => {
    if (isAnswerRevealed) return;
    setSelectedOption(optionId);
    // Auto reveal after small delay or immediate? Let's do immediate reveal on click for smooth flow
    setIsAnswerRevealed(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-full shadow-lg text-blue-600 mb-4">
        <Stethoscope size={64} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Repaso Final</h1>
        <h2 className="text-xl text-blue-600 font-semibold">Integración de Clínica Médica</h2>
        <p className="text-slate-500">Hospital Naval • Oscar Luna Davila</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 max-w-sm w-full">
        <h3 className="font-bold text-slate-700 mb-2">Instrucciones:</h3>
        <ul className="text-left text-sm text-slate-600 space-y-2">
          <li>📱 Optimizado para tu celular.</li>
          <li>🧠 Analiza el caso clínico.</li>
          <li>👇 Toca la mejor opción.</li>
          <li>💡 Aprende de la retroalimentación.</li>
        </ul>
      </div>

      <button 
        onClick={handleStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transform transition active:scale-95 flex items-center gap-2 text-lg w-full max-w-xs justify-center"
      >
        Comenzar <ArrowRight />
      </button>
    </div>
  );

  const renderSummary = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-6 animate-fade-in">
      <div className="bg-yellow-100 p-6 rounded-full text-yellow-600 mb-2">
        <Activity size={48} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">¡Repaso Completado!</h2>
      
      <div className="w-full max-w-md space-y-4">
        <Card title="Para llevar a casa..." className="text-left bg-gradient-to-br from-white to-blue-50">
           <ol className="list-decimal pl-4 space-y-3 text-slate-700">
             <li><strong>La Clínica es Soberana:</strong> El laboratorio confirma, no adivina.</li>
             <li><strong>Estabilizar primero:</strong> En HDA o Sepsis, primero el ABC, luego la causa.</li>
             <li><strong>Patrones Clásicos:</strong> Dolor que migra = Apendicitis. Melena = HDA.</li>
           </ol>
        </Card>
      </div>

      <button 
        onClick={handleRestart}
        className="mt-8 bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2"
      >
        <RotateCcw size={18} /> Volver a empezar
      </button>

      <p className="text-xs text-slate-400 mt-8">Desarrollado para fines didácticos</p>
    </div>
  );

  const renderCase = (index: number) => {
    const caseData = CLINICAL_CASES[index];
    const isCorrect = selectedOption 
      ? caseData.quiz.options.find(o => o.id === selectedOption)?.isCorrect 
      : false;

    return (
      <div className="space-y-6 pb-24 animate-fade-in">
        
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 rounded-b-3xl shadow-lg -mx-4 mb-6">
          <h2 className="text-lg font-bold opacity-90 uppercase tracking-wider text-xs mb-1">Caso Clínico {index + 1}</h2>
          <h1 className="text-xl font-bold leading-tight">{caseData.title}</h1>
        </div>

        {/* Patient Data */}
        <Card title="Historia Clínica" icon={<User size={20} />}>
          <div className="space-y-3 text-slate-700">
            <div className="flex gap-2 text-sm">
              <span className="font-bold min-w-[80px]">Paciente:</span>
              <span>{caseData.patientInfo.demographics}</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="font-bold min-w-[80px]">Antecedentes:</span>
              <span>{caseData.patientInfo.history}</span>
            </div>
            <div className="p-3 bg-red-50 text-red-900 rounded-lg border-l-4 border-red-400 mt-2 text-sm">
              <strong>Motivo: </strong> {caseData.patientInfo.symptoms}
            </div>
          </div>
        </Card>

        {/* Question Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 px-2 flex items-center gap-2">
            <AlertCircle className="text-blue-500" size={20} />
            ¿Cuál es tu conducta?
          </h3>
          <p className="px-2 text-slate-600 mb-2">{caseData.quiz.question}</p>
          
          <div className="space-y-3">
            {caseData.quiz.options.map((option) => {
              let btnClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 shadow-sm relative overflow-hidden ";
              
              if (!isAnswerRevealed) {
                btnClass += "bg-white border-slate-200 hover:border-blue-400 active:bg-blue-50";
              } else {
                if (option.isCorrect) {
                  btnClass += "bg-green-50 border-green-500 text-green-900";
                } else if (selectedOption === option.id) {
                   btnClass += "bg-red-50 border-red-500 text-red-900 opacity-70";
                } else {
                  btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  disabled={isAnswerRevealed}
                  className={btnClass}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-medium text-sm pr-4">{option.text}</span>
                    {isAnswerRevealed && option.isCorrect && <CheckCircle2 className="text-green-600 shrink-0" size={20} />}
                    {isAnswerRevealed && selectedOption === option.id && !option.isCorrect && <XCircle className="text-red-500 shrink-0" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section (Revealed after answer) */}
        {isAnswerRevealed && (
          <div className="animate-slide-up space-y-6">
            
            {/* Immediate Feedback */}
            <div className={`p-4 rounded-lg text-sm font-medium ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-900'}`}>
              {isCorrect ? '¡Correcto!' : 'Atención:'} {caseData.quiz.explanation}
            </div>

            {/* Deep Dive Content */}
            <Card title={caseData.deepDive.title} icon={<History size={20} />}>
              <div className="text-slate-700">
                {caseData.deepDive.content}
              </div>
            </Card>

            {/* Pearls and Errors */}
            <div className="space-y-3">
              <AlertBox type="pearl" text={caseData.deepDive.pearl} />
              <AlertBox type="error" text={caseData.deepDive.error} />
            </div>

            {/* Next Button */}
            <div className="pt-4">
              <button 
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg"
              >
                Siguiente Caso <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div ref={topRef} />
      
      {currentStep > 0 && currentStep < TOTAL_STEPS && (
        <ProgressBar current={currentStep - 1} total={CLINICAL_CASES.length} />
      )}

      <main className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
        <div className="p-4 h-full">
          {currentStep === 0 && renderIntro()}
          {currentStep > 0 && currentStep <= CLINICAL_CASES.length && renderCase(currentStep - 1)}
          {currentStep > CLINICAL_CASES.length && renderSummary()}
        </div>
      </main>
      
      {/* Simple style for fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;