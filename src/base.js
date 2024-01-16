

/* */
function showQuickMenu() {
    document.getElementById('searchBar').value = '';
    document.getElementById('quickMenu').classList.add('show');
}
function hideQuickMenu() {
    document.getElementById('quickMenu').classList.remove('show');
}
// new

function createGrabber(ParentElement, callbackOnMove) {
    let grabber = document.createElement('div');
    grabber.classList.add('grabber');
    grabber.title = 'Click to move';
    grabber.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>';
    
    let dragging = false;
    let dragOffset = { x: 0, y: 0 };
    grabber.addEventListener('mousedown', (e) => {
        dragging = true;
        dragOffset = {
            x: e.clientX - ParentElement.position.x,
            y: e.clientY - ParentElement.position.y
        }
    });

    document.addEventListener('mousemove', (e) => {
        if(dragging) {
            ParentElement.setPosition(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
            if(callbackOnMove != undefined) {
                callbackOnMove();
            }
        }
    });

    document.addEventListener('mouseup', (e) => {
        dragging = false;
    });
    
    return grabber;
}

function createLine(element1, position2, color) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    document.getElementById('lines').appendChild(svg);

    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    svg.appendChild(line);

    line.setAttribute('x1', element1.getBoundingClientRect().x + element1.getBoundingClientRect().width / 2);
    line.setAttribute('y1', element1.getBoundingClientRect().y + element1.getBoundingClientRect().height / 2);
    line.setAttribute('x2', position2.x);
    line.setAttribute('y2', position2.y);
    line.style.stroke = color;

    return { line: line, svg: svg };
}

let connectors = [];
let connectedPoints = [];

let assocs = new Map();
function getConnectedBlock(element) {
    let finded = null;
    connectedPoints.forEach(connection => {
        console.log(connection);
        if(connection.from == element) {
            finded = connection.to;
            return;
        }
        if(connection.to == element) {
            finded = connection.from;
            return;
        }
    });

    return assocs.get(finded);
}

let colorOptions = {
    'tunnel-point': 'grey',
    'target-point': 'blue'
}

function addConnector(html, type, way) {
    connectors.push(html);
    let grabbing = false;
    let line = null;

    let removeThis = () => {};

    function mousedown(e) {
        if(grabbing) return;

        if(html.classList.contains('connected')) return removeThis();

        e.stopPropagation();
        e.stopImmediatePropagation();
        grabbing = true;

        line = createLine(html, { x: e.clientX, y: e.clientY }, colorOptions[type]);
    }

    function mousemove(e) {
        if(!grabbing) return;

        e.stopPropagation();
        e.stopImmediatePropagation();

        var svgPoint = line.svg.createSVGPoint();
        svgPoint.x = e.clientX;
        svgPoint.y = e.clientY;
        var newCoords = svgPoint.matrixTransform(line.svg.getScreenCTM().inverse());

        line.line.setAttribute('x2', newCoords.x);
        line.line.setAttribute('y2', newCoords.y);
    }

    function mouseup (e) {
        if(!grabbing) return;

        e.stopPropagation();
        e.stopImmediatePropagation();
        grabbing = false;

        document.elementsFromPoint(e.clientX, e.clientY).forEach(element => {
            if(element.classList.contains(type) && element != html && !html.classList.contains('connected')
                && !element.classList.contains('connected') && !element.classList.contains(way)) {

                console.log('New connection!');

                grabbing = false;
                var svgPoint = line.svg.createSVGPoint();
                svgPoint.x = element.getBoundingClientRect().x + element.getBoundingClientRect().width / 2;
                svgPoint.y = element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2;
                var newCoords = svgPoint.matrixTransform(line.svg.getScreenCTM().inverse());
                line.line.setAttribute('x2', newCoords.x);
                line.line.setAttribute('y2', newCoords.y);

                element.classList.add('connected');
                html.classList.add('connected');

                connectedPoints.push({ from: html, to: element, line: line });
            }
        });

        if(!html.classList.contains('connected')) {
            document.getElementById('lines').removeChild(line.svg);
            line = null;
        }
    }

    html.addEventListener('mousedown', mousedown);
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);

    removeThis = () => {
        if(html.classList.contains('connected')) {
            let connection = connectedPoints.find(connection => connection.from == html || connection.to == html);
            console.log('connection removed');
            connection.from.classList.remove('connected');
            connection.to.classList.remove('connected');

            document.getElementById('lines').removeChild(connection.line.svg);

            connectedPoints = connectedPoints.filter(connection => connection.from != html && connection.to != html);
            connectors = connectors.filter(segment => segment != html);
        }
    }
}

function updateConnectors() {
    connectors.forEach(segment => {
        connectedPoints.forEach(connection => {
            if(connection.from == segment) {
                connection.line.line.setAttribute('x1', segment.getBoundingClientRect().x + segment.getBoundingClientRect().width / 2);
                connection.line.line.setAttribute('y1', segment.getBoundingClientRect().y + segment.getBoundingClientRect().height / 2);
            }
            if(connection.to == segment) {
                connection.line.line.setAttribute('x2', segment.getBoundingClientRect().x + segment.getBoundingClientRect().width / 2);
                connection.line.line.setAttribute('y2', segment.getBoundingClientRect().y + segment.getBoundingClientRect().height / 2);
            }
        });
    });
}

function updateConnections() {
    updateConnectors();
    updateTunnelSegments();
}

class block extends HTMLElement{
    constructor(){
        super();

        this._inited = false;
        this._type = 'base';
        this._caller = null;
        this._callfor = null;
        this._targetPoints = [];

        this._position = { x: 0, y: 0 };
        this._size = { width: 0, height: 0 };
    }

