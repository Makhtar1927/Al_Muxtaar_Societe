'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

/**
 * Nettoie et normalise les formules mathématiques KaTeX :
 * Répare les séquences d'échappement mangées par JS (ex: \f -> form feed, \t -> tab, \b -> backspace)
 */
function normalizeMathString(str: string): string {
  if (!str) return '';
  return str
    // 1. Caractères de contrôle ASCII mangés par les template literals JS
    .replace(/\x08egin/g, '\\begin')
    .replace(/\x08oxed/g, '\\boxed')
    .replace(/\x08ar/g, '\\bar')
    .replace(/\x08eta/g, '\\beta')
    .replace(/\x08/g, '\\')
    .replace(/\x0crac/g, '\\frac')
    .replace(/d\x0crac/g, '\\dfrac')
    .replace(/\x0c/g, '\\f')
    .replace(/\x0b/g, '\\v')
    .replace(/\t(?=[a-zA-Z])/g, '\\t')
    .replace(/\r(?=[a-zA-Z])/g, '\\r')
    .replace(/\r/g, '')

    // 2. Glyphes de remplacement Unicode (carrés □, \u25A1, \uFFFD)
    .replace(/[□\u0008\u25A1\uFFFD]oxed/g, '\\boxed')
    .replace(/[□\u0008\u25A1\uFFFD]egin/g, '\\begin')
    .replace(/\bBegin\{/g, '\\begin{')

    // 3. Artefacts de remplacements corrompus (\f \frac, \df \frac)
    .replace(/\\f\s*\\frac/g, '\\frac')
    .replace(/\\df\s*\\frac/g, '\\dfrac')
    .replace(/\\df(?=\s*\{)/g, '\\dfrac')

    // 4. Commandes orphelines sans antislash
    .replace(/(?<![a-zA-Z\\])rac(?=\{|\d|\s*0)/g, '\\frac')
    .replace(/(?<![a-zA-Z\\])ight(?=[)\]|.}]|$|\^)/g, '\\right')
    .replace(/(?<![a-zA-Z\\])eft(?=[(\[|.{]|$)/g, '\\left')
    .replace(/(?<![a-zA-Z\\])boxed(?=\{)/g, '\\boxed')
    .replace(/(?<![a-zA-Z\\])mathbb(?=\{)/g, '\\mathbb')
    .replace(/(?<![a-zA-Z\\])mathbbC\b/g, '\\mathbb{C}')
    .replace(/(?<![a-zA-Z\\])mathbbR\b/g, '\\mathbb{R}')
    .replace(/(?<![a-zA-Z\\])mathbbZ\b/g, '\\mathbb{Z}')
    .replace(/(?<![a-zA-Z\\])mathbbN\b/g, '\\mathbb{N}')
    // Si \mathbb{...} se trouve hors des dollars $...$, l'envelopper automatiquement
    .replace(/(?<!\$)\\mathbb\{([CRZN])\}(?!\$)/g, '$\\mathbb{$1}$')
    .replace(/(?<![a-zA-Z\\])qquad(?=[a-zA-Z\\])/g, '\\qquad ')
    .replace(/(?<![a-zA-Z\\])quad(?=[a-zA-Z\\])/g, '\\quad ')
    .replace(/(?<![a-zA-Z\\])cos(?=\^|\s|\(|[0-9xX])/g, '\\cos ')
    .replace(/(?<![a-zA-Z\\])sin(?=\^|\s|\(|[0-9xX])/g, '\\sin ')
    .replace(/0imes\\?infty/g, '0 \\times \\infty')
    .replace(/\+infty\s*-\s*infty/g, '+\\infty - \\infty')

    // 5. Normalisation des macros double-échappées
    .replace(/\\\\([a-zA-Z]+)/g, '\\$1');
}

/**
 * Nettoie une formule KaTeX spécifique avant rendu (protection ultime anti-ParseError)
 */
function cleanMathFormula(math: string): string {
  if (!math) return '';
  return math
    .trim()
    // Répare \f \frac et \df \frac
    .replace(/\\f\s*\\frac/g, '\\frac')
    .replace(/\\df\s*\\frac/g, '\\dfrac')
    .replace(/\\df(?=\s*\{)/g, '\\dfrac')
    // Répare □oxed et Begin
    .replace(/[□\u0008\u25A1\uFFFD]oxed/g, '\\boxed')
    .replace(/(?<!\\)boxed(?=\{)/g, '\\boxed')
    .replace(/[□\u0008\u25A1\uFFFD]egin/g, '\\begin')
    .replace(/\bBegin\{/g, '\\begin{')
    .replace(/(?<!\\)\bbegin\{/g, '\\begin{')
    .replace(/(?<!\\)\bend\{/g, '\\end{')
    // Répare ight / eft
    .replace(/(?<![a-zA-Z\\])ight(?=[)\]|.}]|$|\^)/g, '\\right')
    .replace(/(?<![a-zA-Z\\])eft(?=[(\[|.{]|$)/g, '\\left')
    // Répare mathbbC / mathbb
    .replace(/(?<!\\)mathbbC\b/g, '\\mathbb{C}')
    .replace(/(?<!\\)mathbbR\b/g, '\\mathbb{R}')
    .replace(/(?<!\\)mathbb(?=\{)/g, '\\mathbb')
    // Répare cos / sin / qquad
    .replace(/(?<!\\)\bcos(?=\^|\s|\(|[0-9xX]|$)/g, '\\cos ')
    .replace(/(?<!\\)\bsin(?=\^|\s|\(|[0-9xX]|$)/g, '\\sin ')
    .replace(/(?<!\\)\bqquad(?=[a-zA-Z\\]|$)/g, '\\qquad ')
    // Répare les sauts de ligne simples dans \begin{aligned} ou \begin{cases}
    // ex: "&= ... \ \n &=" -> doit être "&= ... \\ \n &="
    .replace(/(?<!\\)\\\s*(?=\n\s*&|\n\s*\\end)/g, '\\\\')
    // Supprime tout caractère de contrôle ASCII invisible résiduel (\b, \0, etc.)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    // Normalise double antislash sur commandes simples (ex: \\text -> \text)
    .replace(/\\\\([a-zA-Z]+)/g, '\\$1');
}

/**
 * Parses markdown text containing:
 * - Block math $$...$$
 * - Inline math $...$
 * - Headings (#, ##, ###)
 * - Bold (**text**), Italic (*text*)
 * - Lists (- item, 1. item)
 * - Blockquotes (> quote)
 * - Images (![alt](url))
 * - Paragraphs
 */
function renderMarkdownWithKatex(raw: string): string {
  if (!raw) return '';

  const cleaned = normalizeMathString(raw);

  // 1. Protect block math $$...$$
  const blockMath: string[] = [];
  let text = cleaned.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const formula = cleanMathFormula(math);
    try {
      const rendered = katex.renderToString(formula, {
        displayMode: true,
        throwOnError: false,
      });
      blockMath.push(`<div class="my-3 overflow-x-auto py-2 text-center text-sm sm:text-base">${rendered}</div>`);
    } catch {
      blockMath.push(`<pre class="text-coral my-2 text-xs overflow-x-auto">${formula}</pre>`);
    }
    return `___BLOCK_MATH_${blockMath.length - 1}___`;
  });

  // 2. Protect inline math $...$ (avoiding double $)
  const inlineMath: string[] = [];
  text = text.replace(/(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)/g, (_, math) => {
    const formula = cleanMathFormula(math);
    try {
      const rendered = katex.renderToString(formula, {
        displayMode: false,
        throwOnError: false,
      });
      inlineMath.push(rendered);
    } catch {
      inlineMath.push(`<code>${formula}</code>`);
    }
    return `___INLINE_MATH_${inlineMath.length - 1}___`;
  });

  // 3. Process markdown blocks line by line
  const lines = text.split('\n');
  const htmlLines: string[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Headings
    if (line.startsWith('### ')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<h3 class="text-base sm:text-lg font-bold text-navy mt-5 mb-2">${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<h2 class="text-lg sm:text-xl font-bold text-navy mt-7 mb-3 pb-1 border-b border-navy/10">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<h1 class="text-xl sm:text-2xl font-bold text-navy mt-6 mb-3">${line.slice(2)}</h1>`);
      continue;
    }

    // Markdown Tables (| Header 1 | Header 2 |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }

      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      i--; // adjust loop index

      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((c) => c.trim());

        const headers = parseRow(tableLines[0]);
        let bodyStartIndex = 1;
        if (tableLines.length > 1 && tableLines[1].replace(/[\s|:-]/g, '').length === 0) {
          bodyStartIndex = 2;
        }

        let tableHtml = '<div class="my-6 overflow-x-auto rounded-2xl border border-navy/15 bg-white shadow-xs">';
        tableHtml += '<table class="w-full border-collapse text-left text-xs sm:text-sm">';
        tableHtml += '<thead class="bg-navy/5 border-b border-navy/10 text-navy font-bold"><tr>';
        headers.forEach((h) => {
          tableHtml += `<th class="px-3.5 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">${h}</th>`;
        });
        tableHtml += '</tr></thead><tbody class="divide-y divide-navy/10">';

        for (let r = bodyStartIndex; r < tableLines.length; r++) {
          const cells = parseRow(tableLines[r]);
          tableHtml += '<tr class="hover:bg-surface/50 transition-colors">';
          cells.forEach((c) => {
            tableHtml += `<td class="px-3.5 py-2.5 sm:px-4 sm:py-3 leading-relaxed">${c}</td>`;
          });
          tableHtml += '</tr>';
        }

        tableHtml += '</tbody></table></div>';
        htmlLines.push(tableHtml);
        continue;
      }
    }

    // Callouts & Blockquotes (> quote)
    if (line.startsWith('> ') || line.trim() === '>') {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }

      const rawQuoteLines: string[] = [];
      while (i < lines.length && (lines[i].startsWith('> ') || lines[i].trim() === '>')) {
        rawQuoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      i--; // adjust loop index

      const firstLine = rawQuoteLines[0] || '';
      const calloutMatch = firstLine.match(/^\[!([A-Z_]+)\]\s*(.*)$/);

      if (calloutMatch) {
        const type = calloutMatch[1];
        const remainingFirst = calloutMatch[2];
        const bodyLines = remainingFirst ? [remainingFirst, ...rawQuoteLines.slice(1)] : rawQuoteLines.slice(1);

        const formatBody = (linesArr: string[]) => {
          return linesArr
            .filter((l) => l.trim().length > 0)
            .map((l) => {
              const trimmed = l.trim();
              if (trimmed.match(/^[-*]\s+/)) {
                return `<div class="flex items-start gap-2 my-1"><span class="opacity-60 shrink-0 select-none">•</span><span class="leading-relaxed">${trimmed.replace(/^[-*]\s+/, '')}</span></div>`;
              }
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                return `<div class="flex items-start gap-2 my-1.5"><span class="font-bold opacity-80 shrink-0 select-none">${numMatch[1]}.</span><span class="leading-relaxed">${numMatch[2]}</span></div>`;
              }
              return `<p class="my-1 leading-relaxed">${trimmed}</p>`;
            })
            .join('');
        };

        const contentHtml = formatBody(bodyLines);

        if (type === 'IMPORTANT') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-navy bg-navy/5 p-4 sm:p-5 shadow-xs text-navy text-xs sm:text-sm border border-navy/15"><div class="flex items-center gap-2 font-bold text-navy mb-2"><img src="/icons/01_cible_reflexe.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Points Essentiels du Baccalauréat</span></div><div class="leading-relaxed text-navy/90 font-medium">${contentHtml}</div></div>`);
          continue;
        }

        if (type === 'CAUTION' || type === 'WARNING' || type === 'PIEGE' || type === 'ATTENTION') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-rose-500 bg-rose-50/90 p-4 sm:p-5 shadow-xs text-rose-950 text-xs sm:text-sm border border-rose-200"><div class="flex items-center gap-2 font-bold text-rose-800 mb-2"><img src="/icons/02_avertissement.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Piège Éliminatoire Bac S2</span></div><div class="leading-relaxed text-rose-900">${contentHtml}</div></div>`);
          continue;
        }

        if (type === 'TIP' || type === 'CONSEIL_BAC' || type === 'ASTUCE') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/80 p-4 sm:p-5 shadow-xs text-emerald-950 text-xs sm:text-sm border border-emerald-200"><div class="flex items-center gap-2 font-bold text-emerald-800 mb-2"><img src="/icons/10_ampoule_astuce.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Conseil d'Excellence Bac S2</span></div><div class="leading-relaxed text-emerald-900">${contentHtml}</div></div>`);
          continue;
        }

        if (type === 'THEOREME') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-indigo-600 bg-indigo-50/80 p-4 sm:p-5 shadow-xs text-indigo-950 text-xs sm:text-sm border border-indigo-200"><div class="flex items-center gap-2 font-bold text-indigo-900 mb-2"><img src="/icons/19_theoreme_equerre.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Théorème &amp; Loi Fondamentale</span></div><div class="leading-relaxed text-indigo-950 font-medium">${contentHtml}</div></div>`);
          continue;
        }

        if (type === 'METHODE') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-turquoise bg-turquoise/10 p-4 sm:p-5 shadow-xs text-navy text-xs sm:text-sm border border-turquoise/20"><div class="flex items-center gap-2 font-bold text-turquoise mb-2"><img src="/icons/01_cible_reflexe.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Méthode &amp; Réflexe Clé</span></div><div class="leading-relaxed">${contentHtml}</div></div>`);
          continue;
        }

        if (type === 'EXEMPLE') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-amber-500 bg-amber-50/80 p-4 sm:p-5 shadow-xs text-amber-950 text-xs sm:text-sm border border-amber-200"><div class="flex items-center gap-2 font-bold text-amber-800 mb-2"><img src="/icons/20_exercice_crayon.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Exemple Type Résolu</span></div><div class="leading-relaxed text-amber-900">${contentHtml}</div></div>`);
          continue;
        }

        if (type === 'WOLOF') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-amber-600 bg-amber-500/10 p-4 sm:p-5 shadow-xs text-amber-950 text-xs sm:text-sm border border-amber-500/20"><div class="flex items-center gap-2 font-bold text-amber-900 mb-2"><span class="text-base">🇸🇳</span><span>Xam-xam ci Wolof • Décodage Pédagogique</span></div><div class="leading-relaxed text-amber-950 font-medium">${contentHtml}</div></div>`);
          continue;
        }

        if (type === 'VIE_REELLE' || type === 'CONCRET') {
          htmlLines.push(`<div class="my-5 rounded-2xl border-l-4 border-indigo-600 bg-indigo-50/80 p-4 sm:p-5 shadow-xs text-indigo-950 text-xs sm:text-sm border border-indigo-500/20"><div class="flex items-center gap-2 font-bold text-indigo-900 mb-2"><span class="text-base">🌍</span><span>Illustration de la Vie Réelle • Comprendre Concrètement</span></div><div class="leading-relaxed text-indigo-950">${contentHtml}</div></div>`);
          continue;
        }
      }

      // Standard Blockquote
      const quoteBody = rawQuoteLines.map((l) => `<p class="my-1">${l.trim()}</p>`).join('');
      htmlLines.push(`<blockquote class="border-l-4 border-turquoise pl-4 py-2 my-4 bg-turquoise/5 rounded-r-2xl text-text/80 italic text-xs sm:text-sm leading-relaxed">${quoteBody}</blockquote>`);
      continue;
    }

    // Images: ![alt](url)
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<figure class="my-6 w-full max-w-full overflow-hidden text-center"><div class="w-full max-w-full overflow-hidden rounded-2xl shadow-sm border border-navy/10 bg-white p-1 sm:p-2 mx-auto"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" class="w-full max-w-full h-auto block mx-auto object-contain" loading="lazy" style="max-height: 400px;" /></div><figcaption class="text-xs text-navy/60 font-semibold mt-2 px-2 text-center leading-snug">${imgMatch[1]}</figcaption></figure>`);
      continue;
    }

    // Unordered lists (- or *)
    if (line.match(/^[-*]\s+/)) {
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      if (!inUnorderedList) {
        htmlLines.push('<ul class="list-disc list-inside space-y-1.5 my-2.5 text-text/85 text-xs sm:text-sm">');
        inUnorderedList = true;
      }
      const itemContent = line.replace(/^[-*]\s+/, '');
      htmlLines.push(`<li class="leading-relaxed">${itemContent}</li>`);
      continue;
    } else if (inUnorderedList) {
      htmlLines.push('</ul>');
      inUnorderedList = false;
    }

    // Ordered lists (1. , 2. , etc.)
    const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (!inOrderedList) {
        htmlLines.push('<ol class="list-decimal list-inside space-y-2 my-2.5 text-text/90 text-xs sm:text-sm">');
        inOrderedList = true;
      }
      htmlLines.push(`<li class="leading-relaxed"><strong class="text-navy font-semibold">${orderedMatch[1]}.</strong> ${orderedMatch[2]}</li>`);
      continue;
    } else if (inOrderedList) {
      htmlLines.push('</ol>');
      inOrderedList = false;
    }

    // Blank line
    if (line.trim() === '') {
      continue;
    }

    // Paragraph
    htmlLines.push(`<p class="my-2.5 leading-relaxed text-text/90 text-xs sm:text-sm">${line}</p>`);
  }

  if (inUnorderedList) {
    htmlLines.push('</ul>');
  }
  if (inOrderedList) {
    htmlLines.push('</ol>');
  }

  let finalHtml = htmlLines.join('\n');

  // 4. Inline markdown formatting (bold, italic, code)
  finalHtml = finalHtml.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-navy">$1</strong>');
  finalHtml = finalHtml.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  finalHtml = finalHtml.replace(/`([^`]+)`/g, '<code class="bg-navy/5 text-navy font-mono text-[11px] px-1.5 py-0.5 rounded border border-navy/10">$1</code>');

  // 5. Restore inline math
  finalHtml = finalHtml.replace(/___INLINE_MATH_(\d+)___/g, (_, idx) => {
    return inlineMath[parseInt(idx, 10)] ?? '';
  });

  // 6. Restore block math
  finalHtml = finalHtml.replace(/___BLOCK_MATH_(\d+)___/g, (_, idx) => {
    return blockMath[parseInt(idx, 10)] ?? '';
  });

  return finalHtml;
}

export default function MathRenderer({ content, className = '' }: MathRendererProps) {
  const html = useMemo(() => renderMarkdownWithKatex(content), [content]);

  return (
    <div
      className={`prose prose-slate max-w-none text-text text-sm sm:text-base w-full max-w-full overflow-hidden break-words ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
