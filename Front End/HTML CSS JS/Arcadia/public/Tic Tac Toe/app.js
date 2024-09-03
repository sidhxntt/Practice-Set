const buttons=document.querySelectorAll("button");
let turnO =  true; //true is O and false is X

buttons.forEach(button => {
    button.addEventListener('click', function(){
         playgame(button);
    })
});

const winning_patterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]

function playgame(button){
    if(turnO){
        button.innerText='O';
        turnO=false;
        button.disabled = true;
        checkwinner();
    }else{
        button.innerText='X';
        turnO=true;
        button.disabled = true;
        checkwinner();
    }

}
function  checkwinner() {
    for(let patterns of  winning_patterns){
        let pos1=buttons[patterns[0]].innerText;
        let pos2=buttons[patterns[1]].innerText;
        let pos3=buttons[patterns[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                setTimeout(() => {
                        alert("Winner")
                        location.reload();
                }, 500);
            
            }
        }
    }
} 