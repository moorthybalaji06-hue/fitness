import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

export const BreathingWidget: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timer, setTimer] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // transition to next step
            if (step === 'Inhale') {
              setStep('Hold');
              return 4;
            } else if (step === 'Hold') {
              setStep('Exhale');
              return 4;
            } else {
              setStep('Inhale');
              setCyclesCompleted((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, step]);

  const reset = () => {
    setIsActive(false);
    setStep('Inhale');
    setTimer(4);
    setCyclesCompleted(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Wind className="w-6 h-6 stroke-[2]" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">4-4-4 Relax & Reset Breathing</h4>
          <p className="text-xs text-slate-500">
            A 60-second breathing rhythm to lower study cortisol and center focus.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Animated breathing circle indicator */}
        <div className="relative w-16 h-16 rounded-full border-4 border-indigo-100 flex flex-col items-center justify-center bg-indigo-50/50">
          <span className={`text-[11px] font-bold ${
            step === 'Inhale' ? 'text-blue-600 scale-105' : step === 'Hold' ? 'text-amber-600' : 'text-emerald-600'
          } transition-all duration-300`}>
            {step}
          </span>
          <span className="text-sm font-extrabold text-slate-800">{timer}s</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`p-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors ${
              isActive
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : 'Start Breath'}</span>
          </button>
          {isActive || cyclesCompleted > 0 ? (
            <button
              onClick={reset}
              className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
