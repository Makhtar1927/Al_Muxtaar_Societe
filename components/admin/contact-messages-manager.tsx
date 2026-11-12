'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
      `Bonjour ${name}, nous avons bien reçu votre message sur Al Muxtaar Société concernant :`
    );
    return `https://wa.me/${num}?text=${text}`;
  }

  return (
    <div className="space-y-6">
      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-surface-muted shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-navy-light uppercase tracking-wider">
              Total Messages
            </p>
            <p className="text-2xl font-black text-navy mt-1">{messages.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy">
            <Mail size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200/60 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Non Lus (En attente)
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{unreadCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200/60 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Traités
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">
              {messages.filter((m) => m.status === 'read' || m.status === 'replied').length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-2xl border border-surface-muted shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
            className="text-xs"
          >
            Tous ({messages.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'unread' ? 'primary' : 'outline'}
            onClick={() => setFilter('unread')}
            className="text-xs"
          >
            Non lus ({unreadCount})
          </Button>
          <Button
            size="sm"
            variant={filter === 'read' ? 'primary' : 'outline'}
            onClick={() => setFilter('read')}
            className="text-xs"
          >
            Lus & Répondus
          </Button>
          <Button
            size="sm"
            variant={filter === 'archived' ? 'primary' : 'outline'}
            onClick={() => setFilter('archived')}
            className="text-xs"
          >
            Archivés
          </Button>
        </div>

        <div className="relative min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, téléphone..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-surface-muted bg-surface/50 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-turquoise"
          />
        </div>
      </div>

      {/* Liste des messages */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-surface-muted text-center space-y-3">
            <MessageSquare size={40} className="mx-auto text-navy-light/40" />
            <h4 className="font-bold text-navy text-sm">Aucun message trouvé</h4>
            <p className="text-xs text-navy-light">
              Les messages envoyés par les visiteurs via le formulaire de contact apparaîtront ici.
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
                className={`overflow-hidden transition-all duration-200 ${
                  isUnread
                    ? 'border-l-4 border-l-amber-500 border-amber-200/80 bg-amber-50/20'
                    : 'border-surface-muted bg-white'
                }`}
              >
                <div className="p-5 space-y-4">
                  {/* Ligne 1 : Nom, Téléphone, Date, Statut */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center font-bold text-navy text-sm">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-navy text-sm">{item.name}</h4>
                          {isUnread && (
                            <Badge variant="warning" className="text-[10px] py-0 px-2">
                              Nouveau
                            </Badge>
                          )}
                          {item.status === 'replied' && (
                            <Badge variant="success" className="text-[10px] py-0 px-2">
                              Répondu
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-navy-light mt-0.5">
                          <span className="flex items-center gap-1 font-mono font-medium text-navy">
                            <Phone size={12} className="text-navy-light" />
                            {item.phone}
                          </span>
                          <span>•</span>
                          <span>{dateStr}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions d'état rapides */}
                    <div className="flex items-center gap-2">
                      <a
                        href={formatWhatsAppLink(item.phone, item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (item.status === 'unread') {
                            handleStatusChange(item.id, 'replied');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-bold transition-colors shadow-xs"
                      >
                        <ExternalLink size={13} />
                        <span>Répondre sur WhatsApp</span>
                      </a>

                      {isUnread ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(item.id, 'read')}
                          disabled={updatingId === item.id}
                          className="text-xs h-8"
                        >
                          Marquer comme lu
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusChange(item.id, 'unread')}
                          disabled={updatingId === item.id}
                          className="text-xs h-8 text-navy-light hover:text-navy"
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
                        className="text-xs h-8 text-navy-light hover:text-navy"
                        title={item.status === 'archived' ? 'Désarchiver' : 'Archiver'}
                      >
                        <Archive size={14} />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                        disabled={updatingId === item.id}
                        className="text-xs h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Ligne 2 : Corps du message */}
                  <div className="bg-surface/60 rounded-xl p-3.5 border border-surface-muted text-xs sm:text-sm text-navy leading-relaxed">
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

