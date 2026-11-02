'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

/**
 * Nettoie et normalise les formules mathématiques KaTeX :
 * Répare les séquences d'échappement mangées par JS (ex: \f -> form feed, \t -> tab)
 */
function normalizeMathString(str: string): string {
  if (!str) return '';
  return str
    .replace(/\x0crac/g, '\\frac') // \f mangé par template string
    .replace(/\t(imes)/g, '\\times') // \t mangé par template string
    .replace(/\\?rac(?=\{|\d|\s*0)/g, '\\frac') // 'rac00' ou 'rac{...}'
    .replace(/\\?rac\s*\\?infty/g, '\\frac{\\infty}')
    .replace(/0imes\\?infty/g, '0 \\times \\infty')
    .replace(/\+infty\s*-\s*infty/g, '+\\infty - \\infty');
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
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      blockMath.push(`<div class="my-3 overflow-x-auto py-2 text-center text-sm sm:text-base">${rendered}</div>`);
    } catch {
      blockMath.push(`<pre class="text-coral my-2 text-xs overflow-x-auto">${math}</pre>`);
    }
    return `___BLOCK_MATH_${blockMath.length - 1}___`;
  });

  // 2. Protect inline math $...$ (avoiding double $)
  const inlineMath: string[] = [];
  text = text.replace(/(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)/g, (_, math) => {
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
      inlineMath.push(rendered);
    } catch {
      inlineMath.push(`<code>${math}</code>`);
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

    // Callouts & Blockquotes (> quote)
    if (line.startsWith('> ')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      const quoteText = line.slice(2).trim();

      if (quoteText.startsWith('[!ASTUCE]')) {
        const body = quoteText.replace(/^\[!ASTUCE\]\s*/, '');
        htmlLines.push(`<div class="my-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/80 p-3.5 sm:p-4 shadow-sm text-emerald-950 text-xs sm:text-sm"><div class="flex items-center gap-2 font-bold text-emerald-800 mb-1"><img src="/icons/10_ampoule_astuce.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Astuce Bac Sénégal</span></div><p class="leading-relaxed text-emerald-900">${body}</p></div>`);
        continue;
      }

      if (quoteText.startsWith('[!METHODE]')) {
        const body = quoteText.replace(/^\[!METHODE\]\s*/, '');
        htmlLines.push(`<div class="my-4 rounded-2xl border-l-4 border-turquoise bg-turquoise/10 p-3.5 sm:p-4 shadow-sm text-navy text-xs sm:text-sm"><div class="flex items-center gap-2 font-bold text-turquoise mb-1"><img src="/icons/01_cible_reflexe.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Méthode &amp; Réflexe Clé</span></div><p class="leading-relaxed">${body}</p></div>`);
        continue;
      }

      if (quoteText.startsWith('[!PIEGE]') || quoteText.startsWith('[!ATTENTION]')) {
        const body = quoteText.replace(/^\[!(?:PIEGE|ATTENTION)\]\s*/, '');
        htmlLines.push(`<div class="my-4 rounded-2xl border-l-4 border-rose-500 bg-rose-50/80 p-3.5 sm:p-4 shadow-sm text-rose-950 text-xs sm:text-sm"><div class="flex items-center gap-2 font-bold text-rose-800 mb-1"><img src="/icons/02_avertissement.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Attention au piège fréquent</span></div><p class="leading-relaxed text-rose-900">${body}</p></div>`);
        continue;
      }

      if (quoteText.startsWith('[!EXEMPLE]')) {
        const body = quoteText.replace(/^\[!EXEMPLE\]\s*/, '');
        htmlLines.push(`<div class="my-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50/80 p-3.5 sm:p-4 shadow-sm text-amber-950 text-xs sm:text-sm"><div class="flex items-center gap-2 font-bold text-amber-800 mb-1"><img src="/icons/20_exercice_crayon.svg" width="20" height="20" class="inline-block shrink-0" alt="" /><span>Exemple Type Résolu</span></div><p class="leading-relaxed text-amber-900">${body}</p></div>`);
        continue;
      }

      if (quoteText.startsWith('[!WOLOF]')) {
        const body = quoteText.replace(/^\[!WOLOF\]\s*/, '');
        htmlLines.push(`<div class="my-4 rounded-2xl border-l-4 border-amber-600 bg-amber-500/10 p-3.5 sm:p-4 shadow-sm text-amber-950 text-xs sm:text-sm border border-amber-500/20"><div class="flex items-center gap-2 font-bold text-amber-900 mb-1"><span class="text-base">🇸🇳</span><span>Xam-xam ci Wolof • Décodage Pédagogique</span></div><p class="leading-relaxed text-amber-950 font-medium">${body}</p></div>`);
        continue;
      }

      if (quoteText.startsWith('[!VIE_REELLE]') || quoteText.startsWith('[!CONCRET]')) {
        const body = quoteText.replace(/^\[!(?:VIE_REELLE|CONCRET)\]\s*/, '');
        htmlLines.push(`<div class="my-4 rounded-2xl border-l-4 border-indigo-600 bg-indigo-50/80 p-3.5 sm:p-4 shadow-sm text-indigo-950 text-xs sm:text-sm border border-indigo-500/20"><div class="flex items-center gap-2 font-bold text-indigo-900 mb-1"><span class="text-base">🌍</span><span>Illustration de la Vie Réelle • Comprendre Concrètement</span></div><p class="leading-relaxed text-indigo-950">${body}</p></div>`);
        continue;
      }

      htmlLines.push(`<blockquote class="border-l-4 border-turquoise pl-3.5 py-1.5 my-3 bg-turquoise/5 rounded-r-xl text-text/80 italic text-xs sm:text-sm leading-relaxed">${quoteText}</blockquote>`);
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
