templates:

class htmlClass extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        //CODE here
    }
    disconnectedCallback() {
        //CODE here
    }
    attributeChangedCallback(name, oldValue, newValue) {
        //CODE here
    }
    adoptedCallback() {
        //CODE here
    }
    static get observedAttributes() {
        return [''];
    }
}

customElements.define('html-tag', htmlClass);

class htmlClassExtended extends htmlClass {
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        //CODE here
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        //CODE here
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        //CODE here
    }
    adoptedCallback() {
        super.adoptedCallback();
        //CODE here
    }
    static get observedAttributes() {
        super.observedAttributes();
        return [''];
    }
}