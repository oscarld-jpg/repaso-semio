import React from 'react';
import { CaseData } from './types';

export const CLINICAL_CASES: CaseData[] = [
  {
    id: 'case-1',
    title: 'Caso 1: "Me falta el aire de golpe"',
    patientInfo: {
      demographics: 'Varón, 63 años.',
      history: 'Post-operatorio de rodilla (día 2). Fumador.',
      symptoms: 'Disnea súbita al ir al baño + Dolor pleurítico + Taquicardia (110 lpm). SatO2 88%.',
    },
    questions: [
      {
        id: 'q1_action',
        text: 'Antes de hablar de diagnósticos: Tienes un paciente con disnea súbita y taquicardia. ¿Qué maniobra del EXAMEN FÍSICO realizas inmediatamente para orientar la causa?',
        options: [
          { id: 'a', text: 'Auscultación cardíaca buscando soplos', isCorrect: false },
          { id: 'b', text: 'Examinar pantorrillas (asimetría, dolor, empastamiento)', isCorrect: true },
          { id: 'c', text: 'Palpación abdominal profunda', isCorrect: false }
        ],
        explanation: '¡Exacto! Ante disnea súbita + cirugía reciente, debes buscar la FUENTE del problema. Una pantorrilla asimétrica o dolorosa (Signo de Homans/Ollow) sugiere TVP, orientando el caso a TEP.'
      },
      {
        id: 'q1',
        text: 'Al examinar, encuentras la pierna derecha edematizada y caliente. Ahora sí, ¿cuál es tu sospecha sindrómica principal?',
        options: [
          { id: 'a', text: 'Síndrome Coronario Agudo', isCorrect: false },
          { id: 'b', text: 'Tromboembolismo Pulmonar (TEP)', isCorrect: true },
          { id: 'c', text: 'Neumonía intrahospitalaria', isCorrect: false }
        ],
        explanation: 'La clínica es soberana: Disnea súbita + Taquicardia + Signos de TVP en contexto post-quirúrgico = TEP hasta que se demuestre lo contrario.'
      },
      {
        id: 'q2',
        text: 'Vamos a estratificar el riesgo. Calculando el Score de Wells para este paciente específico. ¿Qué probabilidad clínica tiene?',
        options: [
          { id: 'a', text: 'Baja (0-1 puntos)', isCorrect: false },
          { id: 'b', text: 'Intermedia', isCorrect: false },
          { id: 'c', text: 'Alta (≥ 7 puntos)', isCorrect: true }
        ],
        explanation: (
          <div className="text-sm">
            <p>Suma: Signos TVP (3.0) + TEP diagnóstico más probable (3.0) + Taquicardia (1.5) + Cirugía reciente (1.5). <strong>Total: 9 Puntos (Alta).</strong></p>
          </div>
        )
      },
      {
        id: 'q3',
        text: 'Con probabilidad ALTA, ¿cuál es la conducta diagnóstica "Gold Standard" a seguir?',
        options: [
          { id: 'a', text: 'Pedir Dímero D para descartar', isCorrect: false },
          { id: 'b', text: 'AngioTAC de Tórax (Protocolo TEP)', isCorrect: true },
          { id: 'c', text: 'Ecocardiograma Doppler', isCorrect: false }
        ],
        explanation: 'En probabilidad ALTA, el Dímero D no sirve (un negativo puede ser falso). Se va directo a imagen confirmatoria (AngioTAC) y se inicia anticoagulación si no hay contraindicación.'
      }
    ],
    deepDive: {
      title: 'Cálculo del Score de Wells (Este Paciente)',
      content: (
        <div className="text-sm space-y-2">
          <p className="mb-2 text-slate-600">Veamos por qué este paciente tiene <strong>Alta Probabilidad (9 pts)</strong>:</p>
          <table className="w-full text-xs border-collapse border border-slate-200 mb-2 shadow-sm">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="p-2 border text-left">Criterio</th>
                <th className="p-2 border text-center">Valor</th>
                <th className="p-2 border text-center">¿Presente?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-50">
                <td className="p-2 border font-medium">Signos Clínicos de TVP</td>
                <td className="p-2 border text-center">3.0</td>
                <td className="p-2 border text-center font-bold text-green-600">SÍ (+3.0)</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="p-2 border font-medium">TEP es el dx más probable</td>
                <td className="p-2 border text-center">3.0</td>
                <td className="p-2 border text-center font-bold text-green-600">SÍ (+3.0)</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="p-2 border">Frecuencia Cardíaca &gt; 100</td>
                <td className="p-2 border text-center">1.5</td>
                <td className="p-2 border text-center font-bold text-green-600">SÍ (+1.5)</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="p-2 border">Cirugía/Inmovilización &lt;4 sem</td>
                <td className="p-2 border text-center">1.5</td>
                <td className="p-2 border text-center font-bold text-green-600">SÍ (+1.5)</td>
              </tr>
              <tr>
                <td className="p-2 border text-slate-400">Antecedente TVP/TEP previo</td>
                <td className="p-2 border text-center text-slate-400">1.5</td>
                <td className="p-2 border text-center text-slate-300">NO</td>
              </tr>
              <tr>
                <td className="p-2 border text-slate-400">Hemoptisis</td>
                <td className="p-2 border text-center text-slate-400">1.0</td>
                <td className="p-2 border text-center text-slate-300">NO</td>
              </tr>
              <tr>
                <td className="p-2 border text-slate-400">Cáncer activo</td>
                <td className="p-2 border text-center text-slate-400">1.0</td>
                <td className="p-2 border text-center text-slate-300">NO</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-100 font-bold">
               <tr>
                <td className="p-2 border text-right">TOTAL PACIENTE:</td>
                <td className="p-2 border text-center" colSpan={2}>9.0 Puntos (ALTO)</td>
              </tr>
            </tfoot>
          </table>
          <p className="text-xs text-slate-500 italic">Interpretación: &gt;6 Puntos = Riesgo Alto.</p>
        </div>
      ),
      pearl: 'Siempre revisa las piernas. Una pantorrilla asimétrica, caliente y dolorosa te da el diagnóstico de origen (TVP) y suma 3 puntos críticos.',
      error: 'Pedir Dímero D en pacientes de ALTA probabilidad (9 puntos). Es una pérdida de tiempo; el paciente necesita imagen.'
    }
  },
  {
    id: 'case-2',
    title: 'Caso 2: "Vomité sangre"',
    patientInfo: {
      demographics: 'Varón, 54 años.',
      history: 'Alcoholismo crónico, lumbalgia (toma AINEs).',
      symptoms: 'Hematemesis franca y mareos. TA 90/60 mmHg (Hipotenso). FC 115 lpm.',
    },
    questions: [
      {
        id: 'q1',
        text: 'El paciente está hipotenso y taquicárdico. ¿Cuál es la conducta TERAPÉUTICA prioritaria antes de investigar la causa?',
        options: [
          { id: 'a', text: 'Colocar sonda nasogástrica para lavar', isCorrect: false },
          { id: 'b', text: 'Endoscopía digestiva de urgencia', isCorrect: false },
          { id: 'c', text: 'Estabilización Hemodinámica (Vías, Cristaloides)', isCorrect: true }
        ],
        explanation: '¡Primero la vida! No se puede endoscopiar a un paciente chocado. Primero ABC: Vías gruesas, reposición de volumen y estabilizar TA.'
      },
      {
        id: 'q2',
        text: 'Al interrogar, refiere heces negras y fétidas (melena). Semiologicamente, ¿qué indica esto?',
        options: [
          { id: 'a', text: 'Confirma origen Digestivo ALTO (90%)', isCorrect: true },
          { id: 'b', text: 'Es patognomónico de hemorroides internas', isCorrect: false },
          { id: 'c', text: 'Sugiere Cáncer de Colon izquierdo', isCorrect: false }
        ],
        explanation: 'La melena requiere sangre digerida por ácido. Indica sangrado por encima del ángulo de Treitz (HDA).'
      },
      {
        id: 'q3',
        text: 'Considerando sus antecedentes (Alcohol + AINEs), ¿cuáles son los diagnósticos más probables?',
        options: [
          { id: 'a', text: 'Diverticulitis vs Angiodisplasia', isCorrect: false },
          { id: 'b', text: 'Várices Esofágicas vs Úlcera Péptica', isCorrect: true },
          { id: 'c', text: 'Mallory-Weiss vs Esofagitis', isCorrect: false }
        ],
        explanation: 'Alcoholismo sugiere Hipertensión Portal (Várices). AINEs sugiere Gastritis erosiva o Úlcera. Son las causas top de HDA.'
      }
    ],
    deepDive: {
      title: 'HDA vs HDB: La Clínica',
      content: (
        <div className="text-sm space-y-2">
          <div className="p-2 bg-red-50 rounded border-l-4 border-red-400">
            <strong>Hemorragia Alta:</strong> Hematemesis (vómito rojo/café) o Melena (negra). Aumenta la UREA plasmática (digestión de proteínas).
          </div>
          <div className="p-2 bg-amber-50 rounded border-l-4 border-amber-400">
            <strong>Hemorragia Baja:</strong> Hematoquecia (sangre fresca/rutilante) o Proctorragia. Generalmente sin inestabilidad tan brusca salvo masiva.
          </div>
        </div>
      ),
      pearl: 'Melena = Sangre digerida. Si ves sangre roja rutilante por recto PERO el paciente está chocado, pensá en HDA masiva con tránsito acelerado.',
      error: 'Asumir que si sale sangre roja por abajo "seguro es del colon" en un paciente inestable.'
    }
  },
  {
    id: 'case-3',
    title: 'Caso 3: "Dolor abdominal intenso"',
    patientInfo: {
      demographics: 'Mujer, 27 años.',
      history: 'Sana previamente.',
      symptoms: 'Dolor comenzó en epigastrio y migró a Fosa Ilíaca Derecha. Fiebre 38°C. Defensa muscular.',
    },
    questions: [
      {
        id: 'q1',
        text: 'Examen físico: Defensa muscular involuntaria y Blumberg (+). ¿Cuál es el diagnóstico SINDRÓMICO?',
        options: [
          { id: 'a', text: 'Síndrome de Intestino Irritable', isCorrect: false },
          { id: 'b', text: 'Abdomen Agudo Peritoneal (Quirúrgico)', isCorrect: true },
          { id: 'c', text: 'Cólico Biliar simple', isCorrect: false }
        ],
        explanation: 'La defensa (vientre en tabla) y el rebote (Blumberg) indican irritación del peritoneo parietal. Es una urgencia.'
      },
      {
        id: 'q2',
        text: 'Si el dolor fuera en Hipocondrio Derecho irradiado a escápula tras comer grasas, pensarías en:',
        options: [
          { id: 'a', text: 'Colecistitis Aguda', isCorrect: true },
          { id: 'b', text: 'Pancreatitis Aguda', isCorrect: false },
          { id: 'c', text: 'Apendicitis Aguda', isCorrect: false }
        ],
        explanation: 'Correcto. Colecistitis = Signo de Murphy (+), dolor HD. Pancreatitis = Dolor "en cinturón" hacia atrás.'
      },
      {
        id: 'q3',
        text: 'Volviendo a nuestra paciente (dolor en FID que migró). ¿Cuál es la conducta inicial adecuada?',
        options: [
          { id: 'a', text: 'Alta con analgésicos y control en 48hs', isCorrect: false },
          { id: 'b', text: 'Nada por boca (NPO), Vía Periférica, Interconsulta Cirugía', isCorrect: true },
          { id: 'c', text: 'Antibióticos orales inmediatos sin imagen', isCorrect: false }
        ],
        explanation: 'Ante sospecha de apendicitis: Reposo digestivo pre-quirúrgico, hidratación y valoración por cirujano.'
      }
    ],
    deepDive: {
      title: 'Diagnóstico Diferencial: Ubicación',
      content: (
        <div className="text-sm grid grid-cols-1 gap-2">
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>FID (Fosa Ilíaca Der):</strong> Apendicitis (Cronología de Murphy: epigastrio -> FID).</li>
            <li><strong>HD (Hipocondrio Der):</strong> Patología Biliar (Colecistitis/Colangitis).</li>
            <li><strong>Epigastrio en Cinturón:</strong> Pancreatitis (buscar alcohol o litiasis).</li>
            <li><strong>FII (Fosa Ilíaca Izq):</strong> Diverticulitis (común en mayores).</li>
          </ul>
        </div>
      ),
      pearl: 'El dolor visceral es mal localizado (línea media). Cuando se inflama el peritoneo parietal, el dolor se localiza (en el lugar del órgano).',
      error: 'Dar el alta a un dolor abdominal sin haber palpado el abdomen buscando signos de peritonitis.'
    }
  },
  {
    id: 'case-4',
    title: 'Caso 4: "Cansancio y peso"',
    patientInfo: {
      demographics: 'Mujer, 32 años.',
      history: 'Aumento de 8kg en 6 meses. Caída de cabello.',
      symptoms: 'Astenia, constipación, piel seca, bradicardia (58 lpm), irregularidad menstrual.',
    },
    questions: [
      {
        id: 'q1',
        text: 'La paciente consulta por "problemas hormonales". Clínicamente, ¿qué cuadro se ajusta mejor?',
        options: [
          { id: 'a', text: 'Hipertiroidismo', isCorrect: false },
          { id: 'b', text: 'Síndrome de Ovario Poliquístico (SOP)', isCorrect: false },
          { id: 'c', text: 'Hipotiroidismo', isCorrect: true }
        ],
        explanation: 'El SOP da obesidad y trastornos menstruales, PERO la piel seca, el frío, la bradicardia y la constipación son clásicos del Hipotiroidismo.'
      },
      {
        id: 'q2',
        text: 'Solicitas TSH y T4 Libre. Llega: TSH 15 uUI/mL (Alta), T4L 0.6 ng/dL (Baja). Diagnóstico:',
        options: [
          { id: 'a', text: 'Hipotiroidismo Primario', isCorrect: true },
          { id: 'b', text: 'Hipotiroidismo Central (Hipofisario)', isCorrect: false },
          { id: 'c', text: 'Hipotiroidismo Subclínico', isCorrect: false }
        ],
        explanation: 'Falla la glándula tiroides (Primario), por eso la hipófisis grita (TSH alta) intentando estimularla, pero no responde (T4 baja).'
      },
      {
        id: 'q3',
        text: 'Si la paciente tuviera hirsutismo, acné y resistencia a la insulina, pensarías más en:',
        options: [
          { id: 'a', text: 'Enfermedad de Addison', isCorrect: false },
          { id: 'b', text: 'Síndrome de Ovario Poliquístico (SOP)', isCorrect: true },
          { id: 'c', text: 'Prolactinoma', isCorrect: false }
        ],
        explanation: 'Exacto. El SOP es un estado hiperandrogénico. El hipotiroidismo es un estado hipometabólico.'
      }
    ],
    deepDive: {
      title: 'El Eje Tiroideo',
      content: (
        <div className="text-sm">
          <p className="mb-2">La TSH es la prueba de screening más sensible.</p>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">TSH ↑ T4L ↓:</span> Hipotiroidismo Clínico (El más común, Hashimoto).
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-orange-600">TSH ↑ T4L N:</span> Hipotiroidismo Subclínico.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-purple-600">TSH ↓ T4L ↓:</span> Problema Central (Hipófisis/Hipotálamo). Raro.
            </li>
          </ul>
        </div>
      ),
      pearl: 'Ante depresión refractaria, constipación pertinaz o dislipemia difícil de tratar: pedí siempre una TSH.',
      error: 'Tratar la obesidad de la paciente sin evaluar función tiroidea previamente.'
    }
  },
  {
    id: 'case-5',
    title: 'Caso 5: "Panza con líquido"',
    patientInfo: {
      demographics: 'Varón, 58 años.',
      history: 'Etilista de jerarquía.',
      symptoms: 'Distensión abdominal progresiva, ictericia leve, edemas MMII. Abdomen con matidez desplazable.',
    },
    questions: [
      {
        id: 'q1',
        text: 'Al examen físico de abdomen, ¿qué signo diferencia la ascitis de la simple obesidad?',
        options: [
          { id: 'a', text: 'Ombligo hacia adentro', isCorrect: false },
          { id: 'b', text: 'Matidez desplazable y Onda ascítica', isCorrect: true },
          { id: 'c', text: 'Dolor a la palpación profunda', isCorrect: false }
        ],
        explanation: 'En la ascitis, el líquido cae por gravedad. Si ponés al paciente de costado, la matidez se "mueve" hacia abajo. El aire (timpanismo) flota.'
      },
      {
        id: 'q2',
        text: 'Realizas paracentesis. GASA (Gradiente Albúmina Suero-Ascitis) = 1.4 (>1.1). ¿Causa?',
        options: [
          { id: 'a', text: 'Carcinomatosis Peritoneal', isCorrect: false },
          { id: 'b', text: 'Hipertensión Portal (Cirrosis / Falla Cardíaca)', isCorrect: true },
          { id: 'c', text: 'Tuberculosis Peritoneal', isCorrect: false }
        ],
        explanation: 'GASA > 1.1 significa que hay presión empujando el líquido fuera de los vasos (Transudado por presión). Típico de Cirrosis o Insuf. Cardíaca.'
      },
      {
        id: 'q3',
        text: '¿Cómo diferencias clínicamente si es Cirrosis o Insuficiencia Cardíaca (ambas GASA alto)?',
        options: [
          { id: 'a', text: 'Por la Ingurgitación Yugular', isCorrect: true },
          { id: 'b', text: 'Por el tamaño de la panza', isCorrect: false },
          { id: 'c', text: 'No se puede diferenciar', isCorrect: false }
        ],
        explanation: 'La Falla Cardíaca tiene cuello "lleno" (Ingurgitación Yugular, Reflujo Hepatoyugular). La Cirrosis tiene cuello "vacío" pero estigmas (arañas, palma hepática).'
      }
    ],
    deepDive: {
      title: 'Interpretación del GASA',
      content: (
        <div className="text-sm">
          <p className="font-bold mb-1">GASA ≥ 1.1 g/dL (Hipertensión Portal)</p>
          <ul className="list-disc pl-4 mb-2 text-xs">
            <li>Cirrosis (Proteínas en ascitis bajas).</li>
            <li>Insuficiencia Cardíaca (Proteínas en ascitis altas).</li>
            <li>Síndrome de Budd-Chiari.</li>
          </ul>
          <p className="font-bold mb-1">GASA &lt; 1.1 g/dL (Inflamación/Tumor)</p>
          <ul className="list-disc pl-4 text-xs">
            <li>Carcinomatosis (Cáncer).</li>
            <li>Tuberculosis.</li>
            <li>Pancreatitis / Síndrome Nefrótico.</li>
          </ul>
        </div>
      ),
      pearl: 'Ascitis nueva en un adulto requiere paracentesis diagnóstica siempre (GASA, Citológico, Cultivo).',
      error: 'Asumir que toda ascitis es cirrosis. Un paciente cirótico puede tener peritonitis bacteriana espontánea (urgencia).'
    }
  }
];