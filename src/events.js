

class baseEvent extends HTMLElement {
    constructor() {
        super();
        this._event = null;
        this._inited = false;
        this._callback = null;
        this._targetElement = null;
    }

    init(eventType, callback, targetElement) {
        this._event = eventType;
        this._callback = callback;
        this._targetElement = targetElement;
        this._inited = true;
    }

    call() {
        if(this._inited) {
            
        }
    }

    get event() {
        return this._event;
    }

    set event(value) {
        this._event = value;
    }

    connectedCallback() {

    }
}