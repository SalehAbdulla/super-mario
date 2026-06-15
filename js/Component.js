/**
    @class Component:
    @description Base class for all components. Components are attached to game objects and define their behavior.
    Custom behaviors (Physics, Colliders, Rendering) must extend this class.
**/
export default class Component {
    // @type {GameObject}
    gameObject;
    // @type {boolean}
    isEnabled;
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.isEnabled = true;
    }
    update() {}
    render() {}
    onRemove() {}
}   