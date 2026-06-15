
const keysDown = new Set();

keysDown.addEventListener('keydown', (event) => {
    keysDown.add(event.key);
});

keysDown.addEventListener('keyup', (event) => {
    keysDown.delete(event.key);
});

export default function isKeyPressed(key) {
    return keysDown.has(key);
}