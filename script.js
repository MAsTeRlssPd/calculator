const add = function(a,b) {
	return a+b;
};

const subtract = function(a,b) {
	return a-b;
};

const multiply = function(arr) {
    return arr.reduce((prev,item) => prev*item, 1);
};

const power = function(a,b){
    return a**b;
}

function calculate(expression){
    const tokens = expression.match(/(\d+\.?\d*|[+\-*/%^])/g);
    if (!tokens) return "ERROR";

    let numbers = tokens.filter((_,i) => i % 2 ==0).map(Number);
    let operators = tokens.filter((_,i) => i % 2 ==1);

    for(let i=0;i<operators.length;i++){
        if(operators[i] == "^"){
            const result = power(numbers[i],numbers[i+1]);
            numbers.splice(i,2,result);
            operators.splice(i,1);
            i--;
        }
    }

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "*" || operators[i] === "/") {
            const result = operators[i] === "*"
                ? multiply([numbers[i], numbers[i + 1]])
                : numbers[i] / numbers[i + 1];
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }

    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") result = add(result, numbers[i + 1]);
        if (operators[i] === "-") result = subtract(result, numbers[i + 1]);
    }

    return result;
}



const labels = [
    "AC", "^", "%", "/",
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', 'del', '=',
]

let output = document.querySelector(".output");
let expression = "";

let input = document.querySelector(".input");
for(let i=0;i<labels.length;i++){
    let box = document.createElement("button");
    box.classList.add("square-box");
    box.textContent = labels[i];
    input.appendChild(box);
    box.addEventListener("click", ()=> {
        const val = box.textContent;
        if(val == "AC") expression = "";
        else if(val == "del") expression = expression.slice(0,-1);
        else if(val == "%"){
            try {
            expression = String(parseFloat(expression) / 100);
        } catch {
            expression = "ERROR";
        }
        }
        else if(val == "="){
            try {
            expression = String(calculate(expression));
        } catch {
            expression = "ERROR";
        }
        }
        else expression += val;
        output.textContent = expression;

    })
}