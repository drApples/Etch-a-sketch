const gridContainer = document.querySelector('.gridContainer');
creategrid(16);

function creategrid(gridSide) {

    for (let i = 1; i <= gridSide**2; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell')
        cell.addEventListener('mouseenter', e => e.target.style.backgroundColor = 'black')

        if(i === gridSide){
            cell.setAttribute('style', 'border: thin solid black');
        }
        else if(i % gridSide === 0){
           cell.setAttribute('style', 'border-bottom: thin solid black; border-left: thin solid black; border-right: thin solid black');
        }
        else if(i < gridSide){
            cell.setAttribute('style', 'border-bottom: thin solid black; border-left: thin solid black; border-top: thin solid black');
        }
        else{
            cell.setAttribute('style', 'border-bottom: thin solid black; border-left: thin solid black');
        }


        gridContainer.appendChild(cell);
    }
}