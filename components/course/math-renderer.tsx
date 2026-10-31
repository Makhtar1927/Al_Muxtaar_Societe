'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
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

  // 1. Protect block math $$...$$
  const blockMath: string[] = [];
  let text = raw.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      blockMath.push(`<div class="my-4 overflow-x-auto py-2 text-center">${rendered}</div>`);
    } catch {
      blockMath.push(`<pre class="text-coral my-2 text-sm">${math}</pre>`);
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
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Headings
    if (line.startsWith('### ')) {
      if (inList) { htmlLines.push('</ul>'); inList = false; }
      htmlLines.push(`<h3 class="text-lg font-bold text-navy mt-6 mb-2">${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { htmlLines.push('</ul>'); inList = false; }
      htmlLines.push(`<h2 class="text-xl font-bold text-navy mt-8 mb-3 pb-1 border-b border-navy/10">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      if (inList) { htmlLines.push('</ul>'); inList = false; }
      htmlLines.push(`<h1 class="text-2xl font-bold text-navy mt-8 mb-4">${line.slice(2)}</h1>`);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      if (inList) { htmlLines.push('</ul>'); inList = false; }
      htmlLines.push(`<blockquote class="border-l-4 border-turquoise pl-4 py-1.5 my-3 bg-turquoise/5 rounded-r-xl text-text/80 italic text-sm">${line.slice(2)}</blockquote>`);
      continue;
    }

    // Images: ![alt](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      if (inList) { htmlLines.push('</ul>'); inList = false; }
      htmlLines.push(`<figure class="my-6 text-center"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" class="max-w-full h-auto rounded-2xl mx-auto shadow-sm border border-navy/10" /><figcaption class="text-xs text-text/50 mt-2">${imgMatch[1]}</figcaption></figure>`);
      continue;
    }

    // Unordered lists (- or *)
    if (line.match(/^[-*]\s+/)) {
      if (!inList) {
        htmlLines.push('<ul class="list-disc list-inside space-y-1.5 my-3 text-text/85">');
        inList = true;
      }
      const itemContent = line.replace(/^[-*]\s+/, '');
      htmlLines.push(`<li>${itemContent}</li>`);
      continue;
    } else if (inList) {
      htmlLines.push('</ul>');
      inList = false;
    }

    // Blank line
    if (line.trim() === '') {
      continue;
    }

    // Paragraph
    htmlLines.push(`<p class="my-3 leading-relaxed text-text/90">${line}</p>`);
  }

  if (inList) {
    htmlLines.push('</ul>');
  }

  let finalHtml = htmlLines.join('\n');

  // 4. Inline markdown formatting (bold, italic, code)
  finalHtml = finalHtml.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>');
  finalHtml = finalHtml.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  finalHtml = finalHtml.replace(/`([^`]+)`/g, '<code class="bg-navy/5 text-navy font-mono text-xs px-1.5 py-0.5 rounded border border-navy/10">$1</code>');

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
      className={`prose prose-slate max-w-none text-text text-base ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

