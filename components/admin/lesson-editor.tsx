'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { uploadContentImageAction } from '@/lib/content/actions';
import { Image as ImageIcon, Eye, Edit3, Save, Trash2 } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  chapter_id: string;
  status: string;
  sort_order: number;
  is_free_preview: boolean;
  content_md: string;
}

interface Props {
  lesson: Lesson;
  onSave: (fd: FormData) => Promise<void>;
  onDelete?: () => void;
  onCancel: () => void;
}

// ─── Minimal KaTeX preview ────────────────────────────────────────────────────
// We render a simple preview using a textarea + dangerouslySetInnerHTML for now.
// Full KaTeX rendering will be implemented in P8 (course reader).
function MarkdownPreview({ md }: { md: string }) {
  return (
    <div className="prose prose-sm max-w-none text-text bg-white rounded-xl border border-navy/10 p-4 min-h-[200px] overflow-auto font-mono text-xs whitespace-pre-wrap leading-relaxed">
      {md || <span className="text-text/30 not-italic">Aperçu du contenu…</span>}
    </div>
  );
}

export default function LessonEditor({ lesson, onSave, onDelete, onCancel }: Props) {
  const { showToast } = useToast();
  const [title, setTitle] = useState(lesson.title);
  const [contentMd, setContentMd] = useState(lesson.content_md);
  const [status, setStatus] = useState<'draft' | 'published'>(lesson.status as 'draft' | 'published');
  const [isFreePreview, setIsFreePreview] = useState(lesson.is_free_preview);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSave() {
    if (!title.trim()) { showToast('Le titre est obligatoire', 'error'); return; }
    if (!contentMd.trim()) { showToast('Le contenu est obligatoire', 'error'); return; }

    setSaving(true);
    const fd = new FormData();
    if (lesson.id) fd.append('id', lesson.id);
    fd.append('chapter_id', lesson.chapter_id);
    fd.append('title', title);
    fd.append('content_md', contentMd);
    fd.append('status', status);
    fd.append('is_free_preview', String(isFreePreview));
    fd.append('sort_order', String(lesson.sort_order));
    await onSave(fd);
    setSaving(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadContentImageAction(fd);
    setUploading(false);
    if (res.success) {
      const mdImage = `![image](${res.data.url})`;
      setContentMd((prev) => prev + '\n' + mdImage);
      showToast('Image insérée', 'success');
    } else {
      showToast(res.error, 'error');
    }
    if (fileRef.current) fileRef.current.value = '';
  }

  // ─── Markdown toolbar helpers ─────────────────────────────────────────────
  function insertMd(before: string, after = '') {
    const ta = document.getElementById('lesson-content') as HTMLTextAreaElement | null;
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = contentMd.slice(start, end);
    const next  = contentMd.slice(0, start) + before + sel + after + contentMd.slice(end);
    setContentMd(next);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + sel.length);
    }, 0);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={onCancel} className="text-sm text-turquoise hover:underline">
          ← Retour aux chapitres
        </button>
        <span className="text-text/30">/</span>
        <h2 className="text-lg font-bold text-navy">
          {lesson.id ? 'Modifier la leçon' : 'Nouvelle leçon'}
        </h2>
      </div>

      {/* Meta fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Titre de la leçon"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex : Définition et propriétés des suites"
          required
        />
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Statut</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFreePreview}
              onChange={(e) => setIsFreePreview(e.target.checked)}
              className="w-4 h-4 rounded accent-turquoise"
            />
            <span className="text-sm text-text">Aperçu gratuit (visible sans abonnement)</span>
          </label>
        </div>
      </div>

      {/* Editor toolbar */}
      <div>
        <div className="flex items-center gap-1 mb-1.5 flex-wrap">
          <span className="text-sm font-medium text-text mr-2">Contenu (Markdown + LaTeX)</span>
          <button
            type="button"
            onClick={() => insertMd('**', '**')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10 font-bold"
            title="Gras"
          >B</button>
          <button
            type="button"
            onClick={() => insertMd('*', '*')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10 italic"
            title="Italique"
          >I</button>
          <button
            type="button"
            onClick={() => insertMd('## ')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10"
            title="Titre"
          >H2</button>
          <button
            type="button"
            onClick={() => insertMd('### ')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10"
            title="Sous-titre"
          >H3</button>
          <button
            type="button"
            onClick={() => insertMd('$', '$')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10 font-mono"
            title="LaTeX inline"
          >$…$</button>
          <button
            type="button"
            onClick={() => insertMd('\n$$\n', '\n$$\n')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10 font-mono"
            title="LaTeX bloc"
          >$$…$$</button>
          <button
            type="button"
            onClick={() => insertMd('- ')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10"
            title="Liste"
          >• Liste</button>
          <button
            type="button"
            onClick={() => insertMd('> ')}
            className="px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10"
            title="Citation / Note"
          >❝ Note</button>
          {/* Image upload */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="px-2 py-1 text-xs rounded bg-turquoise/10 text-turquoise hover:bg-turquoise/20 flex items-center gap-1"
            title="Insérer une image"
          >
            <ImageIcon className="w-3.5 h-3.5" strokeWidth={2} />
            <span>{uploading ? 'Upload…' : 'Image'}</span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

          {/* Preview toggle */}
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="ml-auto px-2 py-1 text-xs rounded bg-navy/5 hover:bg-navy/10 flex items-center gap-1"
          >
            {preview ? (
              <>
                <Edit3 className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Éditer</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Aperçu</span>
              </>
            )}
          </button>
        </div>

        {preview ? (
          <MarkdownPreview md={contentMd} />
        ) : (
          <textarea
            id="lesson-content"
            value={contentMd}
            onChange={(e) => setContentMd(e.target.value)}
            rows={24}
            placeholder={`Écris le contenu de la leçon ici.\n\nSupporte Markdown et LaTeX :\n- Gras : **texte**\n- Titre : ## Titre\n- LaTeX inline : $f(x) = x^2$\n- LaTeX bloc :\n$$\n\\sum_{n=1}^{+\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\n$$`}
            className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-sm text-text placeholder:text-text/30 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-turquoise/40 resize-y"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button variant="primary" onClick={handleSave} disabled={saving} className="flex-1 sm:flex-none sm:min-w-[160px] flex items-center justify-center gap-2">
          <Save className="w-4 h-4" strokeWidth={2} />
          <span>{saving ? 'Enregistrement…' : 'Enregistrer'}</span>
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        {onDelete && (
          <Button variant="coral" onClick={onDelete} className="ml-auto flex items-center gap-1.5">
            <Trash2 className="w-4 h-4" strokeWidth={2} />
            <span>Supprimer</span>
          </Button>
        )}
      </div>
    </div>
  );
}

