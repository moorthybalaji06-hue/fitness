import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50/80 border border-blue-200/60 text-xs text-blue-900 leading-relaxed">
        <Info className="w-4 h-4 text-blue-600 shrink-0" />
        <p>
          <strong className="font-semibold text-blue-950">Wellness Notice:</strong> FitBuddy offers general student wellness suggestions. It does not provide medical diagnoses or prescriptions. For injuries or medical questions, consult campus health professionals.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-200/70 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Student Wellness & Safety Disclaimer</span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
              Non-Clinical
            </span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            FitBuddy is an educational AI wellness companion engineered to encourage healthy study-life balance, regular movement, hydration, and wholesome nutrition. It does not replace medical advice, physical therapy, or mental health counseling. Always listen to your body, avoid sudden overexertion, and speak with a qualified physician or your university health clinic if experiencing pain, chronic fatigue, or health issues.
          </p>
        </div>
      </div>
    </div>
  );
};
