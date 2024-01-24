/* */
function showQuickMenu() {
    document.getElementById('searchBar').value = '';
    document.getElementById('quickMenu').classList.add('show');
}
function hideQuickMenu() {
    document.getElementById('quickMenu').classList.remove('show');
}
// new
function createGrabber(Parenthtml, callbackOnMove) {
    let grabber = document.createElement('div');
    grabber.classList.add('grabber');
    grabber.title = 'Click to move';
    grabber.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>';
    
    let dragging = false;
    let dragOffset = { x: 0, y: 0 };
    grabber.addEventListener('mousedown', (e) => {
        dragging = true;
        dragOffset = {
            x: e.clientX - Parenthtml.position.x,
            y: e.clientY - Parenthtml.position.y
        }
    });

    document.addEventListener('mousemove', (e) => {
        if(dragging) {
            Parenthtml.setPosition(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
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
function createLine(html1, position2, color) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    document.getElementById('lines').appendChild(svg);

    var line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.appendChild(line);

    line.setAttribute('x1', html1.getBoundingClientRect().x + html1.getBoundingClientRect().width / 2);
    line.setAttribute('y1', html1.getBoundingClientRect().y + html1.getBoundingClientRect().height / 2);
    line.setAttribute('x2', position2.x);
    line.setAttribute('y2', position2.y);

    line.style.stroke = color;
    line.style.fill = 'transparent';
    line.style.strokeWidth = '4px';

    return { line: line, svg: svg };
}

function updateLine(line, position2) {
    let startPoint = { x: line.getAttribute('x1'), y: line.getAttribute('y1') };
    let endPoint = position2;

    let secondPoint = { x: startPoint.x - ((startPoint.x - endPoint.x) * 0.3), y: startPoint.y };
    let thirdPoint = { x: startPoint.x - ((startPoint.x - endPoint.x) * 0.7), y: endPoint.y };

    let path = `M ${startPoint.x},${startPoint.y} L ${secondPoint.x},${secondPoint.y} L ${thirdPoint.x},${thirdPoint.y} L ${endPoint.x},${endPoint.y}`;

    line.setAttribute('d', path);
}

let colorOptions = {
    'default': 'var(--data-point-base)',
    'timeline': 'var(--tunnel-point-base)',
    'string': 'rgb(0, 0, 150)',
    'any': 'rgb(113, 0, 0)',
    
}


//let connectors = [];
//let assocs = new Map();
let connectedPoints = [];

function addConnector(html, type) {
    let grabbing = false;
    let line = null;

    let removeConnection = () => {};

    html.addEventListener('mousedown', (e) => {
        if(grabbing) return;

        if(html.isConnected) {
            if(html.canRemoveConnection) return removeConnection();
            return;
        }

        grabbing = true;
        console.log(type);
        let selCol = colorOptions[type] || colorOptions['default'];
        line = createLine(html, { x: html.getCenter.x, y: html.getCenter.y }, selCol);
        line.line.classList.add('line');
        line.line.classList.add(type);
    });

    function mousemove(e) {
        if(!grabbing || line == null) return;

        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();

        var svgPoint = line.svg.createSVGPoint();
        svgPoint.x = e.clientX;
        svgPoint.y = e.clientY;
        var point = svgPoint.matrixTransform(line.svg.getScreenCTM().inverse());

        //line.line.setAttribute('x2', point.x);
        //line.line.setAttribute('y2', point.y);
        updateLine(line.line, point);
    }

    function mouseup(e) {
        if(!grabbing) return;
        grabbing = false;

        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        let finded = false;

        document.elementsFromPoint(e.clientX, e.clientY).forEach(element => {
            if(element.tagName == 'TARGET-POINT' && element != html) {
                if(element.isConnected && element._mode == 'single') return console.log('Already connected');
                if(element._way == html._way) return console.log('Wrong way');
                
                //check for types
                if(element._type == 'any' || html._type == 'any') {
                    
                }
                else if(element._type != html._type) return console.log('Wrong type');

                var svgPoint = line.svg.createSVGPoint();
                svgPoint.x = element.getCenter.x;
                svgPoint.y = element.getCenter.y;
                var point = svgPoint.matrixTransform(line.svg.getScreenCTM().inverse());

                //line.line.setAttribute('x2', point.x);
                //line.line.setAttribute('y2', point.y);
                updateLine(line.line, point);

                if(element._mode == 'single') element._connectedTo = html;
                else element._connectedTo.push(html);

                if(html._mode == 'single') html._connectedTo = element;
                else html._connectedTo.push(element);

                finded = true;
                connectedPoints.push({ from: html, to: element, line: line });

                //visuals
                if(html._mode == 'single') html.updateStlye();
                else html._connectedTo.forEach(el => el.updateStlye());

                if(element._mode == 'single') element.updateStlye();
                else element._connectedTo.forEach(el => el.updateStlye());

            }
        });

        if(!finded) {
            document.getElementById('lines').removeChild(line.svg);
        }

    }

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);

    removeConnection = () => {
        let connectionObj = connectedPoints.find(rela => rela.from == html || rela.to == html);
        if(connectionObj == undefined) throw new Error('Connection not found WTF????');

        let p1 = connectionObj.from == html ? connectionObj.to : connectionObj.from;
        let p2 = connectionObj.from == html ? connectionObj.from : connectionObj.to;

        function clearObj(b, removeAble) {
            if(b._mode == 'single') b._connectedTo = null;
            else if(b._mode == 'multi') {
                b._connectedTo = b._connectedTo.filter(el => el != removeAble);
            }
        }

        clearObj(p1, p2);
        clearObj(p2, p1);
        document.getElementById('lines').removeChild(connectionObj.line.svg);

        connectedPoints = connectedPoints.filter(connection => connection != connectionObj);

        //visuals
        if(p1._mode == 'single') p1.updateStlye();
        else p1._connectedTo.forEach(el => el.updateStlye());

        if(p2._mode == 'single') p2.updateStlye();
        else p2._connectedTo.forEach(el => el.updateStlye());
    }
}

function updateConnections() {
    connectedPoints.forEach(connection => {
        connection.line.line.setAttribute('x1', connection.from.getCenter.x);
        connection.line.line.setAttribute('y1', connection.from.getCenter.y);
        //connection.line.line.setAttribute('x2', connection.to.getCenter.x);
        //connection.line.line.setAttribute('y2', connection.to.getCenter.y);
        updateLine(connection.line.line, { x: connection.to.getCenter.x, y: connection.to.getCenter.y });
    });
}

let Logger = document.getElementsByClassName('Logs')[0];
let CustomEnvirement = {};

CustomEnvirement.log = (strin) => {
    let log = document.createElement('p');
    log.innerText = strin;
    Logger.appendChild(log);
}

CustomEnvirement.getRoot = () => {
    return document.getElementById('Playground');
}