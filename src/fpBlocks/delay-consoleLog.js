
class consoleLogBlock extends ioblockTimeLine {
    constructor() {
        super();
    }

    run() {
        let value = super.getValue('text');
        CustomEnvirement.log(value);
        super.run();
    }

    connectedCallback() {
        super.connectedCallback();
        this.size = { width: 230, height: 80};

        let title = document.createElement('h2');
        title.innerText = 'Console.log';
        this.appendChild(title);

        this.addInput('text', 'any');
        this.addOutput('out', 'any');
    }
}
customElements.define('console-log-block', consoleLogBlock);