'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Trash2,
  MessageSquare,
  Search,
  ExternalLink,
  Archive,
  MessageCircle,
} from 'lucide-react';
import type { ContactMessage } from '@/lib/contact/service';

interface ContactMessagesManagerProps {
  initialMessages: ContactMessage[];
}

export default function ContactMessagesManager({
  initialMessages,
}: ContactMessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = messages.filter((m) => {
    if (filter === 'unread' && m.status !== 'unread') return false;
    if (filter === 'read' && m.status !== 'read' && m.status !== 'replied') return false;
    if (filter === 'archived' && m.status !== 'archived') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  async function handleStatusChange(id: string, newStatus: ContactMessage['status']) {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer définitivement ce message ?')) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  function formatWhatsAppLink(phone: string, name: string) {
    const cleanPhone = phone.replace(/\D/g, '');
    const num = cleanPhone.startsWith('221') ? cleanPhone : `221${cleanPhone}`;
    const text = encodeURIComponent(
      `Bonjour ${name}, nous avons bien reçu votre message sur Al Muxtaar Société concernant votre demande.`
    );
    return `https://wa.me/${num}?text=${text}`;
  }

  return (
    <div className="space-y-6">
      {/* Statistiques rapides responsives */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-surface-muted shadow-card flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-navy-light uppercase tracking-wider">
              Total Messages
            </p>
            <p className="text-xl sm:text-2xl font-black text-navy mt-0.5">{messages.length}</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy shrink-0">
            <Mail size={20} />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-card flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              Non Lus (En attente)
            </p>
            <p className="text-xl sm:text-2xl font-black text-amber-900 mt-0.5">{unreadCount}</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-card flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Traités &amp; Répondus
            </p>
            <p className="text-xl sm:text-2xl font-black text-emerald-900 mt-0.5">
              {messages.filter((m) => m.status === 'read' || m.status === 'replied').length}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres responsive */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-surface-muted shadow-card flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Onglets Filtres avec scroll horizontal sur mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none min-w-0">
          <Button
            size="sm"
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
            className="text-xs shrink-0 h-8 px-3"
          >
            Tous ({messages.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'unread' ? 'primary' : 'outline'}
            onClick={() => setFilter('unread')}
            className="text-xs shrink-0 h-8 px-3"
          >
            Non lus ({unreadCount})
          </Button>
          <Button
            size="sm"
            variant={filter === 'read' ? 'primary' : 'outline'}
            onClick={() => setFilter('read')}
            className="text-xs shrink-0 h-8 px-3"
          >
            Lus &amp; Répondus
          </Button>
          <Button
            size="sm"
            variant={filter === 'archived' ? 'primary' : 'outline'}
            onClick={() => setFilter('archived')}
            className="text-xs shrink-0 h-8 px-3"
          >
            Archivés
          </Button>
        </div>

        {/* Input de recherche pleine largeur sur mobile */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, téléphone..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-surface-muted bg-surface/50 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-turquoise"
          />
        </div>
      </div>

      {/* Liste des messages */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white p-10 sm:p-14 rounded-2xl border border-surface-muted text-center space-y-3">
            <MessageSquare size={36} className="mx-auto text-navy-light/40" />
            <h4 className="font-bold text-navy text-sm">Aucun message trouvé</h4>
            <p className="text-xs text-navy-light max-w-sm mx-auto">
              Les messages soumis depuis la page de contact apparaîtront ici automatiquement.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const isUnread = item.status === 'unread';
            const dateStr = new Date(item.created_at).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <Card
                key={item.id}
                className={`overflow-hidden transition-all duration-200 border ${
                  isUnread
                    ? 'border-l-4 border-l-amber-500 border-amber-200/80 bg-gradient-to-r from-amber-50/20 to-white shadow-xs'
                    : 'border-surface-muted bg-white shadow-xs'
                }`}
              >
                <div className="p-4 sm:p-5 space-y-3.5">
                  {/* Ligne En-tête : Avatar, Infos et Boutons d'Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Identité émetteur */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center font-bold text-navy text-sm shrink-0 border border-navy/10">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-navy text-sm truncate">{item.name}</h4>
                          {isUnread && (
                            <Badge variant="warning" className="text-[10px] py-0 px-2 font-bold">
                              Nouveau
                            </Badge>
                          )}
                          {item.message.includes('[REMARQUE ÉLÈVE SUR COURS]') && (
                            <Badge variant="outline" className="text-[10px] py-0 px-2 font-bold bg-teal-50 text-teal-700 border-teal-200">
                              📚 Avis Cours
                            </Badge>
                          )}
                          {item.status === 'replied' && (
                            <Badge variant="success" className="text-[10px] py-0 px-2 font-bold">
                              Répondu
                            </Badge>
                          )}
                          {item.status === 'archived' && (
                            <Badge variant="outline" className="text-[10px] py-0 px-2 text-navy-light">
                              Archivé
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-navy-light mt-0.5 flex-wrap">
                          {item.phone ? (
                            <span className="flex items-center gap-1 font-mono font-medium text-navy bg-navy/5 px-1.5 py-0.5 rounded">
                              <Phone size={11} className="text-navy-light" />
                              {item.phone}
                            </span>
                          ) : (
                            <span className="italic text-navy-light/75">Sans téléphone</span>
                          )}
                          <span>•</span>
                          <span className="text-[11px] text-navy-light/90">{dateStr}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions : WhatsApp & Statuts */}
                    <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
                      {item.phone && item.phone.replace(/\D/g, '').length >= 7 && (
                        <a
                          href={formatWhatsAppLink(item.phone, item.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (item.status === 'unread') {
                              handleStatusChange(item.id, 'replied');
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-bold transition-all shadow-xs"
                        >
                          <MessageCircle size={14} />
                          <span>Répondre sur WhatsApp</span>
                        </a>
                      )}

                      {isUnread ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(item.id, 'read')}
                          disabled={updatingId === item.id}
                          className="text-xs h-8 px-2.5"
                        >
                          Marquer lu
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusChange(item.id, 'unread')}
                          disabled={updatingId === item.id}
                          className="text-xs h-8 px-2 text-navy-light hover:text-navy"
                        >
                          Marquer non lu
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleStatusChange(
                            item.id,
                            item.status === 'archived' ? 'read' : 'archived'
                          )
                        }
                        disabled={updatingId === item.id}
                        className="text-xs h-8 px-2 text-navy-light hover:text-navy"
                        title={item.status === 'archived' ? 'Désarchiver' : 'Archiver'}
                      >
                        <Archive size={14} />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                        disabled={updatingId === item.id}
                        className="text-xs h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Corps du message */}
                  <div className="bg-surface/70 rounded-xl p-3.5 sm:p-4 border border-surface-muted text-xs sm:text-sm text-navy leading-relaxed font-sans whitespace-pre-wrap">
                    {item.message}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
