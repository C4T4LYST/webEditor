/*
function createLine(element1, element2) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    document.getElementById('lines').appendChild(svg);

    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    svg.appendChild(line);

    line.setAttribute('x1', element1.getBoundingClientRect().x + element1.getBoundingClientRect().width / 2);
    line.setAttribute('y1', element1.getBoundingClientRect().y + element1.getBoundingClientRect().height / 2);
    line.setAttribute('x2', element2.getBoundingClientRect().x + element2.getBoundingClientRect().width / 2);
    line.setAttribute('y2', element2.getBoundingClientRect().y + element2.getBoundingClientRect().height / 2);

    return line;
}*//*
function resetLine() {
    document.getElementById('connectorLine').setAttribute('x1', 0);
    document.getElementById('connectorLine').setAttribute('y1', 0);
    document.getElementById('connectorLine').setAttribute('x2', 0);
    document.getElementById('connectorLine').setAttribute('y2', 0);
}*/

//OLD
/*
class baseBlock extends HTMLElement{
    constructor(){
        super();

        this.inputs = [];
        this.outputs = [];

        this.private = { 
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 },
            function: null,
            inputside: null,
            outputside: null,
            canResize: true
        };

        let inputSide = document.createElement('div');
        inputSide.classList.add('input-side');
        this.private.inputside = inputSide;

        let outputSide = document.createElement('div');
        outputSide.classList.add('output-side');
        this.private.outputside = outputSide;
    }

    setFunction(func) {
        this.private.function = func;

        let funcasstring = func.toString();
        let funcname = funcasstring.substring(funcasstring.indexOf(' ') + 1, funcasstring.indexOf('('));
        let funcargs = funcasstring.substring(funcasstring.indexOf('(') + 1, funcasstring.indexOf(')'));

        let args = funcargs.split(',');
        args.forEach(element => {
            this.addInput(element);
        });

        this.addOutput('out');
    }

    addInput(name, id) {
        if(id == undefined) {
            id = Math.round(Math.random() * 1000000000);
        }
        
        let input = document.createElement('div');
        input.classList.add('block-input');

        let targetPoint = document.createElement('div');
        targetPoint.classList.add('target-point');
        targetPoint.id = 'tp_' + id;
        input.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        input.appendChild(tx);

        targetPoint.addEventListener('mousedown', (e) => {
            console.log('mousedown' + targetPoint.id);
            e.stopPropagation();
            e.stopImmediatePropagation();

            selectedTarget = targetPoint;
            selectedTargetType = 'input';

            selectedTargetLocation.x = targetPoint.getBoundingClientRect().x;
            selectedTargetLocation.y = targetPoint.getBoundingClientRect().y;
        });

        targetPoint.addEventListener('mouseup', (e) => {
            if(selectedTargetType == 'output') {
                e.stopPropagation();
                e.stopImmediatePropagation();
                connections.push({ from: selectedTarget, to: targetPoint, html: createLine(selectedTarget, targetPoint) });
                selectedTarget = null;
                selectedTargetType = null;

                resetLine();
                //TODO add line
            }
        });

        this.private.inputside.appendChild(input);
        this.inputs.push({ name: name, id: id, element: targetPoint });
    }

    addOutput(name, id) {
        if(id == undefined) {
            id = Math.round(Math.random() * 1000000000);
        }

        let output = document.createElement('div');
        output.classList.add('block-output');

        let targetPoint = document.createElement('div');
        targetPoint.id = 'tp_' + id;
        targetPoint.classList.add('target-point');
        output.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        output.appendChild(tx);

        targetPoint.addEventListener('mousedown', (e) => {
            console.log('mousedown' + targetPoint.id);
            e.stopPropagation();
            e.stopImmediatePropagation();

            selectedTarget = targetPoint;
            selectedTargetType = 'output';

            selectedTargetLocation.x = targetPoint.getBoundingClientRect().x;
            selectedTargetLocation.y = targetPoint.getBoundingClientRect().y;
        });


        targetPoint.addEventListener('mouseup', (e) => {
            if(selectedTargetType == 'input') {
                e.stopPropagation();
                e.stopImmediatePropagation();
                connections.push({ from: selectedTarget, to: targetPoint, html: createLine(selectedTarget, targetPoint) });
                selectedTarget = null;
                selectedTargetType = null;
                resetLine();
                //TODO add line
            }
        });

        this.private.outputside.appendChild(output);
        this.outputs.push({ name: name, id: id, element: targetPoint });
    }

    connectedCallback() {
        this.classList.add('custom-block-base');

        let grabber = document.createElement('div');
        grabber.classList.add('grabber');
        grabber.title = 'Click to move';
        grabber.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>';
        this.appendChild(grabber);

        grabber.addEventListener('mousedown', (e) => {
            this.dragging = true;
            this.dragOffset = {
                x: e.clientX - this.position.x,
                y: e.clientY - this.position.y
            }
        });

        grabber.addEventListener('mousemove', (e) => {
            if(this.dragging) {
                this.setPosition(e.clientX - this.dragOffset.x, e.clientY - this.dragOffset.y);
            }
        });
                        
        
        grabber.addEventListener('mouseup', (e) => {
            this.dragging = false;
        });

        if(this.private.canResize) {
            console.log('can resize');
            let sizer = document.createElement('div');
            sizer.classList.add('sizer');
            sizer.title = 'Click to resize';
            this.appendChild(sizer);

            sizer.addEventListener('mousedown', (e) => {
                this.sizing = true;
                this.sizeOffset = {
                    x: e.clientX - this.size.width,
                    y: e.clientY - this.size.height
                }
            });

            document.addEventListener('mousemove', (e) => {
                if(this.sizing) {
                    this.setSize(e.clientX - this.sizeOffset.x, e.clientY - this.sizeOffset.y);
                }
            });

            document.addEventListener('mouseup', (e) => {
                this.sizing = false;
            });
        }


        this.appendChild(this.private.inputside);
        this.appendChild(this.private.outputside);
    }
}



class blockac extends HTMLElement{
    constructor(){
        super();

        this.inputs = [];
        this.outputs = [];

        this.private = { 
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 },
            function: null,
            inputside: null,
            outputside: null
        };

        let inputSide = document.createElement('div');
        inputSide.classList.add('input-side');
        this.private.inputside = inputSide;

        let outputSide = document.createElement('div');
        outputSide.classList.add('output-side');
        this.private.outputside = outputSide;
    }

    setSize(width, height) {
        console.log(width, height);
        this.private.size.width = width;
        this.private.size.height = height;
        this.style.setProperty('--block-width', width + 'px');
        this.style.setProperty('--block-height', height + 'px');
    }

    setPosition(x, y) {
        console.log(x, y);
        this.private.position.x = x;
        this.private.position.y = y;
        
        this.style.setProperty('--block-pos-x', x + 'px');
        this.style.setProperty('--block-pos-y', y + 'px');
    }

    get position() {
        return this.private.position;
    }
    get size() {
        return this.private.size;
    }

    setFunction(func) {
        this.private.function = func;

        let funcasstring = func.toString();
        let funcname = funcasstring.substring(funcasstring.indexOf(' ') + 1, funcasstring.indexOf('('));
        let funcargs = funcasstring.substring(funcasstring.indexOf('(') + 1, funcasstring.indexOf(')'));

        let args = funcargs.split(',');
        args.forEach(element => {
            this.addInput(element);
        });

        this.addOutput('out');
    }

    addInput(name, id) {
        if(id == undefined) {
            id = Math.round(Math.random() * 1000000000);
        }
        
        let input = document.createElement('div');
        input.classList.add('block-input');

        let targetPoint = document.createElement('div');
        targetPoint.classList.add('target-point');
        targetPoint.id = 'tp_' + id;
        input.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        input.appendChild(tx);

        targetPoint.addEventListener('mousedown', (e) => {
            console.log('mousedown' + targetPoint.id);
            e.stopPropagation();
            e.stopImmediatePropagation();

            selectedTarget = targetPoint;
            selectedTargetType = 'input';

            selectedTargetLocation.x = targetPoint.getBoundingClientRect().x;
            selectedTargetLocation.y = targetPoint.getBoundingClientRect().y;
        });

        targetPoint.addEventListener('mouseup', (e) => {
            if(selectedTargetType == 'output') {
                e.stopPropagation();
                e.stopImmediatePropagation();
                connections.push({ from: selectedTarget, to: targetPoint, html: createLine(selectedTarget, targetPoint) });
                selectedTarget = null;
                selectedTargetType = null;

                resetLine();
                //TODO add line
            }
        });

        this.private.inputside.appendChild(input);
        this.inputs.push({ name: name, id: id, element: targetPoint });
    }

    addOutput(name, id) {
        if(id == undefined) {
            id = Math.round(Math.random() * 1000000000);
        }

        let output = document.createElement('div');
        output.classList.add('block-output');

        let targetPoint = document.createElement('div');
        targetPoint.id = 'tp_' + id;
        targetPoint.classList.add('target-point');
        output.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        output.appendChild(tx);

        targetPoint.addEventListener('mousedown', (e) => {
            console.log('mousedown' + targetPoint.id);
            e.stopPropagation();
            e.stopImmediatePropagation();

            selectedTarget = targetPoint;
            selectedTargetType = 'output';

            selectedTargetLocation.x = targetPoint.getBoundingClientRect().x;
            selectedTargetLocation.y = targetPoint.getBoundingClientRect().y;
        });

        targetPoint.addEventListener('mouseup', (e) => {
            if(selectedTargetType == 'input') {
                e.stopPropagation();
                e.stopImmediatePropagation();
                connections.push({ from: selectedTarget, to: targetPoint, html: createLine(selectedTarget, targetPoint) });
                selectedTarget = null;
                selectedTargetType = null;
                resetLine();

                //TODO add line
            }
        });

        this.private.outputside.appendChild(output);
        this.outputs.push({ name: name, id: id, element: targetPoint });
    }

    connectedCallback() {
        

        

        let sizer = document.createElement('div');
        sizer.classList.add('sizer');
        sizer.title = 'Click to resize';
        this.appendChild(sizer);

        sizer.addEventListener('mousedown', (e) => {
            this.sizing = true;
            this.sizeOffset = {
                x: e.clientX - this.size.width,
                y: e.clientY - this.size.height
            }
        });

        document.addEventListener('mousemove', (e) => {
            if(this.sizing) {
                this.setSize(e.clientX - this.sizeOffset.x, e.clientY - this.sizeOffset.y);
            }
        });

        document.addEventListener('mouseup', (e) => {
            this.sizing = false;
        });


        this.appendChild(this.private.inputside);
        this.appendChild(this.private.outputside);
    }
}

customElements.define('block-element', blockac);


class inBlock extends HTMLElement{
    constructor(){
        super();

        this.outputs = [];

        this.private = { 
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 },
            value: null,
            valueType: null,
            outputside: null
        };

        let outputSide = document.createElement('div');
        outputSide.classList.add('output-side');
        this.private.outputside = outputSide;
    }

    setSize(width, height) {
        console.log(width, height);
        this.private.size.width = width;
        this.private.size.height = height;
        this.style.setProperty('--block-width', width + 'px');
        this.style.setProperty('--block-height', height + 'px');
    }

    setPosition(x, y) {
        console.log(x, y);
        this.private.position.x = x;
        this.private.position.y = y;
        
        this.style.setProperty('--block-pos-x', x + 'px');
        this.style.setProperty('--block-pos-y', y + 'px');
    }

    get position() {
        return this.private.position;
    }
    get size() {
        return this.private.size;
    }

    addOutput(name, id) {
        if(id == undefined) {
            id = Math.round(Math.random() * 1000000000);
        }

        let output = document.createElement('div');
        output.classList.add('block-output');

        let targetPoint = document.createElement('div');
        targetPoint.id = 'tp_' + id;
        targetPoint.classList.add('target-point');
        output.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        output.appendChild(tx);

        targetPoint.addEventListener('mousedown', (e) => {
            console.log('mousedown' + targetPoint.id);
            e.stopPropagation();
            e.stopImmediatePropagation();

            selectedTarget = targetPoint;
            selectedTargetType = 'output';

            selectedTargetLocation.x = targetPoint.getBoundingClientRect().x;
            selectedTargetLocation.y = targetPoint.getBoundingClientRect().y;
        });

        targetPoint.addEventListener('mouseup', (e) => {
            if(selectedTargetType == 'input') {
                e.stopPropagation();
                e.stopImmediatePropagation();
                connections.push({ from: selectedTarget, to: targetPoint, html: createLine(selectedTarget, targetPoint) });
                selectedTarget = null;
                selectedTargetType = null;
                resetLine();

                //TODO add line
            }
        });

        this.private.outputside.appendChild(output);
        this.outputs.push({ name: name, id: id, element: targetPoint });
    }

    connectedCallback() {
        if(JSON.stringify(this.private.size) == JSON.stringify({ width: 0, height: 0 })) {
            this.setSize(160, 110);
        }
        if(JSON.stringify(this.private.position) == JSON.stringify({ x: 0, y: 0 })) {
            this.setPosition(100, 100);
        }

        let grabber = document.createElement('div');
        grabber.classList.add('grabber');
        grabber.title = 'Click to move';
        grabber.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>';
        this.appendChild(grabber);

        grabber.addEventListener('mousedown', (e) => {
            this.dragging = true;
            this.dragOffset = {
                x: e.clientX - this.position.x,
                y: e.clientY - this.position.y
            }
        });

        document.addEventListener('mousemove', (e) => {
            if(this.dragging) {
                this.setPosition(e.clientX - this.dragOffset.x, e.clientY - this.dragOffset.y);
                connections.forEach(connection => {
                    this.outputs.map(input => input.element).forEach(element => {
                        if(element == connection.to) {
                            connection.html.setAttribute('x2', element.getBoundingClientRect().x + element.getBoundingClientRect().width / 2);
                            connection.html.setAttribute('y2', element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2);
                        }

                        if(element == connection.from) {
                            connection.html.setAttribute('x1', element.getBoundingClientRect().x + element.getBoundingClientRect().width / 2);
                            connection.html.setAttribute('y1', element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2);
                        }
                    })
                })
            }
        });

        document.addEventListener('mouseup', (e) => {
            this.dragging = false;
        });

        let sizer = document.createElement('div');
        sizer.classList.add('sizer');
        sizer.title = 'Click to resize';
        this.appendChild(sizer);

        sizer.addEventListener('mousedown', (e) => {
            this.sizing = true;
            this.sizeOffset = {
                x: e.clientX - this.size.width,
                y: e.clientY - this.size.height
            }
        });

        document.addEventListener('mousemove', (e) => {
            if(this.sizing) {
                this.setSize(e.clientX - this.sizeOffset.x, e.clientY - this.sizeOffset.y);
            }
        });

        document.addEventListener('mouseup', (e) => {
            this.sizing = false;
        });

        this.appendChild(this.private.outputside);
        this.addOutput('out');
    }
}

class blockB extends baseBlock {
    constructor() {
        super();
    }

    connectedCallback() {
        super.init(100, 100, 200, 140, false);

        super.connectedCallback();
        this.setFunction((a, b) => {
            return a + b;
        });
    }

}


customElements.define('block-b', blockB);

customElements.define('block-input', inBlock);



class baseEvent extends HTMLElement {
    constructor() {
        super();
        this._event = null;
        this._inited = false;
        this._callback = null;
        this._targetElement = null;

        this._size = {x: 0, y: 0};
        this._position = {x: 0, y: 0};

        this._displayName = 'Base Event';
        this._displayHtml = document.createElement('h2');
        this._displayHtml.innerHTML = this._displayName;
    }

    init(eventType, callback, targetElement) {
        this._event = eventType;
        this._callback = callback;
        this._targetElement = targetElement;
        this._inited = true;
    }

    call() {
        if(this._inited) {

        }
    }

    get event() {
        return this._event;
    }

    set event(value) {
        this._event = value;
    }

    set size(value) {
        this._size = value;
        this.style.setProperty('--block-width', this._size.x + 'px');
        this.style.setProperty('--block-height', this._size.y + 'px');
    }
    get size() {
        return this._size;
    }

    set position(value) {
        this._position = value;
        this.style.setProperty('--block-pos-x', this._position.x + 'px');
        this.style.setProperty('--block-pos-y', this._position.y + 'px');
    }

    get position() {
        return this._position;
    }

    set displayName(value) {
        this._displayHtml.innerHTML = value;
        this._displayName = value;
    }

    get displayName() {
        return this._displayName;
    }

    connectedCallback() {
        this.classList.add('custom-base-event');
        if(this.size.x == 0 && this.size.y == 0) {
            this.size = {x: 100, y: 100};
        }
        if(this.position.x == 0 && this.position.y == 0) {
            this.position = {x: 100, y: 100};
        }

        this.appendChild(this._displayHtml);

        let targetPoint = document.createElement('div');
        targetPoint.classList.add('target-point');
        this.appendChild(targetPoint);
    }
}

customElements.define('base-event', baseEvent);*/