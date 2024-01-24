class EventStartBlock extends ioblock {
    constructor() {
        super();

        this._tunnelNext = null;
    }

    run() {
        if(this._tunnelNext._connectedTo == null) return console.error('No next block CompileTimeError', this);
        
        this._tunnelNext._connectedTo._parent.run();
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('event-block');

        this.setSize(100, 100);
        if(this.position.x == 0 && this.position.y == 0) this.setPosition(100, 100);

        let toTunnelPoint = document.createElement('target-point');
        toTunnelPoint.classList.add('to-tunnel-point');
        toTunnelPoint.init(this, 'output', 'timeline', 'single', []);
        this.appendChild(toTunnelPoint);
        this._tunnelNext = toTunnelPoint;
    }
}
