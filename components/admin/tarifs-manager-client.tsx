'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { updatePlanAction } from '@/lib/admin/actions';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration_months: number;
  description: string | null;
  is_active: boolean;
}

interface Props {
  initialPlans: Plan[];
}

function formatFCFA(amount: number) {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

export default function TarifsManagerClient({ initialPlans }: Props) {
  const { showToast } = useToast();
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isPending, startTransition] = useTransition();

  function openEdit(p: Plan) {
    setEditingPlan(p);
    setPrice(p.price);
    setName(p.name);
    setDescription(p.description ?? '');
    setIsActive(p.is_active);
  }

  function handleSave() {
    if (!editingPlan) return;
    const fd = new FormData();
    fd.append('id', editingPlan.id);
    fd.append('price', String(price));
    fd.append('name', name);
    fd.append('description', description);
    fd.append('is_active', String(isActive));

    startTransition(async () => {
      const res = await updatePlanAction(fd);
      if (res.success) {
        setPlans((prev) =>
          prev.map((p) =>
            p.id === editingPlan.id
              ? { ...p, price, name, description, is_active: isActive }
              : p
          )
        );
        setEditingPlan(null);
        showToast(res.message ?? 'Tarif mis à jour', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((p) => (
          <Card key={p.id} className="relative overflow-hidden border-2 hover:border-turquoise/40 transition-all">
            {!p.is_active && (
              <div className="absolute top-3 right-3 bg-coral/15 text-coral text-[11px] font-bold px-2 py-0.5 rounded-full">
                Désactivé
              </div>
            )}
            <CardHeader>
              <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
                {p.duration_months} mois d&apos;accès
              </span>
              <CardTitle className="text-2xl font-black text-navy mt-1">
                {formatFCFA(p.price)}
              </CardTitle>
              <CardDescription className="font-semibold text-text/80">
                {p.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-text/70 min-h-[32px]">
                {p.description || 'Aucune description spécifique.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => openEdit(p)}
              >
                ✏️ Modifier la formule
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingPlan && (
        <Modal
          isOpen
          onClose={() => setEditingPlan(null)}
          title={`Modifier la formule — ${editingPlan.name}`}
        >
          <div className="space-y-4">
            <Input
              label="Nom de la formule"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Prix (en FCFA)
              </label>
              <input
                type="number"
                step="50"
                min="100"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-sm text-text font-bold text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Description affichée aux élèves
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Ex : Idéal pour réviser un trimestre complet…"
                className="w-full rounded-xl border border-navy/20 bg-white p-2.5 text-xs text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40 resize-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded accent-turquoise"
              />
              <span className="text-sm font-medium text-text">
                Formule active (visible lors du paiement)
              </span>
            </label>

            <div className="flex gap-2 pt-2">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={isPending}
                className="flex-1"
              >
                {isPending ? 'Enregistrement…' : 'Enregistrer les modifications'}
              </Button>
              <Button variant="outline" onClick={() => setEditingPlan(null)}>
                Annuler
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

