
class ioblock extends block {
    #inputSideDiv = document.createElement('div');
    #outputSideDiv = document.createElement('div');
    constructor() {
        super();

        this._inputs = [];
        this._outputs = [];
    }

    /**
     * @param {string} name 
     * @param {data|timeline} type 
     * @param {string[]} additionalTags 
     */
    addInput(name, type, additionalTags) {
        if(this._inputs.find(input => input.name == name) != undefined) throw new Error('Input already exists CompileTimeError');

        let input = document.createElement('div');
        input.classList.add('block-input');

        let targetPoint = document.createElement('target-point');
        targetPoint.init(this, 'input', type, 'single', additionalTags);
        input.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        input.appendChild(tx);

        this.#inputSideDiv.appendChild(input);

        this._inputs.push({ name: name, element: targetPoint });
    }

    /**
     * @param {string} name 
     * @param {string} type 
     * @param {boolean} isMulti 
     * @param {string[]} additionalTags 
     */
    addOutput(name, type, isMulti, additionalTags) {
        let output = document.createElement('div');
        output.classList.add('block-output');
        
        let targetPoint = document.createElement('target-point');
        targetPoint.init(this, 'output', type, (isMulti == undefined || isMulti == true ? 'multi' : 'single'), additionalTags);
        output.appendChild(targetPoint);

        let tx = document.createElement('p');
        tx.innerText = name;
        output.appendChild(tx);

        this.#outputSideDiv.appendChild(output);

        this._outputs.push({ name: name, element: targetPoint });
    }

    /**
     * @param {string} name 
     * @returns object
     */
    getValue(name) {
        let input = this._inputs.find(input => input.name == name);
        if(input == undefined) throw new Error('Input does not exist CompileTimeError');

        if(input.element._connectedTo == null) throw new Error('Input is not connected CompileTimeError');

        return input.element._connectedTo._parent.getValue('out');
    }

    connectedCallback() {
        this.classList.add('io-block');

        let grabber = createGrabber(this, updateConnections);
        this.appendChild(grabber);

        this.#inputSideDiv.classList.add('input-side');
        this.appendChild(this.#inputSideDiv);

        this.#outputSideDiv.classList.add('output-side');
        this.appendChild(this.#outputSideDiv);
    }
}