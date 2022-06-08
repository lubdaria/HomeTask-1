let numbers = '2+5*3*2*2-10/2+7';

let result = outputArray(numbers);
validateArray(result);
let calculator = calcNumber(result);

let num = findSumNumberPlusMinus(calculator.operands, calculator.operators);
console.log(num);

function outputArray(number){
  const operators = [];
  const operands = [];
  let anyNumbers = '';

  for (let i = 0; i < number.length; i++){
    let iteam = number[i];

    if(searchOperators(iteam)){
      if(anyNumbers){
        operands.push(Number(anyNumbers));
      }
      anyNumbers = '';
      operators.push(iteam);
    }
    else if(searchOperands(iteam)){
      anyNumbers = anyNumbers + iteam;
    }
  }
  if(anyNumbers){
    operands.push(Number(anyNumbers));
  }
  
  return {operands, operators};
}

function searchOperators(iteam){
  return iteam === '+' || iteam === '-' || iteam === '/' || iteam === '*';
}

function searchOperands(iteam){
  return iteam === '.' || Number(iteam) || iteam === '0';
}

function validateArray(array){
  let operands = array.operands;
  let operators = array.operators;

  if(operators.length + 1 === operands.length){
    console.log("I conjure abracadabra");
  } 
  else {
    throw 'Error';
  }
}

function calcNumber(result){
  let operands = result.operands;
  let operators = result.operators;
  const product = [];
  const operatorsPlusMinus = [];
  let tempResult = undefined;

  for(let i = 0; i < operators.length; i++){
    let iteam = operators[i];
    
    if(checkOperatorsPlusMinus(iteam)){
      if(tempResult){
        product.push(tempResult);
        tempResult = undefined;
      } 
      else {
        product.push(operands[i]);
      }
      operatorsPlusMinus.push(iteam);
    }
    else if (checkOperators(iteam)) {
      tempResult = findSumNumber(i, operands, operators);
      i += getCountMissingElements(i, operators);
    }
  }
  if(tempResult){
    product.push(tempResult);
  } 
  else {
    product.push(operands[operands.length-1]);
  }

  return {
    operands: product,
    operators: operatorsPlusMinus
  };
}

function checkOperatorsPlusMinus(iteam){
  return iteam === '+' || iteam === '-';
}

function checkOperators(iteam){
  return iteam === '*' || iteam === '/'; 
}

function getCountMissingElements(index, operators){
  let result = 0;

  for(let i = index+1; i < operators.length; i++){
    if(operators[i] === '*' || operators[i] === '/'){
      result++;
    }
    else if (operators[i] === '+' || operators[i] === '-'){
      break;
    }
  }

  return result;
}

function findSumNumber(index, operands, operators){
  let result = 0;
  
  if(operators[index] === '*'){
    result = operands[index] * operands[index+1];
  }
  else if (operators[index] === '/'){
    result = operands[index] / operands[index+1];
  }

  for(let i = index+1; i < operators.length; i++){
    if(operators[i] === '*'){
      result = result * operands[i+1];
    }
    else if (operators[i] === '/'){
      result = result / operands[i+1];
    }
    else if (operators[i] === '-' || operators[i] === '+'){
      break;
    }
  }

  return result;
}

function findSumNumberPlusMinus(operands, operators){
  return findSumNumberPlusMinusTwo(getInitValue(operands, operators), operands, operators);
}

function findSumNumberPlusMinusTwo(sum, operands, operators){
  for(let i = 1; i < operators.length; i++){
    if(operators[i] === '+'){
      sum += operands[i+1];
    }
    else if(operators[i] === '-'){
      sum -= operands[i+1];
    }
  }
  return sum;
}

function getInitValue(operands, operators){
  if(operators[0] === '+'){
    return operands[0] + operands[1];
  }
  else if(operators[0] === '-'){
    return operands[0] - operands[1];
  }
}






// Вивести діапазон між числами (3, 9) - в чаті телеграм 

// 5 6 8 7
// 3 1 2 5
// 4 3 2 2
// Result: 5 3 4 3 1 6 8 2 2 2 5 7 

//Вивести числа з багаторівневого масиву равликом
//У всіх масивів однакова кількість чисел
// 5 6 8 7
// 3 1 2 5
// 4 3 2 2
// Result: 5 6 8 7 5 2 2 3 4 3 1 2