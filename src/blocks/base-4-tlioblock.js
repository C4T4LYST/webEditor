class ioblockTimeLine extends ioblock {
    constructor() {
        super();

        this._tunnelStart = null;
        this._tunnelNext = null;
    }

    run() {
        if(this._tunnelNext._connectedTo == null) return console.error('No next block CompileTimeError', this);

        this._tunnelNext._connectedTo._parent.run();
    }

    getValue(name) {
        return super.getValue(name);
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('timeline-block')

        let fromTunnelPoint = document.createElement('target-point');
        fromTunnelPoint.classList.add('from-tunnel-point');
        fromTunnelPoint.init(this, 'input', 'timeline', 'single', []);
        this.appendChild(fromTunnelPoint);
        this._tunnelStart = fromTunnelPoint;

        let toTunnelPoint = document.createElement('target-point');
        toTunnelPoint.classList.add('to-tunnel-point');
        toTunnelPoint.init(this, 'output', 'timeline', 'single', []);
        this.appendChild(toTunnelPoint);
        this._tunnelNext = toTunnelPoint;
    }
}
