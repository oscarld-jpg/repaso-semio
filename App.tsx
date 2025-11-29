import React, { useState, useRef, useEffect } from 'react';
import { CLINICAL_CASES } from './constants';
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
  ChevronLeft,
  BookOpen,
  HelpCircle, 
  LayoutDashboard
} from 'lucide-react';

const TOTAL_CASES = CLINICAL_CASES.length;

// Estados posibles de la vista
type ViewState = 'INTRO' | 'QUESTION' | 'FEEDBACK' | 'CASE_SUMMARY' | 'FINAL_SUMMARY';

const App: React.FC = () => {
  const [caseIndex, setCaseIndex] = useState(0); // 0 to N-1
  const [questionIndex, setQuestionIndex] = useState(0); // 0 to 2
  const [viewState, setViewState] = useState<ViewState>('INTRO');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const topRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al cambiar de estado importante
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [caseIndex, viewState]); // Scroll on new case or major view change

  // --- HANDLERS ---

  const startClass = () => {
    setCaseIndex(0);
    setQuestionIndex(0);
    setViewState('QUESTION');
  };

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    setViewState('FEEDBACK');
  };

  const nextStep = () => {
    const currentCase = CLINICAL_CASES[caseIndex];
    
    // Si estamos en feedback, decidir a dónde vamos
    if (viewState === 'FEEDBACK') {
      if (questionIndex < currentCase.questions.length - 1) {
        // Ir a la siguiente pregunta del mismo caso
        setQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setViewState('QUESTION');
      } else {
        // Se acabaron las preguntas, ir al resumen del caso (Deep Dive)
        setViewState('CASE_SUMMARY');
      }
    } 
    // Si estamos en el resumen del caso, ir al siguiente caso
    else if (viewState === 'CASE_SUMMARY') {
      if (caseIndex < TOTAL_CASES - 1) {
        setCaseIndex(prev => prev + 1);
        setQuestionIndex(0);
        setSelectedOption(null);
        setViewState('QUESTION');
      } else {
        // Se acabaron los casos
        setViewState('FINAL_SUMMARY');
      }
    }
  };

  const prevStep = () => {
    if (viewState === 'CASE_SUMMARY') {
        setViewState('FEEDBACK'); 
        return;
    }

    if (viewState === 'FEEDBACK') {
        setViewState('QUESTION');
        setSelectedOption(null);
        return;
    }

    if (viewState === 'QUESTION') {
        if (questionIndex > 0) {
            setQuestionIndex(prev => prev - 1);
            setSelectedOption(null); 
        } else if (caseIndex > 0) {
            setCaseIndex(prev => prev - 1);
            setViewState('CASE_SUMMARY');
        } else {
            setViewState('INTRO');
        }
    }
  };

  const handleRestart = () => {
    setCaseIndex(0);
    setQuestionIndex(0);
    setSelectedOption(null);
    setViewState('INTRO');
  };

  // --- RENDERERS ---

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[90dvh] text-center px-4 space-y-6 animate-fade-in py-8">
      <div className="bg-white p-6 rounded-full shadow-lg text-blue-600 mb-2 border-4 border-blue-50">
        <Stethoscope size={56} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800 leading-tight">Clínica Médica<br/><span className="text-blue-600">Ronda de Casos</span></h1>
        <p className="text-slate-500 font-medium">Hospital Naval • Oscar Luna Dávila</p>
      </div>
      
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg w-full text-left">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
          <Activity size={20} className="text-blue-500"/> Dinámica de la Clase:
        </h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
            <p className="text-slate-600 text-sm">Presentación del caso clínico con datos reales.</p>
          </li>
          <li className="flex gap-3">
            <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
            <p className="text-slate-600 text-sm">Responde <strong>3 preguntas clave</strong> por caso (Diagnóstico, Diferencial, Tratamiento).</p>
          </li>
          <li className="flex gap-3">
            <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
            <p className="text-slate-600 text-sm">Conclusiones clave y perlas clínicas al finalizar cada caso.</p>
          </li>
        </ul>
      </div>

      <button 
        onClick={startClass}
        className="w-full bg-slate-900 active:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-xl transform transition active:scale-95 flex items-center justify-center gap-3 text-lg"
      >
        Iniciar Ronda <ArrowRight size={20} />
      </button>
    </div>
  );

  const renderFinalSummary = () => (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] text-center px-4 space-y-6 animate-fade-in py-8">
      <div className="bg-yellow-100 p-6 rounded-full text-yellow-600 mb-2 border-4 border-yellow-50">
        <Activity size={48} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">¡Ronda Finalizada!</h2>
      <p className="text-slate-600">Has completado los 5 casos clínicos fundamentales.</p>
      
      <div className="w-full text-left">
        <Card title="Conceptos para llevar a casa" className="bg-white border-blue-100">
           <ul className="list-disc pl-4 space-y-3 text-slate-700 text-sm">
             <li><strong>Sistemática:</strong> El ojo no ve lo que la mente no sabe.</li>
             <li><strong>Urgencia:</strong> Primero estabilizar (ABC), después diagnosticar.</li>
             <li><strong>Contexto:</strong> Un laboratorio aislado no dice nada; la clínica es soberana.</li>
           </ul>
        </Card>
      </div>

      <button 
        onClick={handleRestart}
        className="mt-8 bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 text-sm"
      >
        <RotateCcw size={16} /> Reiniciar Clase
      </button>
    </div>
  );

  const PatientCard = ({ caseData, compact = false }: { caseData: any, compact?: boolean }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-4 transition-all ${compact ? 'opacity-90' : ''}`}>
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center gap-2">
            <User size={16} className="text-blue-600"/>
            <h3 className="font-bold text-slate-700 text-sm">Historia Clínica</h3>
        </div>
        <div className="p-4 text-sm text-slate-700 space-y-2">
             <p><span className="font-bold">Paciente:</span> {caseData.patientInfo.demographics}</p>
             {!compact && <p><span className="font-bold">AP:</span> {caseData.patientInfo.history}</p>}
             <div className="bg-slate-50 p-2 rounded border-l-2 border-blue-400 mt-1">
                <span className="font-bold text-slate-900">MC:</span> {caseData.patientInfo.symptoms}
             </div>
        </div>
    </div>
  );

  const renderQuestion = () => {
    const currentCase = CLINICAL_CASES[caseIndex];
    const currentQ = currentCase.questions[questionIndex];

    return (
      <div className="animate-fade-in pb-20">
        <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                CASO {caseIndex + 1} / {TOTAL_CASES}
            </span>
            <span className="text-xs font-bold text-slate-400">
                Pregunta {questionIndex + 1} de {currentCase.questions.length}
            </span>
        </div>

        <h1 className="text-xl font-bold text-slate-800 mb-4 leading-snug">{currentCase.title}</h1>
        
        <PatientCard caseData={currentCase} />

        <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={18} className="text-blue-500" />
                <h3 className="font-bold text-slate-800 text-lg">Desafío Clínico</h3>
            </div>
            
            <p className="text-slate-700 font-medium mb-4 text-sm leading-relaxed border-l-4 border-slate-200 pl-3">
                {currentQ.text}
            </p>

            <div className="space-y-3">
                {currentQ.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionClick(option.id)}
                        className="w-full p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left active:bg-blue-50 active:border-blue-500 active:scale-[0.99] transition-all flex items-start gap-3"
                    >
                        <div className="bg-slate-100 text-slate-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-slate-300">
                            {option.id.toUpperCase()}
                        </div>
                        <span className="text-slate-700 text-sm leading-snug">{option.text}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    );
  };

  const renderFeedback = () => {
    const currentCase = CLINICAL_CASES[caseIndex];
    const currentQ = currentCase.questions[questionIndex];
    const option = currentQ.options.find(o => o.id === selectedOption);
    const isCorrect = option?.isCorrect || false;

    return (
      <div className="animate-slide-up pb-24">
         <div className={`p-6 -mx-4 mb-6 rounded-b-3xl text-white shadow-lg ${isCorrect ? 'bg-green-600' : 'bg-red-500'}`}>
            <div className="flex items-center gap-3 mb-2">
                {isCorrect ? <CheckCircle2 size={28} className="text-green-100" /> : <XCircle size={28} className="text-red-100" />}
                <h2 className="text-xl font-bold">{isCorrect ? '¡Correcto!' : 'Incorrecto'}</h2>
            </div>
            {!isCorrect && (
                <div className="mb-2 text-white/80 text-xs uppercase font-bold tracking-wider">
                    La respuesta correcta era la {currentQ.options.find(o => o.isCorrect)?.id.toUpperCase()}
                </div>
            )}
            <div className="bg-white/10 p-3 rounded-lg mt-2 backdrop-blur-sm">
                <div className="text-white text-sm leading-relaxed">
                    {currentQ.explanation}
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
             <button 
                onClick={nextStep}
                className="w-full max-w-md mx-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
                {questionIndex < currentCase.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Análisis del Caso'} 
                <ArrowRight size={18} />
            </button>
        </div>
      </div>
    );
  };

  const renderCaseSummary = () => {
    const currentCase = CLINICAL_CASES[caseIndex];
    
    return (
      <div className="animate-slide-up pb-24">
        <div className="bg-slate-800 text-white p-6 rounded-b-3xl shadow-md -mx-4 mb-6">
            <div className="flex items-center gap-2 mb-1 text-blue-300">
                <LayoutDashboard size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Análisis Profundo</span>
            </div>
            <h1 className="text-2xl font-bold leading-tight mb-2">{currentCase.title}</h1>
            <p className="text-slate-300 text-sm">Resumen de conceptos clave</p>
        </div>

        <div className="space-y-6">
            <Card title={currentCase.deepDive.title} icon={<BookOpen size={18} />}>
                <div className="text-slate-700 text-sm leading-relaxed">
                    {currentCase.deepDive.content}
                </div>
            </Card>

            <div className="space-y-3">
                <AlertBox type="pearl" text={currentCase.deepDive.pearl} />
                <AlertBox type="error" text={currentCase.deepDive.error} />
            </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
             <button 
                onClick={nextStep}
                className="w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
                {caseIndex < TOTAL_CASES - 1 ? 'Pasar al Siguiente Caso' : 'Finalizar Clase'} 
                <ArrowRight size={18} />
            </button>
        </div>
      </div>
    );
  };

  const renderTopNav = () => {
    if (viewState === 'INTRO' || viewState === 'FINAL_SUMMARY') return null;

    return (
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm px-4 h-14 flex items-center justify-between">
            <button 
                onClick={prevStep}
                className="p-2 -ml-2 text-slate-500 hover:text-blue-600 rounded-full transition-colors"
            >
                <ChevronLeft size={24} />
            </button>

            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {viewState === 'CASE_SUMMARY' ? 'RESUMEN' : 'EN VIVO'}
            </span>
            <div className="w-8"></div>
        </div>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
      <div ref={topRef} />
      
      <main className="max-w-md mx-auto min-h-[100dvh] bg-white shadow-2xl overflow-hidden relative flex flex-col">
        {renderTopNav()}

        {viewState !== 'INTRO' && viewState !== 'FINAL_SUMMARY' && (
            <div className="w-full h-1 bg-slate-100">
                <div 
                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${((caseIndex) / TOTAL_CASES) * 100}%` }}
                />
            </div>
        )}

        <div className="flex-1 p-4">
          {viewState === 'INTRO' && renderIntro()}
          {viewState === 'QUESTION' && renderQuestion()}
          {viewState === 'FEEDBACK' && renderFeedback()}
          {viewState === 'CASE_SUMMARY' && renderCaseSummary()}
          {viewState === 'FINAL_SUMMARY' && renderFinalSummary()}
        </div>
      </main>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;