import { useEffect, useState } from 'react';

interface Options {
  typeMs?: number;
  typeJitterMs?: number;
  deleteMs?: number;
  holdMs?: number;
  gapMs?: number;
  startDelayMs?: number;
}

export function useTypewriter(words: string[], opts: Options = {}) {
  const {
    typeMs = 65,
    typeJitterMs = 40,
    deleteMs = 35,
    holdMs = 1600,
    gapMs = 320,
    startDelayMs = 900,
  } = opts;

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [text, setText] = useState(reduce ? words[0] : '');

  useEffect(() => {
    if (reduce) return;

    let i = 0;
    let pos = 0;
    let deleting = false;
    let timer: number | undefined;

    const tick = () => {
      const w = words[i];
      if (!deleting) {
        pos++;
        setText(w.slice(0, pos));
        if (pos === w.length) {
          deleting = true;
          timer = window.setTimeout(tick, holdMs);
          return;
        }
        timer = window.setTimeout(tick, typeMs + Math.random() * typeJitterMs);
      } else {
        pos--;
        setText(w.slice(0, pos));
        if (pos === 0) {
          deleting = false;
          i = (i + 1) % words.length;
          timer = window.setTimeout(tick, gapMs);
          return;
        }
        timer = window.setTimeout(tick, deleteMs);
      }
    };

    timer = window.setTimeout(tick, startDelayMs);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [words, reduce, typeMs, typeJitterMs, deleteMs, holdMs, gapMs, startDelayMs]);

  return text;
}
