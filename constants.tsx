import React from 'react';
import { CaseData } from './types';

export const CLINICAL_CASES: CaseData[] = [
  {
    id: 'case-1',
    title: 'Caso 1: "Me falta el aire de golpe"',
    patientInfo: {
      demographics: 'Mujer, 65 años.',
      history: 'Cirugía de cadera hace 10 días. Reposo en cama.',
      symptoms: 'Disnea de inicio súbito + Dolor pleurítico + Taquicardia. Saturación inesperadamente baja.',
    },
    quiz: {
      question: 'Tiene alta probabilidad clínica (Wells Alto). ¿Cuál es la conducta inmediata?',
      options: [
        { id: 'a', text: 'Pedir Dímero D para confirmar', isCorrect: false },
        { id: 'b', text: 'Solicitar AngioTAC (o anticoagular si demora)', isCorrect: true },
        { id: 'c', text: 'Nebulizar con Salbutamol y reevaluar', isCorrect: false },
      ],
      explanation: '¡Cuidado! El Dímero D tiene alto Valor Predictivo Negativo (sirve para descartar en baja probabilidad), pero en ALTA probabilidad debemos confirmar con imagen.'
    },
    deepDive: {
      title: 'Score de Wells y Conducta',
      content: (
        <div className="text-sm">
          <p className="mb-2"><strong>Alta Probabilidad ({'>'}4 pts):</strong> El TEP es probable.</p>
          <ul className="list-disc pl-4 mb-2 space-y-1">
            <li>Clínica de TVP (3)</li>
            <li>Otro Dx menos probable (3)</li>
            <li>Inmovilización/Cirugía (1.5)</li>
          </ul>
          <p>La conducta es <strong>AngioTAC directa</strong>. Si hay demora, se anticoagula empíricamente.</p>
        </div>
      ),
      pearl: 'Disnea súbita + Dolor pleurítico + Taquicardia = TEP hasta demostrar lo contrario.',
      error: 'Pedir Dímero D en un paciente con ALTA probabilidad clínica o Wells alto.'
    }
  },
  {
    id: 'case-2',
    title: 'Caso 2: "Doctor, vomité sangre"',
    patientInfo: {
      demographics: 'Varón, 50 años.',
      history: 'Etilista crónico, consumo de AINEs.',
      symptoms: 'Hematemesis y Melena. Llega pálido e hipotenso (TA 90/60).',
    },
    quiz: {
      question: 'El paciente está hipotenso. ¿Cuál es el primer paso?',
      options: [
        { id: 'a', text: 'Enviar urgente a Endoscopía', isCorrect: false },
        { id: 'b', text: 'Colocar Sonda Nasogástrica', isCorrect: false },
        { id: 'c', text: 'Estabilizar Hemodinámicamente (ABC)', isCorrect: true },
      ],
      explanation: 'La endoscopía se realiza con el paciente estable. La prioridad es recuperar la volemia (vías, fluidos, sangre).'
    },
    deepDive: {
      title: 'Alta vs Baja: Reglas de Oro',
      content: (
        <div className="text-sm">
          <p className="mb-2"><strong>Hematemesis:</strong> Sangrado Alto ACTIVO.</p>
          <p className="mb-2"><strong>Melena:</strong> Sangrado Alto digerido (90%).</p>
          <p>Si es alcohólico pensar en <strong>Várices</strong>. Si toma AINEs pensar en <strong>Úlcera</strong>.</p>
        </div>
      ),
      pearl: 'Primero Estabilidad Hemodinámica (TA, FC, Perfusión), después buscar la causa.',
      error: 'Enviar a endoscopía a un paciente chocado (inestable).'
    }
  },
  {
    id: 'case-3',
    title: 'Caso 3: "Me duele mucho la panza"',
    patientInfo: {
      demographics: 'Joven de 20 años.',
      history: 'Sin antecedentes relevantes.',
      symptoms: 'Dolor migró de epigastrio a Fosa Ilíaca Derecha. Abdomen "en tabla", defensa y rebote (+).',
    },
    quiz: {
      question: '¿Qué indica la tríada Dolor + Defensa + Rebote?',
      options: [
        { id: 'a', text: 'Gastroenteritis aguda', isCorrect: false },
        { id: 'b', text: 'Irritación Peritoneal (Quirúrgico)', isCorrect: true },
        { id: 'c', text: 'Cólico renal', isCorrect: false },
      ],
      explanation: 'Esto es un Abdomen Agudo Peritoneal. El dolor que migra (Cronología de Murphy) es típico de apendicitis.'
    },
    deepDive: {
      title: 'Diagnóstico Diferencial',
      content: (
        <div className="text-sm grid grid-cols-1 gap-2">
          <div className="bg-slate-50 p-2 rounded border-l-4 border-blue-500">
            <strong>Apendicitis:</strong> Migración a FID. Blumberg (+).
          </div>
          <div className="bg-slate-50 p-2 rounded border-l-4 border-green-500">
            <strong>Colecistitis:</strong> Hipocondrio Derecho. Murphy (+).
          </div>
        </div>
      ),
      pearl: 'Vientre en tabla + Rebote = Quirúrgico hasta demostrar lo contrario.',
      error: 'Tapar el dolor con analgésicos potentes sin tener diagnóstico o evaluación quirúrgica.'
    }
  },
  {
    id: 'case-4',
    title: 'Caso 4: "Estoy cansada y subí de peso"',
    patientInfo: {
      demographics: 'Mujer, 25 años.',
      history: 'Irregularidades menstruales.',
      symptoms: 'Astenia, intolerancia al frío, piel seca, bradicardia, aumento de peso.',
    },
    quiz: {
      question: 'Además de descartar SOP, ¿qué estudio es indispensable?',
      options: [
        { id: 'a', text: 'Resonancia de Cerebro', isCorrect: false },
        { id: 'b', text: 'Perfil Tiroideo (TSH/T4L)', isCorrect: true },
        { id: 'c', text: 'Cortisol urinario', isCorrect: false },
      ],
      explanation: 'La clínica de "metabolismo lento" (frío, bradicardia, piel seca) apunta fuerte a Hipotiroidismo.'
    },
    deepDive: {
      title: 'Interpretando el Laboratorio',
      content: (
        <div className="text-sm space-y-2">
           <div className="p-2 bg-blue-100 rounded text-blue-900">
             <strong>TSH Alta + T4L Baja:</strong><br/> Hipotiroidismo PRIMARIO (Falla la glándula).
           </div>
           <div className="p-2 bg-purple-100 rounded text-purple-900">
             <strong>TSH Baja + T4L Baja:</strong><br/> Hipotiroidismo CENTRAL (Falla hipófisis).
           </div>
        </div>
      ),
      pearl: 'Mujer joven + Trastorno menstrual + Aumento de peso = Pedir TSH siempre.',
      error: 'Diagnosticar Ovario Poliquístico (SOP) sin descartar primero patología tiroidea.'
    }
  },
  {
    id: 'case-5',
    title: 'Caso 5: "Se me hinchó la panza"',
    patientInfo: {
      demographics: 'Varón, 55 años.',
      history: 'Hepatitis viral previa.',
      symptoms: 'Abdomen globoso (Ascitis), circulación colateral, arañas vasculares.',
    },
    quiz: {
      question: 'Realizas una paracentesis. ¿Qué indica un GASA ≥ 1.1?',
      options: [
        { id: 'a', text: 'Carcinomatosis peritoneal', isCorrect: false },
        { id: 'b', text: 'Hipertensión Portal', isCorrect: true },
        { id: 'c', text: 'Tuberculosis peritoneal', isCorrect: false },
      ],
      explanation: 'El GASA (Gradiente Albúmina Suero-Ascitis) alto indica que la presión hidrostática está empujando el líquido, típico de HTP/Cirrosis.'
    },
    deepDive: {
      title: 'El GASA',
      content: (
        <div className="text-sm">
           <p className="mb-2"><strong>GASA = Albúmina Suero - Albúmina Ascitis</strong></p>
           <ul className="space-y-1">
             <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> ≥ 1.1: Cirrosis, Falla Cardíaca.</li>
             <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span> &lt; 1.1: Cáncer, TBC, Pancreatitis.</li>
           </ul>
        </div>
      ),
      pearl: 'Estigmas (Arañas, Eritema) + Ascitis = Cirrosis casi seguro.',
      error: 'No punzar una ascitis nueva (hay que descartar infección/cáncer).'
    }
  }
];