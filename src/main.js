import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pepe logo animation
gsap.to('.pepe-logo', {
  rotation: 360,
  duration: 60,
  repeat: -1,
  ease: "none"
});

// Animate roadmap items
document.querySelectorAll('.roadmap-item').forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    delay: index * 0.2
  });
});

// Animate tokenomics chart
document.querySelectorAll('.chart-segment').forEach((segment, index) => {
  gsap.from(segment, {
    scrollTrigger: {
      trigger: segment,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    width: 0,
    opacity: 0,
    duration: 1.5,
    delay: index * 0.3,
    ease: "power2.out"
  });
});

// Animate team members
document.querySelectorAll('.team-member').forEach((member, index) => {
  gsap.from(member, {
    scrollTrigger: {
      trigger: member,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: index * 0.2
  });
});

// Hero section parallax effect
gsap.to('.bg-grid', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  },
  y: 200,
  opacity: 0.5
});

// Random meme pop-ups
const memeQuotes = [
  'feels good man',
  'to the moon! 🚀',
  'wagmi fren',
  'ser, this is a Wendy\'s',
  'ngmi'
];

function createRandomMeme() {
  const meme = document.createElement('div');
  meme.className = 'fixed text-green-400 pointer-events-none';
  meme.style.left = Math.random() * window.innerWidth + 'px';
  meme.style.top = Math.random() * window.innerHeight + 'px';
  meme.textContent = memeQuotes[Math.floor(Math.random() * memeQuotes.length)];
  
  document.body.appendChild(meme);
  
  gsap.from(meme, {
    opacity: 0,
    y: 20,
    duration: 0.5
  });
  
  gsap.to(meme, {
    opacity: 0,
    y: -20,
    delay: 2,
    duration: 0.5,
    onComplete: () => meme.remove()
  });
}

setInterval(createRandomMeme, 5000);