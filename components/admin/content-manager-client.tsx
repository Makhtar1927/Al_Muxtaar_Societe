'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import LessonEditor from '@/components/admin/lesson-editor';
import ExerciseEditor from '@/components/admin/exercise-editor';
import {
  upsertChapterAction,
  deleteChapterAction,
  upsertLessonAction,
  deleteLessonAction,
  reorderChaptersAction,
} from '@/lib/content/actions';

interface Subject { id: string; name: string; level_id: string; track_id: string }
interface Chapter { id: string; title: string; subject_id: string; status: string; sort_order: number }
interface Lesson  { id: string; title: string; chapter_id: string; status: string; sort_order: number; is_free_preview: boolean; content_md: string }
interface Exercise{ id: string; lesson_id: string; statement_md: string; solution_md: string; difficulty: number; sort_order: number }

interface Props {
  subjects:   Subject[];
  chapters:   Chapter[];
  lessons:    Lesson[];
  exercises:  Exercise[];
  userRole:   string;
}

type PanelView = 'chapters' | 'lesson-edit' | 'exercise-edit';

const DIFF_LABELS: Record<number, string> = { 1: '⭐ Facile', 2: '⭐⭐ Moyen', 3: '⭐⭐⭐ Difficile' };

export default function ContentManagerClient({ subjects, chapters: initChapters, lessons: initLessons, exercises, userRole }: Props) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  // State
  const [chapters, setChapters] = useState(initChapters);
  const [lessons] = useState(initLessons);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]?.id ?? '');
  const [panelView, setPanelView] = useState<PanelView>('chapters');
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingExerciseLesson, setEditingExerciseLesson] = useState<Lesson | null>(null);

  // Chapter modal state
  const [chapterModal, setChapterModal] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterStatus, setChapterStatus] = useState<'draft' | 'published'>('draft');

  const subjectChapters = chapters
    .filter((c) => c.subject_id === selectedSubject)
    .sort((a, b) => a.sort_order - b.sort_order);

  // ── Chapter CRUD ────────────────────────────────────────────

  function openNewChapter() {
    setEditingChapter(null);
    setChapterTitle('');
    setChapterStatus('draft');
    setChapterModal(true);
  }

  function openEditChapter(ch: Chapter) {
    setEditingChapter(ch);
    setChapterTitle(ch.title);
    setChapterStatus(ch.status as 'draft' | 'published');
    setChapterModal(true);
  }

  function saveChapter() {
    const fd = new FormData();
    if (editingChapter) fd.append('id', editingChapter.id);
    fd.append('title', chapterTitle);
    fd.append('subject_id', selectedSubject);
    fd.append('sort_order', String(editingChapter?.sort_order ?? subjectChapters.length));
    fd.append('status', chapterStatus);

    startTransition(async () => {
      const res = await upsertChapterAction(fd);
      if (res.success) {
        showToast(editingChapter ? 'Chapitre mis à jour' : 'Chapitre créé', 'success');
        setChapterModal(false);
      } else {
        showToast(res.error ?? 'Erreur lors de l\'enregistrement', 'error');
      }
    });
  }

  function deleteChapter(id: string) {
    if (!confirm('Supprimer ce chapitre et tout son contenu ?')) return;
    startTransition(async () => {
      const res = await deleteChapterAction(id);
      if (res.success) {
        setChapters((prev) => prev.filter((c) => c.id !== id));
        showToast('Chapitre supprimé', 'success');
      } else {
        showToast(res.error ?? 'Erreur lors de la suppression', 'error');
      }
    });
  }

  // ── Drag-to-reorder chapters ────────────────────────────────
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  function onDragStart(idx: number) { setDragIdx(idx); }
  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const reordered = [...subjectChapters];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(idx, 0, moved);
    const updated = reordered.map((c, i) => ({ ...c, sort_order: i }));
    setChapters((prev) => [
      ...prev.filter((c) => c.subject_id !== selectedSubject),
      ...updated,
    ]);
    setDragIdx(idx);
  }
  function onDragEnd() {
    setDragIdx(null);
    startTransition(async () => {
      await reorderChaptersAction(
        subjectChapters.map((c, i) => ({ id: c.id, sort_order: i })),
      );
    });
  }

  // ── Lesson panel ─────────────────────────────────────────────
  function openLessonEditor(lesson: Lesson | null, chapter: Chapter) {
    setEditingLesson(lesson ?? {
      id: '', title: '', chapter_id: chapter.id,
      status: 'draft', sort_order: 0, is_free_preview: false, content_md: '',
    });
    setPanelView('lesson-edit');
  }

  async function saveLesson(fd: FormData) {
    const res = await upsertLessonAction(fd);
    if (res.success) {
      showToast('Leçon enregistrée', 'success');
      setPanelView('chapters');
    } else {
      showToast(res.error ?? 'Erreur lors de l\'enregistrement', 'error');
    }
  }

  async function deleteLesson(id: string) {
    if (!confirm('Supprimer cette leçon ?')) return;
    const res = await deleteLessonAction(id);
    if (res.success) {
      showToast('Leçon supprimée', 'success');
      setPanelView('chapters');
    } else {
      showToast(res.error ?? 'Erreur lors de la suppression', 'error');
    }
  }

  // ── Exercises panel ──────────────────────────────────────────
  function openExerciseEditor(lesson: Lesson) {
    setEditingExerciseLesson(lesson);
    setPanelView('exercise-edit');
  }

  // ── Render ───────────────────────────────────────────────────

  if (panelView === 'lesson-edit' && editingLesson) {
    return (
      <LessonEditor
        lesson={editingLesson}
        onSave={saveLesson}
        onDelete={editingLesson.id ? () => deleteLesson(editingLesson.id) : undefined}
        onCancel={() => setPanelView('chapters')}
      />
    );
  }

  if (panelView === 'exercise-edit' && editingExerciseLesson) {
    return (
      <ExerciseEditor
        lesson={editingExerciseLesson}
        exercises={exercises.filter((ex) => ex.lesson_id === editingExerciseLesson.id)}
        onBack={() => setPanelView('chapters')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Subject sidebar */}
      <aside className="lg:col-span-1">
        <h2 className="text-sm font-semibold text-text/50 uppercase tracking-wide mb-3">Matières</h2>
        <div className="space-y-1">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`w-full text-left rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                selectedSubject === s.id
                  ? 'bg-navy text-white'
                  : 'text-text/70 hover:bg-navy/5'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Chapter + lesson list */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy">
            Chapitres
            <span className="ml-2 text-sm font-normal text-text/50">
              ({subjectChapters.length})
            </span>
          </h2>
          {['admin', 'editor'].includes(userRole) && (
            <Button variant="primary" onClick={openNewChapter}>
              + Nouveau chapitre
            </Button>
          )}
        </div>

        {subjectChapters.length === 0 && (
          <p className="text-center text-text/50 py-12 bg-white rounded-2xl border border-navy/10">
            Aucun chapitre pour cette matière. Crée le premier !
          </p>
        )}

        {subjectChapters.map((ch, idx) => {
          const chLessons = lessons
            .filter((l) => l.chapter_id === ch.id)
            .sort((a, b) => a.sort_order - b.sort_order);

          return (
            <div
              key={ch.id}
              draggable
              onDragStart={() => onDragStart(idx)}
              onDragOver={(e) => onDragOver(e, idx)}
              onDragEnd={onDragEnd}
              className="bg-white rounded-2xl border border-navy/10 overflow-hidden"
            >
              {/* Chapter header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-navy/5">
                <span className="text-text/30 cursor-grab select-none text-lg">⠿</span>
                <div className="flex-1">
                  <p className="font-semibold text-navy text-sm">{ch.title}</p>
                </div>
                <Badge status={ch.status === 'published' ? 'active' : 'pending'} />
                <button
                  onClick={() => openEditChapter(ch)}
                  className="text-xs text-turquoise hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteChapter(ch.id)}
                  className="text-xs text-coral hover:underline"
                  disabled={isPending}
                >
                  Supprimer
                </button>
              </div>

              {/* Lessons */}
              <div className="divide-y divide-navy/5">
                {chLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface/50"
                  >
                    <span className="text-turquoise text-sm">📄</span>
                    <span className="flex-1 text-sm text-text">{lesson.title}</span>
                    {lesson.is_free_preview && (
                      <span className="text-xs bg-gold/10 text-gold font-semibold rounded-full px-2 py-0.5">
                        Aperçu gratuit
                      </span>
                    )}
                    <Badge status={lesson.status === 'published' ? 'active' : 'pending'} />
                    <button
                      onClick={() => openLessonEditor(lesson, ch)}
                      className="text-xs text-turquoise hover:underline"
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => openExerciseEditor(lesson)}
                      className="text-xs text-navy/50 hover:text-navy hover:underline"
                    >
                      Exercices ({exercises.filter((e) => e.lesson_id === lesson.id).length})
                    </button>
                  </div>
                ))}

                {/* Add lesson button */}
                <div className="px-4 py-2">
                  <button
                    onClick={() => openLessonEditor(null, ch)}
                    className="text-xs text-turquoise hover:underline"
                  >
                    + Ajouter une leçon
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chapter modal */}
      <Modal
        isOpen={chapterModal}
        onClose={() => setChapterModal(false)}
        title={editingChapter ? 'Modifier le chapitre' : 'Nouveau chapitre'}
      >
        <div className="space-y-4">
          <Input
            label="Titre du chapitre"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            placeholder="Ex : Suites numériques"
            required
          />
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Statut</label>
            <select
              value={chapterStatus}
              onChange={(e) => setChapterStatus(e.target.value as 'draft' | 'published')}
              className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={saveChapter} disabled={isPending} className="flex-1">
              {isPending ? 'Sauvegarde…' : 'Enregistrer'}
            </Button>
            <Button variant="outline" onClick={() => setChapterModal(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

