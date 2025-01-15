// WHILE LOOP -> Until condition is falsy do it
let i = 0;

while (i < 3) { 
  console.log( i );
  i++;
}

// DO WHILE -> This form of syntax should only be used when you want the body of the loop to execute at least once regardless of the condition being truthy. Usually, the other form is preferred: while(…) {…}.

let j = 0
do {
    console.log( j );
    j++;
  } while (j < 3);

// FOR LOOP -> Usually for ranges
for (let i = 0; i < 3; i++) { 
    console.log(i);
  }