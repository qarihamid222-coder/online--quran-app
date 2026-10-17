import { whatsappLink } from '@/lib/academy/contact';

/** Floating, site-wide WhatsApp contact button (fixed, so it stays visible while scrolling). */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Assalam o Alaikum! I have a question about the Quran Academy.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M16.004 2.667c-7.364 0-13.333 5.97-13.333 13.333 0 2.386.633 4.625 1.822 6.59L2.667 29.333l6.912-1.814a13.26 13.26 0 0 0 6.425 1.648c7.364 0 13.333-5.969 13.333-13.333S23.368 2.667 16.004 2.667zm0 24.286a11 11 0 0 1-5.58-1.527l-.4-.237-4.1 1.078 1.096-4.001-.26-.411a10.942 10.942 0 0 1-1.69-5.855c0-6.069 4.943-11.012 11.012-11.012s11.012 4.943 11.012 11.012-5.021 11.953-11.09 11.953zm6.067-8.25c-.333-.167-1.964-.969-2.268-1.08-.303-.112-.524-.167-.745.167-.22.333-.853 1.079-1.045 1.301-.192.222-.385.25-.712.084-.327-.167-1.38-.509-2.628-1.622-.971-.866-1.627-1.937-1.818-2.264-.192-.327-.02-.504.157-.672.167-.158.374-.41.56-.615.187-.204.249-.35.374-.584.125-.234.062-.439-.03-.615-.093-.177-.839-2.012-1.148-2.754-.303-.728-.613-.63-.84-.642l-.715-.013c-.233 0-.611.088-.937.439-.327.35-1.246 1.219-1.246 2.971s1.277 3.445 1.455 3.682c.179.237 2.459 3.753 5.958 5.117 2.976 1.157 3.584.927 4.231.868.647-.059 1.964-.802 2.241-1.578.277-.775.277-1.44.193-1.578-.083-.137-.303-.217-.636-.384z" />
      </svg>
    </a>
  );
}
