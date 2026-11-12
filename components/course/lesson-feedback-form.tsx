'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, Loader2, Star, ThumbsUp } from 'lucide-react';

interface LessonFeedbackFormProps {
  lessonTitle: string;
  chapterTitle?: string;
  studentName?: string;
  studentPhone?: string;
}

export default function LessonFeedbackForm({
  lessonTitle,
  chapterTitle,
  studentName,
  studentPhone,
}: LessonFeedbackFormProps) {
  const [name, setName] = useState(studentName || '');
  const [phone, setPhone] = useState(studentPhone || '');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comprehension, setComprehension] = useState<'très clair' | 'moyen' | 'difficile'>('très clair');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const ratingLabels = ['', 'Très difficile', 'Difficile', 'Moyen', 'Bien expliqué', 'Excellente leçon !'];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError('Veuillez écrire votre remarque ou question sur cette leçon.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const ratingText = rating > 0 ? `\n⭐ Appréciation : ${rating}/5 (${ratingLabels[rating]})` : '';
    const compText = `\n🎯 Niveau de clarté ressenti : ${comprehension.toUpperCase()}`;
    const chapterText = chapterTitle ? `\n📚 Chapitre : ${chapterTitle}` : '';
    const fullMessage = `[REMARQUE ÉLÈVE SUR COURS]\n📖 Leçon : ${lessonTitle}${chapterText}${ratingText}${compText}\n\n💬 Point de vue & Remarques :\n${message.trim()}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Élève Bac S2',
          phone: phone.trim() || '',
          message: fullMessage,
        }),
      });

      if (!res.ok) throw new Error('Erreur réseau');
      setSubmitted(true);
    } catch {
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-2xl border-2 border-teal-300 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center text-center gap-3 py-3">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle className="w-8 h-8 text-teal-600" />
          </div>
          <h3 className="text-xl font-bold text-navy">
            Merci pour votre avis !
          </h3>
          <p className="text-text/80 text-sm max-w-md">
            Votre remarque sur <span className="font-semibold text-navy">« {lessonTitle} »</span> a bien été transmise à l&apos;équipe pédagogique d&apos;Al Muxtaar. Vos retours nous permettent d&apos;enrichir en permanence les cours et les annales du Bac.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="mt-2 text-xs font-semibold text-teal-700 hover:text-teal-900 underline"
          >
            Envoyer une autre remarque
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden mt-8">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-navy via-navy/95 to-slate-800 px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/20 border border-teal-400/30 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
              Remarques & Avis sur cette leçon
            </h3>
            <p className="text-slate-300 text-xs mt-0.5">
              Partagez votre point de vue avec l&apos;équipe pédagogique Al Muxtaar
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs bg-white/10 text-teal-200 px-3 py-1 rounded-full border border-white/10">
          <ThumbsUp className="w-3.5 h-3.5" />
          Reçu direct par l&apos;admin
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
        {/* Note & Compréhension */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-navy/10">
          <div>
            <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-2">
              Note globale de la leçon
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200 fill-gray-100'
                    }`}
                  />
                </button>
              ))}
              {(hoveredRating || rating) > 0 && (
                <span className="ml-2 text-xs text-amber-700 font-semibold">
                  {ratingLabels[hoveredRating || rating]}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-2">
              Clarté des explications
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'très clair', label: 'Très clair 👌' },
                  { id: 'moyen', label: 'Moyen 🤔' },
                  { id: 'difficile', label: 'Difficile ⚠️' },
                ] as const
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setComprehension(option.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                    comprehension === option.id
                      ? 'bg-teal-500 text-white border-teal-600 shadow-sm'
                      : 'bg-surface text-text hover:bg-gray-100 border-navy/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Identité élève */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-1.5">
              Votre Prénom & Nom (facultatif)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Modou Fall"
              className="w-full px-3.5 py-2.5 rounded-xl border border-navy/15 bg-surface text-navy text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder:text-gray-400 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-1.5">
              Numéro Téléphone / WhatsApp (facultatif)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 77 123 45 67"
              className="w-full px-3.5 py-2.5 rounded-xl border border-navy/15 bg-surface text-navy text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder:text-gray-400 transition"
            />
          </div>
        </div>

        {/* Message / Remarque */}
        <div>
          <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-1.5">
            Votre remarque, question ou suggestion sur cette leçon <span className="text-red-500">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Ex : J'ai bien aimé la fiche réflexe, mais pourriez-vous ajouter une précision sur l'exercice type 2 ? Ou : Le simulateur m'a beaucoup aidé à comprendre le mécanisme..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-navy/15 bg-surface text-navy text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder:text-gray-400 transition leading-relaxed"
          />
        </div>

        {/* Message d'erreur si vide */}
        {error && (
          <p className="text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 font-medium">
            {error}
          </p>
        )}

        {/* Bouton d'action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-text/60 italic order-2 sm:order-1">
            Ce message arrive directement dans la boîte de réception de l&apos;administrateur.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer ma remarque
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
