class targetPointCodeBlock extends HTMLElement {
    constructor() {
        super();
        this._connectedTo = null;
        this._parent = null;
        this._type = 'any';
        this._mode = 'single';
        this._way = 'input';
        this._additionalTags = [];

        this.updateStlye = () => {
            if(this.isConnected) {
                this.classList.add('connected');
            } else {
                this.classList.remove('connected');
            }
        }
    }

    /**
     * @returns {{x: number, y: number}}
     */
    get getCenter() {
        let rect = this.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    }
    /**
     * 
     * @param {Object} parent 
     * @param {input|output|any} way 
     * @param {data|timeline} type 
     * @param {single|multi} mode 
     * @param {string[]} additionalTags 
     */
    init(parent, way, type, mode, additionalTags) {
        addConnector(this, type);
        this._parent = parent;
        this._way = way;
        this._type = type;
        this.title = type;
        this._mode = mode;
        if(mode == 'multi') {
            this._connectedTo = [];
        }
        this._additionalTags = additionalTags;

        this.classList.add('type-' + type);
        if(this._type == 'timeline') this.classList.add('tunnel-point');
    }

    /**
     * @param {{parent: Element, way: input|output, type: any|<type>, mode: single|multi, additionalTags: [] }} Obj 
     */
    reinit(Obj) {
        if(Obj.parent != undefined) {
            this._parent = Obj.parent;
        }
        if(way != undefined) {
            this._way = Obj.way;
        }
        if(Obj.type != undefined) {
            this.classList.remove('type-' + this._type);
            if(this._type == 'timeline') this.classList.remove('tunnel-point');
            this._type = Obj.type;
            this.classList.add('type-' + Obj.type);
        }
        if(Obj.mode != undefined) {
            this._mode = Obj.mode;
        }
        if(Obj.additionalTags != undefined) {
            this._additionalTags.forEach(tag => this.classList.remove(tag));
            this._additionalTags = Obj.additionalTags;
            this._additionalTags.forEach(tag => this.classList.add(tag));
        }
    }

    get isConnected() {
        if(this._mode == 'single') {
            return this._connectedTo != null;
        } else {
            return this._connectedTo.length > 0;
        }
    }

    get canRemoveConnection() {
        if(this._mode == 'single') {
            return this._connectedTo != null;
        } else {
            return this._connectedTo.length == 1;
        }
    }

    connectedCallback() {
        this.classList.add('target-point');
        this.additionalTags?.forEach(tag => this.classList.add(tag));
    }
}
customElements.define('target-point', targetPointCodeBlock);