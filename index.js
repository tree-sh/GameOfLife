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

function executeGame(){
    const grid = document.getElementById('grid');
    const rows = Array.from(grid.getElementsByTagName('tr'));
    const matrix = [];
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
    console.log(matrix);
}