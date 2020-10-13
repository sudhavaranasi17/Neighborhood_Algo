
// sample row column size: 7 7
//Sample Matrix
// 1 1 1 0 1 0 1
// 0 0 1 1 0 1 0
// 0 0 1 1 1 0 0
// 0 0 0 0 0 0 1
// 0 0 1 1 0 0 0
// 0 0 1 1 1 0 0
// 0 0 0 0 0 0 1
function setX() {
    document.getElementById('xy').setAttribute('rows', parseInt(document.getElementById('rows').value) + 1);
}
function setY() {
    document.getElementById('xy').setAttribute('cols', parseInt(document.getElementById('cols').value)+ 2);
}
function findPath() {
    let paths = new Array();
    //rows and columns
    var r = parseInt(document.getElementById('rows').value);
    document.getElementById('rows').innerText = r;
    var c = parseInt(document.getElementById('cols').value);
    document.getElementById('cols').value = c;
    var arr = document.getElementById('xy').value.split('\n');
    document.getElementById('xy').innerText = arr;
    //new 2D Array
    var map = new Array(r + 2);
    if (r >= 1 && c <= 10) {
        //Initialize the new Array to 0
        for (let i = 0; i < r + 2; i++) {
            map[i] = new Array(c + 2).fill(parseInt(0));
        }
        //Copy values to the middle
        for (let i = 0; i < r; i++) {
            var line = arr[i].split(' ');
            for (let j = 0; j < c; j++) {
                map[i + 1][j + 1] = parseInt(line[j]);
            }
        }
        console.log(map);

        for (i = 1; i <= r; i++) {
            for (j = 1; j <= c; j++) {
                var group = new Array();
                if (map[i][j] != 0) {
                    if (!group.includes(i + " " + j))
                        group.push(i + " " + j);
                    //right
                    if (map[i][j + 1] != 0) {
                        if (!group.includes(i + " " + (j + 1)))
                            group.push(i + " " + (j + 1));
                    }
                    //left
                    if (map[i][j - 1] != 0) {
                        if (!group.includes(i + " " + (j - 1)))
                            group.push(i + " " + (j - 1));
                    }
                    //bottom
                    if (map[i + 1][j] != 0) {
                        if (!group.includes((i + 1) + " " + j))
                            group.push((i + 1) + " " + j);
                    }
                    //top
                    if (map[i - 1][j] != 0) {
                        if (!group.includes((i - 1) + " " + j))
                            group.push((i - 1) + " " + j);
                    }
                    //bottom right
                    if (map[i + 1][j + 1] != 0) {
                        if (!group.includes((i + 1) + " " + (j + 1)))
                            group.push((i + 1) + " " + (j + 1));
                    }
                    //bottom left
                    if (map[i + 1][j - 1] != 0) {
                        if (!group.includes((i + 1) + " " + (j - 1)))
                            group.push((i + 1) + " " + (j - 1));
                    }
                    //top right
                    if (map[i - 1][j + 1] != 0) {
                        if (!group.includes((i - 1) + " " + (j + 1)))
                            group.push((i - 1) + " " + (j + 1));
                    }
                    //top left
                    if (map[i - 1][j - 1] != 0) {
                        if (!group.includes((i - 1) + " " + (j - 1)))
                            group.push((i - 1) + " " + (j - 1));
                    }
                    //sort by position
                    paths.push(group.sort());
                }
            }
        }
        findBelt(paths);
    }

    //sort by length (optional)
    paths = paths.sort((a, b) => b.length - a.length);
    //remove duplicates
    paths = paths.map(JSON.stringify).reverse().filter(function (e, i, a) { return a.indexOf(e, i + 1) === -1 }).reverse().map(JSON.parse);
    //console.log(paths);
    function findBelt(paths) {
        for (let i = 0; i < paths.length - 1; i++) {
            var copy = new Array();
            var copy = paths[i];
            for (let j = 0; j < paths[i].length; j++) {
                for (let k = i + 1; k < (paths.length - i); k++) {
                    for (let l = 0; l < paths[k].length; l++) {
                        if (paths[k][l] == paths[i][j]) {
                            copy = copy.concat(paths[k]);
                            copy = copy.filter((el, i) => { return (copy).indexOf(el) == i });
                            paths[i] = copy;
                            //console.log(paths[i]);
                            break;
                        }
                    }
                }
            }
        }
    }

    console.log(paths);
    //get max
    console.log(Math.max(...(paths.map(el => el.length))));
    document.getElementById('largest').innerText = Math.max(...(paths.map(el => el.length)));
    //get min
    console.log(Math.min(...(paths.map(el => el.length))));
    document.getElementById('smallest').innerText = Math.min(...(paths.map(el => el.length)));
}
