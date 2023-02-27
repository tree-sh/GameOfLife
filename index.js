var lastClicked;
var grid = clickableGrid(20,10, function(el,row,col,i){
    el.className === "clicked" ? el.className = "" : el.className = "clicked";
});

document.body.appendChild(grid);
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.id = 'grid';
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.style.padding = '25px';
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

function implementRules(matrix) {
    const resultMatrix = [];
    for(i = 0; i < matrix.length; i++) {
        const row = [];
        for (j = 0; j < matrix[i].length; j++){
            const rightCell = (j < matrix[i].length - 1 && matrix[i][j+1] === true);
            const leftCell = (j > 0 && matrix[i][j-1] === true);
            const downCell = (i > 0 && matrix[i-1][j] === true);
            const upCell = (i < matrix.length - 1 && matrix[i+1][j] === true);
            const upperRightCell = (i > 0 && j < matrix[i].length - 1 && matrix[i-1][j+1]);
            const lowerRightCell = (i < matrix.length -1 && j < matrix[i].length - 1 && matrix[i+1][j+1]);
            const upperLeftCell = (i > 0 && j < matrix[i].length - 1 && matrix[i-1][j-1]);
            const lowerLeftCell = (i < matrix.length -1 && j < matrix[i].length - 1 && matrix[i+1][j-1]);

            const conditions = [rightCell, leftCell, downCell, upCell, upperLeftCell, upperRightCell, lowerLeftCell, lowerRightCell];

            const neighbors = conditions.filter(condition => condition === true).length;

            if(matrix[i][j] === false && neighbors === 3) {
                row.push(true)
            } else if(matrix[i][j] === true) {
                row.push(
                    ((neighbors <= 1 || neighbors >= 4) ? false : true)
                );
            } else {
                row.push(matrix[i][j]);
            }
        }
        resultMatrix.push(row);
    }
    return resultMatrix;
}

function executeGame(){
    const grid = document.getElementById('grid');
    const rows = Array.from(grid.getElementsByTagName('tr'));
    let matrix = [];
    rows.forEach((row) => {
        const matrixRow = [];
        const cols = Array.from(row.getElementsByTagName('td'));
        cols.forEach((col) =>{
            if(col.className.includes('clicked')){
                matrixRow.push(true);
            } else {
                matrixRow.push(false);
            }
        });
        matrix.push(matrixRow);
    });
    matrix = implementRules(matrix);
    document.body.removeChild(grid);
    
    var i=0;
    const newGrid = document.createElement('table');
    newGrid.id = 'grid';
    newGrid.className = 'grid';
    for (let r=0 ;r < matrix.length;++r){
        var tr = newGrid.appendChild(document.createElement('tr'));
        for (let c=0; c<matrix[r].length; ++c){
            const cell = tr.appendChild(document.createElement('td'));
            cell.style.padding = '25px';
            cell.className = (matrix[r][c] ? 'clicked' : '');
            cell.addEventListener('click',(function(el)
            {
                el.target.className === "clicked" ? el.target.className = "" : el.target.className = "clicked";
            }));
        }
    }
    document.body.removeChild(document.body.lastChild);
    document.body.appendChild(newGrid);
}