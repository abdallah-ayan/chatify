const keysStrokeSounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
];

export default function useKeyboardSounds() {
    const playRandomKeyStrokeSound = () => {
        const index = Math.floor(Math.random() * keysStrokeSounds.length);
        const randomSound = keysStrokeSounds[index == keysStrokeSounds.length ? keysStrokeSounds.length - 1 : index];
        randomSound.currentTime = 0;
        randomSound.play().catch(()=> {})
    }
    
    return {playRandomKeyStrokeSound}
}
