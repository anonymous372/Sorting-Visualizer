var nums = 50;
var delay = 15;

var grid = document.getElementById("container")

var arNum = []
arNum = Array(nums).fill(0); 

var sortingDone = true; 

var rangeBar = document.getElementById("rangeBar");
var rangeText = document.getElementById('rangeText');

rangeBar.value = nums;
rangeText.innerText = nums;

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

function mergeSort(){
    merge_sort(0,nums-1);
    async function merge_sort(start, end){
        if(start === end) return;
        var middle = Math.floor((start+end)/2);
        
        await merge_sort(start,middle);
        await merge_sort(middle+1,end);
        
        await merge_arrays(start,middle,end);
    }
    async function merge_arrays(start,middle,end){
        for( var i=0;i<=middle;i++){
            var j = middle+1;
            if(arNum[i]>arNum[j]){
                show_cur(i,j);
                
                swap(i,j);

                update();
                await sleep(delay);
                show_cur(i,j);

                for(var k=j+1;k<=end;k++){
                    if(arNum[j]>arNum[k]){
                        show_cur(k,j);
                        
                        swap(j,k);

                        update();
                        await sleep(delay);
                        show_cur(k,j);
                        
                        j++;
                    }
                    else
                        break;
                }
            }
        }
    }
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
    nums = rangeBar.value;
    rangeText.innerText = nums;
}
// delay button
var speedBtns = document.querySelectorAll('.speed');
var speeds=[200,50,5];
function press(val){
    delay = speeds[val];
    for(var i=0;i<3;i++)
        if(val==i)
            speedBtns[i].classList.add("selected-speed");
        else
            speedBtns[i].classList.remove("selected-speed");

}
//
function main(){
    if(!sortingDone) return; 

    sortingDone = false;
    initialize();
    // selectionSort();
    // bubbleSort();
    // insertionSort();
    mergeSort();
    sortingDone = true;
}
function startup(){

}
// main();