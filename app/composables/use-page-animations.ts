import { gsap } from 'gsap';

export function usePageAnimations() {
  function animateHero(heroElement: HTMLElement) {
    gsap.from(heroElement, {
      opacity: 0,
      duration: 1.8,
      ease: 'power3.out',
    });
  }

  function animateCards(cardEls: HTMLElement[]) {
    gsap.fromTo(
      cardEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      },
    );
  }

  return { animateHero, animateCards };
}
