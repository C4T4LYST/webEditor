class ObjectModifyer extends ioblockTimeLine {
    constructor() {
        super();
    }
    getValue() {
        return super.getValue('obj')[super.getValue('field')];
    }

    connectedCallback() {
        super.connectedCallback();
        this.setSize(120, 120);
        this.classList.add('object-deserializer');

        this.addInput('obj', 'any');
        this.addInput('field', 'string');
        this.addInput('data', 'any');
        this.addOutput('obj', 'any');
    }
}

customElements.define('object-simple-modifyer', ObjectModifyer);