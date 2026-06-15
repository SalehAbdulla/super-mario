const game = document.getElementById("game");
const entities = new Map();

function getOrCreate(id){
    if (entities.has(id)) {
        return entities.get(id);
    }

    const ele = document.createElement("div");
    ele.classList.add("entity");
    ele.style.willChange = "transform";

    game.appendChild(ele);
    entities.set(id, ele);
    return ele;
}

export function initReact(id, width, height, color = "white", texture = null) {
    const el = getOrCreate(id);
    el.width = width;
    el.height = height;
    el.style.backgroundColor = color;
    if (texture) {
        el.style.backgroundImage = `url(${texture})`;
        el.style.backgroundSize = "cover";
    } else {
        el.style.backgroundImage = "";
        el.style.backgroundColor = color;
    }
}

export function move(id, x, y, srcX = 0, srcY = 0, size = '', shouldFlip = false) {
    const el = getOrCreate(id);
    if (!ele) return;

    ele.style.transform = `translate(${x}px, ${y}px)`;
    ele.style.backgroundPosition = `${srcX}px ${srcY}px`;
    ele.backgroundSize = size;

    ele.style.transform += shouldFlip ? " scaleX(-1)" : " scaleX(1)";

}

export function destroyEntity(id) {
    const el = getOrCreate(id);
    if (!el) return;
    el.remove();
    entities.delete(id);
}

export function destroyAllEntities() {
    for (const el of entities.values()) {
        el.remove();
    }
    entities.clear();
}