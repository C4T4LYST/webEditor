class EventDataStartBlock extends ioblock {
    #outPoint = null;
    constructor() {
        super();

        this._tunnelNext = null;
        this._value = null;
        this.#outPoint = document.createElement('target-point');
    }

    prepare(outputDataType, additionalTags) {
        this.#outPoint.init(this, 'output', outputDataType, 'multi', additionalTags);
        this.#outPoint.classList.add('data-point');
        this.appendChild(this.#outPoint);
    }

    setEventData(value) {
        this._value = value;
    }

    run() {
        if(this._tunnelNext._connectedTo == null) return console.error('No next block CompileTimeError', this);
        
        this._tunnelNext._connectedTo._parent.run();
    }

    getValue() {
        return this._value;
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('event-block');

        if(this.position.x == 0 && this.position.y == 0) this.setPosition(100, 100);

        let toTunnelPoint = document.createElement('target-point');
        toTunnelPoint.classList.add('to-tunnel-point');
        toTunnelPoint.init(this, 'output', 'timeline', 'single', []);
        this.appendChild(toTunnelPoint);
        this._tunnelNext = toTunnelPoint;
    }
}
