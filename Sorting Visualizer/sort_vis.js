var nums = 50;
var delay = 50;

var grid = document.getElementById("container")

var arNum = []

for (var i = 0; i < nums; i++) {
    var val = Math.trunc(Math.random() * 100);
    arNum.push(val)

    div = document.createElement("div")
    div.classList.add("nums")
    div.style.height = val + "%"
    div.style.width = 60/nums + "%"

    grid.append(div)
}

// The delay/sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(i,j){
    [arNum[i], arNum[j]] = [arNum[j], arNum[i]]
}

// Simple bubble sort
async function bubbleSort() {
    for (var i = 0; i < nums; i++){
        for (var j = i+1; j < nums; j++) {
            show_cur(i,j)
            if (arNum[i] > arNum[j])
                swap(i,j)    
            
            update();
            await sleep(delay);
            show_cur(i,j);
        }
    }
}

async function selectionSort() {
    for (var i = 0; i < nums; i++){
        var curMin = i;
        for (var j = i+1; j < nums; j++) {
            show_cur(i,j)
            if (arNum[curMin] > arNum[j])
                curMin = j
            
            await sleep(delay);
            show_cur(i,j);
        }
        swap(i,curMin);
        update();
    }
}

async function insertionSort(){
}

async function mergeSort(){
}

async function quickSort(){
}


function show_cur(i,j){
    var numbs = document.querySelectorAll(".nums");
    
    numbs[i].classList.toggle("cur_num")
    numbs[j].classList.toggle("cur_num")
}

function update() {
    var numbs = document.querySelectorAll(".nums");
    for (var i = 0; i < nums; i++) {
        numbs[i].style.height = arNum[i] + "%";
    }
}

bubbleSort();
// selectionSort();