let output = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
buttons.forEach(button => {
    button.addEventListener('click', () =>{
        if(button.innerHTML == '='){
            string = eval(string);
            output.value = string;
        }

        else if(button.innerHTML == 'AC'){
            string = "";
            output.value = string;
        }
        else if(button.innerHTML == 'DEL'){
            string = string.substring(0, string.length-1);
            output.value = string;
        }
        else{
            string += button.innerHTML;
            output.value = string;
        }
        
    })
})