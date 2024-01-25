class Extender extends ioblock {
    constructor() {
        super();
    }
    getValue() {
        return super.getValue('in');
    }
    connectedCallback() {
        super.connectedCallback();
        this.setSize(100, 60);
        this.classList.add('extender-simple');

        this.addInput('in', 'any');
        this.addOutput('out', 'any');
    }
}
customElements.define('extender-simple-block', Extender);