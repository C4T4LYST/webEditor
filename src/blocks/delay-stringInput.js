
class stringInputBlock extends ioblock {
    #value = '';
    #htm = null;

    constructor() {
        super();
        this.#htm = document.createElement('input');
        this.#htm.type = 'text';
        this.#htm.placeholder = 'Text';
        this.#htm.addEventListener('change', () => {
            this.#value = this.#htm.value;
        });
    }

    getValue(name) {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.#htm.value = value;
    }
    get value() {
        return this.#value;
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('string-input-block');
        this.setSize(180, 90);

        let title = document.createElement('h2');
        title.innerText = 'String Input';
        this.appendChild(title);

        this.appendChild(this.#htm);
        this.addOutput('out', 'string');
    }
}

customElements.define('string-input-block', stringInputBlock);