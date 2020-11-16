const gridContainer = document.querySelector('.gridContainer');
const inputSize = document.getElementById('gridSize');
const resetButton = document.getElementById('resetButton');
const sizeInfo = document.getElementById('sizeInfo');
const rainbowMode = document.getElementById('rainbow');
const blackWhiteMode = document.getElementById('blackWhite');
const pinkMode = document.getElementById('pink');
const cellBorders = document.getElementById('cellBorders');
let cells;
let mode = blackWhite;

creategrid(16);
getInput();

function creategrid(gridSize) {

    for (let i = 1; i <= gridSize ** 2; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-gradient', '100');
        cell.addEventListener('mouseenter', mode);
        cell.setAttribute('style', 'background-color: white; border-style: solid; border-color: black; border-width: ' + cellBorder(i, gridSize, cell));
        gridContainer.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
}

function changeGrid(gridSize) {
    gridContainer.setAttribute('style', `grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr)`);
    destroyGrid();
    creategrid(gridSize);
}

function getInput() {
    inputSize.addEventListener('input', e => {
        changeGrid(+e.target.value);
        sizeInfo.innerText = e.target.value;
    })

    rainbowMode.addEventListener('change', () => setMode(rainbow));
    blackWhiteMode.addEventListener('change', () => setMode(blackWhite));
    pinkMode.addEventListener('change', () => setMode(pink));
    resetButton.addEventListener('click', resetGrid);
    cellBorders.addEventListener('change', setBorders)
}

function destroyGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function resetGrid() {
    cells.forEach(cell => cell.style.backgroundColor = 'white');
}

function setBorders(e) {
    if(e.target.checked){
       let cells = document.getElementsByClassName('cell');
       for(let i = 0; i<cells.length; i++){
        cells[i].style.border = '1px solid black';
        cells[i].style.borderWidth = cellBorder(i+1, Math.sqrt(cells.length));
    }
}
    else{
        cells.forEach(cell => cell.style.border = 'none');
    }
}

function blackWhite(e) {
    e.target.style.backgroundColor = 'black';
    e.target.dataset.gradient = '100';
}

function rainbow(e) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    e.target.dataset.gradient = '100';
}

function pink(e) {
    if(+e.target.dataset.gradient !== 0){
        e.target.style.backgroundColor = `hsl(319, 39%, ${e.target.dataset.gradient - 10}%)`;
        e.target.dataset.gradient = e.target.dataset.gradient - 10;
    }
}

function setMode(chosenMode) {
    cells.forEach(
        cell => {
            cell.removeEventListener('mouseenter', mode);
            cell.addEventListener('mouseenter', chosenMode);
        })
    mode = chosenMode
}

function cellBorder(i, gridSize){
    if (i === gridSize ** 2) {
        return '0';
    }
    else if (i % gridSize === 0) {
       return '0 0 1px 0';
    }
    else if (i > gridSize * (gridSize - 1)) {
        return '0 1px 0 0';
    }
    else {
        return '0 1px 1px 0';
    }
}