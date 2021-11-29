var nums = 10;

var grid = document.getElementById("container")

var arNum = []

for(var i=0;i<nums;i++){
    var val = Math.trunc(Math.random()*100);
    arNum.push(val)
    
    div = document.createElement("div")
    div.classList.add("nums")
    div.style.height = val+"%"

    grid.append(div)

}