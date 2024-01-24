
class startBlock extends EventStartBlock {
    constructor() {
        super();
    }

    run() {
        super.run();
    }

    connectedCallback() {
        super.connectedCallback();
        
        let title = document.createElement('h2');
        title.innerText = 'Start';
        this.appendChild(title);
    }
}
customElements.define('start-event-block', startBlock);

