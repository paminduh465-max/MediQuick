import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  Star, 
  Quote, 
  User, 
  Calendar, 
  Clock, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { HEALTH_ARTICLES, TESTIMONIALS } from '../../data/mockData';
import { HealthArticle } from '../../types';

export const HealthHub: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  // Dosage Calculator State (Pediatric & Adult Paracetamol safe dose)
  const [patientWeightKg, setPatientWeightKg] = useState<number>(20);
  const [calcResult, setCalcResult] = useState<{
    singleDoseMg: number;
    maxDailyMg: number;
    syrupMl120: number;
    syrupMl250: number;
  }>({
    singleDoseMg: 300,
    maxDailyMg: 1200,
    syrupMl120: 12.5,
    syrupMl250: 6.0
  });

  const handleCalculateDose = (weight: number) => {
    setPatientWeightKg(weight);
    // Standard pediatric paracetamol rule: 10-15mg/kg per dose, max 4 times/day (60mg/kg/day)
    const single = Math.round(weight * 15);
    const maxDaily = Math.round(weight * 60);
    // 120mg/5ml suspension = 24mg/ml
    const ml120 = Number((single / 24).toFixed(1));
    // 250mg/5ml suspension = 50mg/ml
    const ml250 = Number((single / 50).toFixed(1));
    setCalcResult({
      singleDoseMg: single,
      maxDailyMg: maxDaily,
      syrupMl120: ml120,
      syrupMl250: ml250
    });
  };

  return (
    <div className="space-y-10 py-4">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> MediQuick Health & Wellness Knowledge Hub
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Medical Insights & Patient Guidance
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Curated by SLMC-licensed pharmacists and medical specialists in Kurunegala to foster community health literacy and medication safety.
        </p>
      </div>

      {/* Interactive Feature: Clinical Pediatric Dosage Calculator */}
      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Interactive Clinical Utility</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Pediatric Paracetamol Safe Dosage Estimator
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In accordance with Sri Lankan Paediatric Association guidelines, paracetamol dosage is strictly calculated by body weight (15mg/kg per single dose every 4–6 hours), not simply by chronological age.
            </p>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-emerald-200 mb-2">
                Child's Body Weight (kg): <strong className="text-white text-base ml-1">{patientWeightKg} kg</strong>
              </label>
              <input
                type="range"
                min="4"
                max="50"
                step="1"
                value={patientWeightKg}
                onChange={(e) => handleCalculateDose(Number(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Infant (4 kg)</span>
                <span>Toddler (12 kg)</span>
                <span>Child (25 kg)</span>
                <span>Adolescent (50 kg)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Safe Guidelines
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 block">Single Dose (15mg/kg)</span>
                <span className="text-lg font-bold text-emerald-300">{calcResult.singleDoseMg} mg</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 block">24-Hr Maximum Limit</span>
                <span className="text-lg font-bold text-amber-300">{calcResult.maxDailyMg} mg</span>
              </div>
            </div>

            <div className="text-xs bg-slate-900/60 p-3 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">If using 120mg/5ml Syrup:</span>
                <span className="font-bold text-white">{calcResult.syrupMl120} ml</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">If using 250mg/5ml Forte Syrup:</span>
                <span className="font-bold text-white">{calcResult.syrupMl250} ml</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic">
              * Always confirm with your physician or MediQuick pharmacist prior to administering medication to infants under 3 months.
            </p>
          </div>
        </div>
      </div>

      {/* Health Articles Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Featured Health & Medical Articles</h3>
            <p className="text-xs text-slate-500">Expert pharmacological advice tailored to Sri Lankan conditions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_ARTICLES.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {article.summary}
                </p>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-700 truncate">
                    {article.author}
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-0.5 text-xs">
                    Read <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 my-6">
            <div className="relative aspect-16/7 overflow-hidden">
              <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
              <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded-md">
                {selectedArticle.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="font-semibold text-slate-800">{selectedArticle.author}</span>
                <span>({selectedArticle.authorTitle})</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="pt-3 flex flex-wrap gap-1.5">
                {selectedArticle.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Testimonials */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Patient Testimonials</span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Trusted by Kurunegala Families & Doctors</h3>
          <p className="text-xs text-slate-500 mt-1">
            Real feedback from verified patients across North Western Province.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map(test => (
            <div key={test.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{test.name}</h5>
                  <span className="text-[10px] text-slate-400">{test.location}</span>
                </div>
                {test.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-2.5 h-2.5" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
