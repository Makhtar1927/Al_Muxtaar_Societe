'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactFormClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l’envoi.');
      }

      setStatus('success');
      setName('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Une erreur est survenue.');
    }
  }

  return (
    <div className="rounded-2xl border border-surface-muted bg-white p-6 sm:p-8 shadow-card">
      <h3 className="text-lg font-bold text-navy mb-4">Envoyez-nous un message</h3>

      {status === 'success' ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
          <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
          <h4 className="font-bold text-emerald-950 text-base">Message bien reçu !</h4>
          <p className="text-xs text-emerald-900 leading-relaxed max-w-sm mx-auto">
            Merci pour votre message. Notre équipe d'assistance a bien enregistré votre demande et vous répondra sur votre numéro dans les plus brefs délais.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus('idle')}
            className="mt-2 text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100"
          >
            Envoyer un autre message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
              Votre Prénom et Nom
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Babacar Diop"
              required
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
              Numéro de téléphone (+221)
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 77 123 45 67"
              required
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-navy uppercase tracking-wider">
              Votre Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez votre demande en quelques mots..."
              className="w-full rounded-2xl border border-surface-muted bg-white p-3 text-sm text-navy transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:border-turquoise disabled:opacity-50"
              required
              disabled={status === 'loading'}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full min-h-[46px] font-bold"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                <span>Envoi en cours...</span>
              </span>
            ) : (
              'Envoyer le message'
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

