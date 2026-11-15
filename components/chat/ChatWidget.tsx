'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { whatsappLink } from '@/lib/academy/contact';
import { WHATSAPP_HANDOFF_MESSAGE } from '@/lib/chat/handoff';
import { MAX_MESSAGE_LENGTH, type ChatMessage } from '@/lib/chat/validate';
import { useHideFloatingActions } from '@/components/layout/useHideFloatingActions';

const SUGGESTIONS = [
  'How does the free 3-day trial work?',
  'Which course is right for my child?',
  'How do I enrol?',
  'What are the fees?',
];

const GREETING =
  'Assalam o Alaikum! I can answer questions about our courses, the free 3-day trial and how to enrol. How can I help?';

type Status = 'idle' | 'sending';

export function ChatWidget() {
  const { onForm, onReader } = useHideFloatingActions();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState<string | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, status, notice]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function close() {
    setIsOpen(false);
    launcherRef.current?.focus();
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || status === 'sending') return;

    const next: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setDraft('');
    setNotice(null);
    setStatus('sending');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });
      const data: { reply?: string; error?: string } = await response.json().catch(() => ({}));

      if (response.ok && typeof data.reply === 'string') {
        setMessages([...next, { role: 'assistant', content: data.reply }]);
      } else if (response.status === 429) {
        setNotice('You are sending messages quickly. Please wait a moment and try again.');
      } else if (response.status === 400 && data.error) {
        setNotice(data.error);
      } else {
        setNotice(
          'Sorry, the assistant is not available right now. You can ask us directly on WhatsApp.',
        );
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setNotice(
          'Sorry, we could not reach the assistant. Please check your connection or ask us on WhatsApp.',
        );
      }
    } finally {
      setStatus('idle');
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  // Steps aside wherever it could cover content (see useHideFloatingActions).
  const hiddenLauncher = `${
    onForm ? 'max-sm:pointer-events-none max-sm:invisible max-sm:opacity-0 ' : ''
  }${onReader ? 'max-lg:pointer-events-none max-lg:invisible max-lg:opacity-0' : ''}`;

  return (
    <>
      {!isOpen ? (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-label="Ask a question — open the chat assistant"
          className={`from-navy-1 to-navy-2 ring-accent fixed right-5 bottom-24 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-[#e8cd7a] shadow-lg ring-2 transition duration-200 hover:scale-105 ${hiddenLauncher}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-7"
          >
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" />
            <path d="M9 11.5h.01M12 11.5h.01M15 11.5h.01" strokeWidth="2.4" />
          </svg>
        </button>
      ) : (
        <div
          role="dialog"
          aria-label="Al-Hameed Online Quran Academy assistant"
          className="border-card-border bg-surface fixed right-3 bottom-3 z-40 flex max-h-[min(36rem,calc(100dvh-1.5rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border shadow-2xl shadow-blue-900/30 sm:right-5 sm:bottom-5"
        >
          <div className="from-navy-1 to-navy-2 flex items-center justify-between gap-3 bg-gradient-to-br px-5 py-4 text-white">
            <div className="min-w-0">
              <p className="font-display truncate text-lg leading-tight font-semibold">
                Ask Al-Hameed
              </p>
              <p className="text-xs text-blue-100/80">Online Quran Academy assistant</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="grid size-9 shrink-0 place-items-center rounded-full text-blue-100 hover:bg-white/10"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="flex min-h-40 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            <Bubble role="assistant" text={GREETING} />
            {messages.map((message, index) => (
              <Bubble key={index} role={message.role} text={message.content} />
            ))}
            {status === 'sending' ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400" role="status">
                Typing…
              </p>
            ) : null}
            {notice ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200"
              >
                <p>{notice}</p>
                <a
                  href={whatsappLink(WHATSAPP_HANDOFF_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-10 items-center font-semibold underline"
                >
                  Open WhatsApp
                </a>
              </div>
            ) : null}
            {messages.length === 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
                {SUGGESTIONS.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="border-card-border bg-surface-soft text-heading hover:border-accent min-h-10 rounded-full border px-3.5 py-2 text-left text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="border-card-border border-t px-3 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <label htmlFor="chat-input" className="sr-only">
                Your question
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                dir="auto"
                autoComplete="off"
                placeholder="Type your question…"
                className="border-card-border bg-surface text-heading focus:border-accent min-h-11 min-w-0 flex-1 rounded-full border px-4 text-base placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={status === 'sending' || !draft.trim()}
                className="bg-cta text-primary-foreground min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition hover:brightness-125 disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <p className="mt-2 px-1 text-[0.7rem] leading-snug text-zinc-500 dark:text-zinc-400">
              AI assistant — answers may contain mistakes. Fees and admission are confirmed on
              WhatsApp. Please don&apos;t share personal details here.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

function Bubble({ role, text }: { role: ChatMessage['role']; text: string }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <p
        dir="auto"
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-cta text-primary-foreground rounded-br-md'
            : 'bg-surface-soft text-heading rounded-bl-md'
        }`}
      >
        {text}
      </p>
    </div>
  );
}
