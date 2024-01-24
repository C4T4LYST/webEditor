

class keyDownEventBlock extends ioblock {
    constructor() {
        super();
        this._settedUp = false;
        this._type = 'KeyDown';
    }
    setUp(positionX, positionY, sizeX, sizeY) {
        this.position = { x: positionX || 100, y: positionY || 100};
        this.size = { width: sizeX || 100, height: sizeY || 100};
        this._settedUp = true;
        this._tunnelStart = null;
    }

    run() {
        if(this._tunnelStart != null && this._tunnelStart.classList.contains('connected')) {
            let nextBlock = getConnectedBlock(this._tunnelStart);
            if(nextBlock != null) {
                let ccs = assocs.get(nextBlock);
                console.log('Start Point', ccs);
                ccs.run();
            }
        }
    }

    connectedCallback() {
        this.classList.add('event-block');
        this.classList.add('simple-block');
        this.classList.add('key-down-block');
        super.connectedCallback();
        if(!this._settedUp) {
            this.setUp(100, 100, 230, 80);
        }
        
        let grabber = createGrabber(this, updateConnections);
        grabber.style.transform = 'rotateZ(-45deg)';
        this.appendChild(grabber);

        let title = document.createElement('h2');
        title.innerText = 'KeyDown';
        this.appendChild(title);

        let inputBox = document.createElement('p');
        inputBox.classList.add('key-input-box');
        inputBox.innerText = 'Select Key';
        this.appendChild(inputBox);

        let tunnelPoint = document.createElement('div');
        tunnelPoint.classList.add('tunnel-point');
        this.appendChild(tunnelPoint);
        this._tunnelStart = tunnelPoint;
        addConnector(tunnelPoint, this, 'tunnel-point', 'output');

        super.addOutput('output', ['multi']);
    }
}
customElements.define('key-down-event-block', keyDownEventBlock);