
class startBlock extends block {
    constructor() {
        super();
        this._settedUp = false;
        this._type = 'Start';
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
        if(!this._settedUp) {
            this.setUp(100, 100, 100, 100);
        }

        let grabber = createGrabber(this, updateConnections);
        grabber.style.transform = 'rotateZ(-45deg)';
        this.appendChild(grabber);

        let title = document.createElement('h2');
        title.innerText = 'Start';
        this.appendChild(title);

        let tunnelPoint = document.createElement('div');
        tunnelPoint.classList.add('tunnel-point');
        this.appendChild(tunnelPoint);
        this._tunnelStart = tunnelPoint;
        addConnector(tunnelPoint, this, 'tunnel-point', 'output');
    }
}
customElements.define('start-event-block', startBlock);