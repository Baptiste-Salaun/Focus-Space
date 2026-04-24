/**
 * Génère une petite mélodie douce de fin de timer avec la Web Audio API.
 * Zéro dépendance, zéro fichier audio à télécharger.
 *
 * Le son est un arpège majeur ascendant avec une enveloppe douce pour
 * éviter d'agresser l'utilisateur.
 */

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
  }
  return audioContext;
}

/**
 * Joue une note unique avec une enveloppe ADSR douce.
 */
function playNote(ctx, frequency, startTime, duration, gain = 0.15) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Onde sinusoïdale = son très doux, façon carillon
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  // Enveloppe : attaque rapide, release lent pour un rendu "cloche"
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + duration
  );

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

/**
 * Joue la mélodie de fin de timer.
 * Par défaut : arpège en Do majeur ascendant (C5-E5-G5-C6), ambiance positive.
 * Pour la fin de pause : arpège descendant plus grave (C5-G4-E4-C4), ambiance plus feutrée.
 */
export function playEndSound(variant = 'focus') {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Reprendre le contexte si suspendu (autoplay policy)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const noteDuration = 0.8;
  const noteSpacing = 0.15;

  let frequencies;
  if (variant === 'break') {
    // Fin de focus → son montant joyeux : on a bossé, pause méritée
    frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  } else {
    // Fin de pause → son descendant doux : on se recentre pour bosser
    frequencies = [659.25, 523.25, 440.0, 329.63]; // E5, C5, A4, E4
  }

  frequencies.forEach((freq, i) => {
    playNote(ctx, freq, now + i * noteSpacing, noteDuration, 0.12);
  });
}

/**
 * Envoie une notification navigateur si l'utilisateur l'a autorisée.
 */
export function sendNotification(title, body) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(title, { body, silent: true });
  }
}

/**
 * Demande la permission pour les notifications (à appeler sur un geste utilisateur).
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}