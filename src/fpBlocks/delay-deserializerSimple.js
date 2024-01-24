class ObjectDeserializer extends ioblock {
    constructor() {
        super();
    }
    getValue() {
        return super.getValue('obj')[super.getValue('field')];
    }

    connectedCallback() {
        super.connectedCallback();
        this.setSize(120, 90);
        this.classList.add('object-deserializer');

        this.addInput('obj', 'any');
        this.addInput('field', 'string');
        this.addOutput('out', 'any');
    }
}

customElements.define('object-simple-deserializer', ObjectDeserializer);