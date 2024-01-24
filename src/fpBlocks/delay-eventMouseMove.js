class eventMouseMove extends EventDataStartBlock {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('mouse-move-event-block');

        this.setSize(100, 100);

        super.prepare('obj', ['dot-x', 'dot-y']);

        let title = document.createElement('h2');
        title.innerText = 'OnMouseMove';
        title.style.fontSize = '14px';
        this.appendChild(title);


        CustomEnvirement.getRoot().addEventListener('mousemove', (e) => {
            this.setEventData(e);
            this.run();
        });
    }

    run() {
        if(this._tunnelNext._connectedTo == null) return;

        this._tunnelNext._connectedTo._parent.run();
    }
}

customElements.define('event-mousemove', eventMouseMove);