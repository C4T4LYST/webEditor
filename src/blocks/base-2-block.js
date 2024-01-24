
class block extends HTMLElement{
    #position = { x: 0, y: 0 };
    #size = { width: 0, height: 0 };
    constructor(){
        super();
    }
    /**
     * @param {{x: number, y: number}} value
     */
    set position(value) {
        this.#position = value;
        this.style.setProperty('--block-pos-x', this.#position.x + 'px');
        this.style.setProperty('--block-pos-y', this.#position.y + 'px');
    }
    /**
     * @returns {{x: number, y: number}}
     */
    get position() {
        return this.#position;
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    setPosition(x, y) {
        this.#position = { x: x, y: y };
        this.style.setProperty('--block-pos-x', this.#position.x + 'px');
        this.style.setProperty('--block-pos-y', this.#position.y + 'px');
    }

    /**
     * @param {{width: number, height: number}} value
     */
    set size(value) {
        this.#size = value;
        this.style.setProperty('--block-width', this.#size.width + 'px');
        this.style.setProperty('--block-height', this.#size.height + 'px');
    }
    /**
     * @returns {{width: number, height: number}}
     */
    get size() {
        return this.#size;
    }
    /**
     * @param {number} width 
     * @param {number} height 
     */
    setSize(width, height) {
        this.#size = { width: width, height: height };
        this.style.setProperty('--block-width', this.#size.width + 'px');
        this.style.setProperty('--block-height', this.#size.height + 'px');
    }
}