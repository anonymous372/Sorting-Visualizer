var nums = 15;
var delay = 100;

var grid = document.getElementById("container")

var arNum = []
arNum = Array(nums).fill(0); 

var sortingDone = true; 
//

// ******************* Functions *********************** 

function initialize(){
    grid.innerHTML= "";

    set_array();
    create_elements()
}

function reset(){
    set_array();
    update();
}

function set_array(){
    for (var i = 0; i < nums; i++) {
        var val = Math.trunc(Math.random() * 100);
        arNum[i] = val;
    }
}

function create_elements(){
    for (var i = 0; i < nums; i++) {
        div = document.createElement("div")
        div.classList.add("nums")
        div.style.height = arNum[i] + "%"
        div.style.width = 60/nums + "%"
    
        grid.append(div)
    }   
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
    sortingDone=true;
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
    sortingDone=true;
}

async function insertionSort(){
    for(var i=1; i<nums; i++){
        
        var j = i-1;
        var temp = arNum[i];

        if(temp < arNum[j]){
            while(j>=0 && temp < arNum[j]){
                show_cur(j,j+1);
                swap(j,j+1);

                update();
                await sleep(delay);
                show_cur(j,j+1);                
                
                j--;
            }
        }
        else{
            show_cur(j,j+1);
            await sleep(delay);
            show_cur(j,j+1);   
        }
    }
    sortingDone=true;
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
function hideNseek(){
    nums = document.getElementById("range").value;
    document.getElementById('num').innerText = nums;
}

async function main(){
    if(!sortingDone) return; 

    sortingDone=false;
    initialize();
    insertionSort();
}
function startup(){

}
// main();