    set type(value) {
        this._type = value;
    }
    get type() {
        return this._type;
    }

    set caller(value) {
        this._caller = value;
    }
    get caller() {
        return this._caller;
    }

    set callfor(value) {
        this._callfor = value;
    }
    get callfor() {
        return this._callfor;
    }

    set position(value) {
        this._position = value;
        this.style.setProperty('--block-pos-x', this._position.x + 'px');
        this.style.setProperty('--block-pos-y', this._position.y + 'px');
    }
    get position() {
        return this._position;
    }

    setPosition(x, y) {
        this._position = { x: x, y: y };
        this.style.setProperty('--block-pos-x', this._position.x + 'px');
        this.style.setProperty('--block-pos-y', this._position.y + 'px');
    }

    set size(value) {
        this._size = value;
        this.style.setProperty('--block-width', this._size.width + 'px');
        this.style.setProperty('--block-height', this._size.height + 'px');
    }
    get size() {
        return this._size;
    }
}

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
            console.log(this, 'Points', nextBlock);
            if(nextBlock != null) {
                nextBlock.run();
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
        addConnector(tunnelPoint, 'tunnel-point', 'output');
    }
}
customElements.define('start-event-block', startBlock);

class ioblock extends block {
    constructor() {
        super();
        this._settedUp = false;
        this._type = 'IO';

        this._inputs = [];
        this._outputs = [];

        this._inputSide = document.createElement('div');
        this._outputSide = document.createElement('div');
    }

    addInput(name) {
        let input = document.createElement('div');
        input.classList.add('block-input');

        let targetPoint = document.createElement('div');
        targetPoint.classList.add('target-point');
        targetPoint.classList.add('input');
        input.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        input.appendChild(tx);

        this._inputSide.appendChild(input);
        this._inputs.push({ name: name, element: targetPoint });
        addConnector(targetPoint, 'target-point', 'input');

        assocs.set(targetPoint, this);
    }

    addOutput(name) {
        let output = document.createElement('div');
        output.classList.add('block-output');
        
        let targetPoint = document.createElement('div');
        targetPoint.classList.add('target-point');
        targetPoint.classList.add('output');
        output.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        output.appendChild(tx);

        this._outputSide.appendChild(output);
        this._outputs.push({ name: name, element: targetPoint });
        addConnector(targetPoint, 'target-point', 'output');

        assocs.set(targetPoint, this);
    }

    connectedCallback() {
        this.classList.add('io-block');
        this.classList.add('simple-block');

        let grabber = createGrabber(this, updateConnections);
        this.appendChild(grabber);

        this._inputSide.classList.add('input-side');
        this.appendChild(this._inputSide);

        this._outputSide.classList.add('output-side');
        this.appendChild(this._outputSide);
    }
}

class ioblockTimeLine extends ioblock {
    constructor() {
        super();
        this._settedUp = false;
    }
    setUp(positionX, positionY, sizeX, sizeY) {
        this.position = { x: positionX, y: positionY };
        this.size = { width: sizeX, height: sizeY };
        this._settedUp = true;
        this._tunnelStart = null;
        this._tunnelNext = null;
    }

    run() {
        if(this._tunnelStart != null && this._tunnelStart.classList.contains('connected')) {
            let nextBlock = getConnectedBlock(this._tunnelStart);
            if(nextBlock != null) {
                nextBlock.run();
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('timeline-block')

        let fromTunnelPoint = document.createElement('div');
        fromTunnelPoint.classList.add('tunnel-point');
        fromTunnelPoint.classList.add('from-tunnel-point');
        this.appendChild(fromTunnelPoint);
        this._tunnelStart = fromTunnelPoint;
        addConnector(fromTunnelPoint, 'tunnel-point', 'input');

        let toTunnelPoint = document.createElement('div');
        toTunnelPoint.classList.add('tunnel-point');
        toTunnelPoint.classList.add('to-tunnel-point');
        this.appendChild(toTunnelPoint);
        this._tunnelNext = toTunnelPoint;
        addConnector(toTunnelPoint, 'tunnel-point', 'output');
    }
}

class consoleLogBlock extends ioblockTimeLine {
    constructor() {
        super();
        this._settedUp = false;
    }
    setUp(positionX, positionY, sizeX, sizeY) {
        this.position = { x: positionX || 100, y: positionY || 100};
        this.size = { width: sizeX || 230, height: sizeY || 80};
        this._settedUp = true;
    }

    connectedCallback() {
        super.connectedCallback();
        if(!this._settedUp) {
            this.setUp(100, 100, 230, 80);
        }
        
        let title = document.createElement('h2');
        title.innerText = 'Console.log';
        this.appendChild(title);

        this.addInput('text');
        this.addOutput('out');
    }
}
customElements.define('console-log-block', consoleLogBlock);

class stringInputBlock extends ioblock {
    constructor() {
        super();
        this._settedUp = false;
    }
    setUp(positionX, positionY, sizeX, sizeY) {
        this.position = { x: positionX, y: positionY };
        this.size = { width: sizeX, height: sizeY };
        this._settedUp = true;
    }

    connectedCallback() {
        super.connectedCallback();
        if(!this._settedUp) {
            this.setUp(100, 100, 230, 110);
        }
        
        let title = document.createElement('h2');
        title.innerText = 'String Input';
        this.appendChild(title);

        let inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = 'Text';
        this.appendChild(inputBox);

        this.addOutput('out');
    }

}
customElements.define('string-input-block', stringInputBlock);
