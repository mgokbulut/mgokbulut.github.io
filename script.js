var Stack = function()
{
  this.count = 0;
  this.storage = {};

  // Adds a value onto the end of the stack
  this.push = function(value)
  {
      this.storage[this.count] = value;
      this.count++;
  }

  // Removes and returns the value at the end of the stack
  this.pop = function()
  {
      if (this.count === 0)
      {
          return undefined;
      }

      this.count--;
      var result = this.storage[this.count];
      delete this.storage[this.count];
      return result;
  }

  this.size = function()
  {
      return this.count;
  }

  // Returns the value at the end of the stack
  this.peek = function()
  {
      return this.storage[this.count-1];
  }
}

var solutionSteps = function()
{
  this.question = "";
  this.stepsInOrder = [];
  this.i = 0;
  this.currentStep;
  this.lock = false;
  // Adds a value onto the end of the stack
  this.assignQuestion = function(input)
  {
    if(this.lock == true)
    {
      this.question = input;
      this.stepsInOrder[this.i] = this.question;
      this.i +=1;
    }
  }
  this.push = function(replacedStep)
  {
    if(this.lock == true)
    {
      this.question = this.question.replace(this.currentStep,replacedStep);
      this.stepsInOrder[this.i] = this.question;
      this.i += 1;
    }
  }
  this.symbolToReal = function(string)
  {
    for(var i = 0 ; i < string.length ; i++)
    {
      string = string.replace('$','/');
      string = string.replace('_','-');
    }
    return string;
  }
  this.directPush = function(input)
  {
    if(this.lock == true)
    {
      this.stepsInOrder[this.i] = input;
      this.i += 1;
    }
  }
  this.getCurrentStep = function(input)
  {
    if(this.lock == true)
    {
      this.currentStep = input;
    }
  }
  this.addSup = function(input)
  {
    var newInput = "";
    for (var i = 0; i < input.length; i++)
    {
      if (input.charAt(i) == '^')
      {
        var bool = false;
        newInput += '<sup>';
        while (bool == false)
        {
          i++;
          if (!isNaN(parseInt(input.charAt(i), 10)) || input.charAt(i) == '_' ||input.charAt(i) == '-')
          {
            newInput += input.charAt(i);
          }
          else
          {
            i--;
            bool = true;
          }
        }
        newInput += '</sup>';
      }
      else
      {
        newInput += input.charAt(i);
      }
    }
    return newInput;
  }
  this.printToConsole = function()
  {
    var order = 1;
    for(var j = 0 ; j < this.stepsInOrder.length ; j++)
    {
      $('#myTable').append('<tr><th>'+ order +'</th><th></th></tr>');
      order++;
      var temp = this.stepsInOrder[j];
      temp = this.symbolToReal(temp);
      var myTable = document.getElementById('myTable');
      myTable.rows[j].cells[1].innerHTML = this.addSup(temp);
    }
    $('#myTable').append('<tr><th>'+ order +'</th><th></th></tr>');
    myTable.rows[this.stepsInOrder.length].cells[1].innerHTML = "anser = "+ this.addSup(temp).substring(1,this.addSup(temp).length-1);
  }
  this.activate = function()
  {
    this.lock = true;
  }
}

var check = true;
var steps;

var calculate = function()
{
  this.arr1;
  this.arr2;
  this.signImp;
  this.result;
  this.coefficients;

  this.subtraction = function()
  {
    for(var i = 0 ; i <= this.arr2.length-2 ; i+=2)
    {
      this.arr2[i][0] = makeCalculation(this.arr2[i][0],"_1","*");
    }
    this.addition();
  }
  this.multiplication = function()
  {
    var temp = [];
    var indicator = 0;
    for(var i = 0 ; i <= this.arr1.length-2 ; i+=2)
    {
      for(var j = 0 ; j <= this.arr2.length-2 ; j+=2)
      {
        temp[indicator] = [];
        temp[indicator][0] = makeCalculation(this.arr1[i][0],this.arr2[j][0],"*");
        temp[indicator][1] = makeCalculation(this.arr1[i][1],this.arr2[j][1],"+");
        indicator++;
      }
    }
    steps.directPush(constructQuestion(this.arr1,this.arr2,this.signImp));
    for(var k = 0; k<temp.length ; k++)
    {
      this.assignToCoefficients(temp,k);
    }
    this.prepareResult();
  }
  this.division = function()
  {
    var temp = [];
    var indicator = 0;
    if(this.arr2.length > 2)
    {
      check = false;
    }
    for(var i = 0 ; i <= this.arr1.length-2 ; i+=2)
    {
        temp[indicator] = [];
        temp[indicator][0] = makeCalculation(this.arr1[i][0],this.arr2[0][0],"/");
        temp[indicator][1] = makeCalculation(this.arr1[i][1],this.arr2[0][1],"-");
        indicator++;
    }

    for(var k = 0; k<temp.length ; k++)
    {
      this.assignToCoefficients(temp,k);
    }
    this.prepareResult();
  }
  this.addition = function()
  {
    for(var i = 0 ; i <= this.arr1.length-2 ; i+=2)
    {
      this.assignToCoefficients(this.arr1,i);
    }
    for(var j = 0 ; j <= this.arr2.length-2 ; j+=2)
    {
      this.assignToCoefficients(this.arr2,j);
    }
    this.prepareResult();
  }
  this.assignToCoefficients = function(array,i)
  {
    if(array[i][1] == "_4")
    {
      if(this.coefficients.k == "")
      {
        this.coefficients.k = array[i][0];
      }
      else
      {
        this.coefficients.k = makeCalculation(this.coefficients.k,array[i][0],"+");
      }
    }
    else if(array[i][1] == "_3")
    {
      if(this.coefficients.j == "")
      {
        this.coefficients.j = array[i][0];
      }
      else
      {
        this.coefficients.j = makeCalculation(this.coefficients.j,array[i][0],"+");
      }
    }
    else if(array[i][1] == "_2")
    {
      if(this.coefficients.i == "")
      {
        this.coefficients.i = array[i][0];
      }
      else
      {
        this.coefficients.i = makeCalculation(this.coefficients.i,array[i][0],"+");
      }
    }
    else if(array[i][1] == "_1")
    {
      if(this.coefficients.h == "")
      {
        this.coefficients.h = array[i][0];
      }
      else
      {
        this.coefficients.h = makeCalculation(this.coefficients.h,array[i][0],"+");
      }
    }
    else if(array[i][1] == "0")
    {
      if(this.coefficients.g == "")
      {
        this.coefficients.g = array[i][0];
      }
      else
      {
        this.coefficients.g = makeCalculation(this.coefficients.g,array[i][0],"+");
      }
    }
    else if(array[i][1] == "1")
    {
      if(this.coefficients.f == "")
      {
        this.coefficients.f = array[i][0];
      }
      else
      {
        this.coefficients.f = makeCalculation(this.coefficients.f,array[i][0],"+");
      }
    }
    else if(array[i][1] == "2")
    {
      if(this.coefficients.e == "")
      {
        this.coefficients.e = array[i][0];
      }
      else
      {
        this.coefficients.e = makeCalculation(this.coefficients.e,array[i][0],"+");
      }
    }
    else if(array[i][1] == "3")
    {
      if(this.coefficients.d == "")
      {
        this.coefficients.d = array[i][0];
      }
      else
      {
        this.coefficients.d = makeCalculation(this.coefficients.d,array[i][0],"+");
      }
    }
    else if(array[i][1] == "4")
    {
      if(this.coefficients.c == "")
      {
        this.coefficients.c = array[i][0];
      }
      else
      {
        this.coefficients.c = makeCalculation(this.coefficients.c,array[i][0],"+");
      }
    }
    else if(array[i][1] == "5")
    {
      if(this.coefficients.b == "")
      {
        this.coefficients.b = array[i][0];
      }
      else
      {
        this.coefficients.b = makeCalculation(this.coefficients.b,array[i][0],"+");
      }
    }
    else if(array[i][1] == "6")
    {
      if(this.coefficients.a == "")
      {
        this.coefficients.a = array[i][0];
      }
      else
      {
        this.coefficients.a = makeCalculation(this.coefficients.a,array[i][0],"+");
      }
    }
    else
    {
      check = false;
    }
  }
  this.prepareResult = function()
  {
    this.result += "(";

    if(this.coefficients.a != "")
    {
      this.result = this.result + this.coefficients.a + "X^6 + ";
    }
    if(this.coefficients.b != "")
    {
      this.result = this.result + this.coefficients.b + "X^5 + ";
    }
    if(this.coefficients.c != "")
    {
      this.result = this.result + this.coefficients.c + "X^4 + ";
    }
    if(this.coefficients.d != "")
    {
      this.result = this.result + this.coefficients.d + "X^3 + ";
    }
    if(this.coefficients.e != "")
    {
      this.result = this.result + this.coefficients.e + "X^2 + ";
    }
    if(this.coefficients.f != "")
    {
      this.result = this.result + this.coefficients.f + "X + ";
    }
    if(this.coefficients.g != "")
    {
      this.result = this.result + this.coefficients.g + " + ";
    }
    if(this.coefficients.h != "")
    {
      this.result = this.result + this.coefficients.h + "X^_1 + ";
    }
    if(this.coefficients.i != "")
    {
      this.result = this.result + this.coefficients.i + "X^_2 + ";
    }
    if(this.coefficients.j != "")
    {
      this.result = this.result + this.coefficients.j + "X^_3 + ";
    }
    if(this.coefficients.k != "")
    {
      this.result = this.result + this.coefficients.k + "X^_4 + ";
    }

    this.result = this.result.substring(0,this.result.length-3);
    this.result += ")";
  }
  this.assign_arr1 = function(input)
  {
    this.arr1 = input;
  }
  this.assign_arr2 = function(input)
  {
    this.arr2 = input;
  }
  this.assign_result = function(input)
  {
    this.result = input;
  }
  this.assign_coefficients = function(input)
  {
    this.coefficients = input;
  }
  this.assign_signImp = function(input)
  {
    this.signImp = input;
  }
}

function main23()
{
  try
  {
    setup();
  }
  catch(err)
  {
    console.log("setupta sıkıntı var");
  }
}

function setup()
{

  var Parent = document.getElementById('myTable');
  while(Parent.hasChildNodes())
  {
     Parent.removeChild(Parent.firstChild);
  }
  steps = new solutionSteps();
  //$(questionText1).append('<math display="block" ><mrow class="beginning"></mrow></math>');
  var bool = false;
  while(bool == false)
  {
    check = true;
    var question =  generateQuestion();
    var questionFormated = changeFormat(question);
    var ans = simplifyCoefficient(questionFormated);
    if(check == true)
    {
      bool = true;
    }
    else
    {
        //console.log(question);
    }
  }
  question = '(' + question + ')';
  document.getElementById('questionText3').innerHTML = question;
  //question = "((((5$12x^2 / 13$2x) / (6x / 5x)) + ((8$4x + 5$1x) * (3x^2 / 5))) / (((15x^2 / 1) - (5x - 4)) * ((14x / 6$2) / (13x + 2$5))))";
  question = question.replace(/x/g,"X");

  var questionMathml = questionToMathML(question);//mathmlTranslator(question);

  $(document).ready(function() {
  	 MathJax.Hub.Config({
       mml2jax: {
         preview: "mathml",
         useMathMLspacing: true
       }
     });
    var newmath = questionMathml;
    var math = MathJax.Hub.getAllJax("questionText1")[0];//div name goes into input
  	MathJax.Hub.Queue(["Text",math,newmath]);
  });
  question = question.substring(1,question.length-1);// takes out the last parenthesis and the first
  steps.activate();
  steps.assignQuestion(questionFormated);
  ans = simplifyCoefficient(questionFormated);
  var ansMathml = answerToMathML(ans);

  $(document).ready(function() {
     MathJax.Hub.Config({
       mml2jax: {
         preview: "mathml",
         useMathMLspacing: true
       }
     });
    var newmath = ansMathml;
    var math = MathJax.Hub.getAllJax("questionText2")[0];//div name goes into input
    MathJax.Hub.Queue(["Text",math,newmath]);
  });
  var ansarr = getNumber(ans,1);
  /*for (var i = 0; i < ansarr.length; i+=2)
  {
    if(ansarr[i][0].length > 5)
    {
      document.getElementById('questionText4').innerHTML = "rest in peace";
    }
  }*/

steps.printToConsole();
}

function simplifyCoefficient(template)
{
  var calculations = calculationsOrder(template);

  for(var i = 0 ; i < calculations.length ; i++)
  {
    //----temp will be equal to the result from select path----
    // replacing the old array with new result. ------------------
    var temp = selectPath(calculations[i]);
    var temp2 = calculations[i];
    steps.getCurrentStep(temp2)
    steps.directPush(temp2 + " = " + temp);
    steps.push(temp);

    for(var z = 0; z < calculations.length ; z++)
    {
      var temp3 = calculations[z];
      temp3 = temp3.replace(temp2.toString(), temp.toString());
      calculations[z] = temp3.toString();
    }
    // replacing the old array with new result. ------------------
  }

  var result = calculations[calculations.length - 1];
  return result;
}

function selectPath(template)
{
  //var template = "((892 + 31X - 22X^333 * 31X^3) + (82 + 3X - 2X^3 * 2X^2))";
  // (ax^6 + bx^5 + cx^4 + dx^3 + ex^2 + fx + g + hx^-1 + ix^-2 + jx^-3 + kx^-4)
  var result = "";
  var coefficients =
  {
    a:"",
    b:"",
    c:"",
    d:"",
    e:"",
    f:"",
    g:"",
    h:"",
    i:"",
    j:"",
    k:""
  }

  var getArrays = function(template)
  {
    var i = 0;
    var bool = false;
    //getting the first array and the second array//
    while (bool == false)
    {
        if(isNumber(template.charAt(i)) == true)
        {
          bool = true;
        }
        else
        {
          i++;
        }
    }

    var arr1 = getNumber(template,i);
    i = arr1[arr1.length-1];

    bool = false;

    while(bool == false)
    {
      if(isSign(template.charAt(i)) == true)
      {
        var signImp = template.charAt(i);
        i += 2;
      }
      if(signImp != null && isNumber(template.charAt(i)) == true)
      {
        bool = true;
      }
      else
      {
          i++;
      }
    }
    var arr2 = getNumber(template, i);
    var result = {arr1,arr2,signImp};
    return result;
  }

  var getArray = getArrays(template);
  var arr1 = getArray.arr1;
  var arr2 = getArray.arr2;
  var signImp = getArray.signImp;

  var eliminateMinus = function(array)
  {
    for(var i = 1 ; i <= array.length-2 ; i+=2)
    {
      if(array[i][1] == "-")
      {
        array[i+1][0] = makeCalculation(array[i+1][0],"_1","*");
        array[i][1] = "+";
      }
      if(array[i][1] == "*" || array[i][1] == "/")
      {
        console.log("there should be an error");
      }
    }
    return array;
  }

  arr1 = eliminateMinus(arr1);
  arr2 = eliminateMinus(arr2);
  calc = new calculate();
  calc.assign_arr1(arr1);
  calc.assign_arr2(arr2);
  calc.assign_result(result);
  calc.assign_coefficients(coefficients);
  calc.assign_signImp(signImp);

  if(signImp == "-")
  {
    calc.subtraction();
  }
  else if(signImp == "+")
  {
    calc.addition();
  }
  else if(signImp == "*")
  {
    calc.multiplication();
  }
  else if(signImp == "/")
  {
    calc.division();
  }
  return calc.result;
}

function getNumber(template,i)
{
    var resultArray = [];
    var check = false;
    var indicator = 0;
    resultArray[indicator] = [];

    while(check == false)
    {
      if(resultArray[indicator][0] == null)
      {
        resultArray[indicator][0] = "";
      }
      if(resultArray[indicator][1] == null)
      {
        resultArray[indicator][1] = "";
      }

      if(template.charAt(i) == 'X' && template.charAt(i+1) == '^')
      {
        i += 2;
        var check2 = false;
        while (check2 == false)
        {
          if(isNumber(template.charAt(i)) == false)
          {
            check2 = true;
          }
          else
          {
            resultArray[indicator][1] += template.charAt(i);
            i++;
          }
        }
        i-=1;
      }
      else if(template.charAt(i) == 'X')
      {
        resultArray[indicator][1] = "1";
      }
      else if(isNumber(template.charAt(i)) == true)
      {
        resultArray[indicator][0] += template.charAt(i);
      }
      else if(isSign(template.charAt(i))==true)
      {
        resultArray[indicator][0] += template.charAt(i);
        resultArray[indicator][1] = "sign";
      }
      else if(template.charAt(i) == " ")
      {
        indicator +=1;
        resultArray[indicator] = [];
      }

      //end loop condition;
      if(template.charAt(i) == "(" || template.charAt(i) == ")")
      {
        check = true;
      }
      i++;
    }

    // eger powerOfX i undefindsa, 1inci elemente "0" ata.
    for(var j = 0; j < resultArray.length ; j++)
    {
      if(resultArray[j][1] == "")
      {
        resultArray[j][1] = "0";
      }
    }

    resultArray[resultArray.length] = i;
    return resultArray;
}

function calculationsOrder(template)
{
  var stackOfParentheses = new Stack();
  var stackOfIndexes = new Stack();
  var calculations = [];

  for(var i = 0 ; i < template.length ; i++)
  {
    if(template.charAt(i) == "(")
    {
      stackOfParentheses.push(template.charAt(i));
      stackOfIndexes.push(i);
    }
    if(template.charAt(i) == ")")
    {
      calculations.push(template.substring(stackOfIndexes.peek(),i+1));
      stackOfIndexes.pop();
      stackOfParentheses.pop();
    }
  }

  //------to get rid of the expressions inside of the parenthesis so we will end up with only the calculations.
  let tempArray = calculations.slice(0);
  var count = 0;

  for(var j = 0; j<tempArray.length ; j++)
  {
    var temp = tempArray[j];
    var check = false;

    for(var k = 0; k < temp.length;k++)
    {
      if(isSign(temp.charAt(k)) == true)
      {
        check = true;
      }
    }

    if(check == false)
    {
      calculations.splice(j-count,1);
      count++;
    }
  }

  return calculations;
}

function makeCalculation(number1, number2, sign)
{
  // assuming number1 and 2 are string
  //if(typeof number1 === 'number'){number1 = number1.toString();}
  //if(typeof number2 === 'number'){number2 = number2.toString();}
  if(number1.indexOf('_') != -1)
  {
    number1 = number1.replace("_","-");
  }
  if(number2.indexOf('_') != -1)
  {
    number2 = number2.replace("_","-");
  }

  var number1DivisionIndex = number1.indexOf('$');
  var number2DivisionIndex = number2.indexOf('$');
  var numerator =
  {
    n1:"",
    n1Int:0,
    n2:"",
    n2Int:0,
  };
  var denominator =
  {
    d1:"",
    d1Int:0,
    d2:"",
    d2Int:0,
  };

  if(number1DivisionIndex != -1)
  {
    numerator.n1 = number1.substring(0,number1DivisionIndex);
    denominator.d1 = number1.substring(number1DivisionIndex+1,number1.length);
  }
  if(number2DivisionIndex != -1)
  {
    numerator.n2 = number2.substring(0,number2DivisionIndex);
    denominator.d2 = number2.substring(number2DivisionIndex+1,number2.length);
  }

  var product = "";
  var temp1 = 0;
  var temp2 = 0;
  var gcf = 0;

  if(sign == '*')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      temp1 = numerator.n1Int * numerator.n2Int;
      temp2 = denominator.d1Int * denominator.d2Int;
      gcf = gcd(temp2, temp1);
      temp1 /= gcf;
      temp2 /= gcf;

      if(temp2 <0)
      {
        temp1 *= -1;
        temp2 *= -1;
      }
      if(temp2 != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = temp2.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 = temp1 * numerator.n1Int;
      gcf = gcd(temp1,denominator.d1Int);
      temp1 /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        temp1 *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else{product = temp1.toString();}
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 = temp1 * numerator.n2Int;
      gcf = gcd(temp1,denominator.d2Int);
      temp1 /= gcf;
      denominator.d2Int /= gcf;

      if(denominator.d2Int <0)
      {
        temp1 *= -1;
        denominator.d2Int *= -1;
      }
      if(denominator.d2Int != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = denominator.d2Int.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      temp2 *= temp1;
      product = temp2.toString();
    }
  }
  else if(sign == '/')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      temp1 = numerator.n1Int * denominator.d2Int;
      temp2 = denominator.d1Int * numerator.n2Int;
      gcf = gcd(temp2, temp1);
      temp1 /= gcf;
      temp2 /= gcf;

      if(temp2 <0)
      {
        temp1 *= -1;
        temp2 *= -1;
      }
      if(temp2 != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = temp2.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 = temp1 * denominator.d1Int;
      gcf = gcd(temp1, numerator.n1Int);
      temp1 /= gcf;
      numerator.n1Int /= gcf;

      if(temp1 <0)
      {
        numerator.n1Int *= -1;
        temp1 *= -1;
      }
      if(temp1 != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = temp1.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 = temp1 * denominator.d2Int;
      gcf = gcd(temp1, numerator.n2Int);
      temp1 /= gcf;
      numerator.n2Int /= gcf;

      if(numerator.n2Int <0)
      {
        numerator.n2Int *= -1;
        temp1 *= -1;
      }
      if(numerator.n2Int != 1)
      {
        numerator.n1 = temp1.toString();
        numerator.n2 = numerator.n2Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      gcf = gcd(temp1 , temp2);
      temp1 /= gcf;
      temp2 /= gcf;

      if(temp2 <0)
      {
        temp2 *= -1;
        temp1 *= -1;
      }
      if(temp2 != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = temp2.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
  }
  else if(sign == '-')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      numerator.n1Int *= denominator.d2Int;
      numerator.n2Int *= denominator.d1Int;
      denominator.d1Int *= denominator.d2Int;

      numerator.n1Int = numerator.n1Int - numerator.n2Int;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 *= denominator.d1Int;
      numerator.n1Int -= temp1;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 *= denominator.d2Int;
      temp1 -= numerator.n2Int;
      gcf = gcd(temp1,denominator.d2Int);
      temp1 /= gcf;
      denominator.d2Int /= gcf;

      if(denominator.d2Int <0)
      {
        temp1 *= -1;
        denominator.d2Int *= -1;
      }
      if(denominator.d2Int != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = denominator.d2Int.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      temp1 -= temp2;
      product = temp1.toString();
    }
  }
  else if(sign == '+')
  {
    if(numerator.n1 != "" && denominator.d1 != "" && numerator.n2 != "" && denominator.d2 != "")
    {
      numerator.n1Int = parseInt(numerator.n1);
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d1Int = parseInt(denominator.d1);
      denominator.d2Int = parseInt(denominator.d2);

      //
      numerator.n1Int *= denominator.d2Int;
      numerator.n2Int *= denominator.d1Int;
      denominator.d1Int *= denominator.d2Int;

      numerator.n1Int = numerator.n1Int + numerator.n2Int;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if ((numerator.n1 != "" && denominator.d1 != "" && number2DivisionIndex == -1))
    {
      numerator.n1Int = parseInt(numerator.n1);
      denominator.d1Int = parseInt(denominator.d1);
      temp1 = parseInt(number2);
      temp1 *= denominator.d1Int;
      numerator.n1Int += temp1;
      gcf = gcd(numerator.n1Int, denominator.d1Int);
      numerator.n1Int /= gcf;
      denominator.d1Int /= gcf;

      if(denominator.d1Int <0)
      {
        numerator.n1Int *= -1;
        denominator.d1Int *= -1;
      }
      if(denominator.d1Int != 1)
      {
        numerator.n1 = numerator.n1Int.toString();
        numerator.n2 = denominator.d1Int.toString();
        product = numerator.n1 + "$" + numerator.n2;
      }
      else
      {
        product = numerator.n1Int.toString();
      }
    }
    else if((numerator.n2 != "" && denominator.d2 != "" && number1DivisionIndex == -1))
    {
      numerator.n2Int = parseInt(numerator.n2);
      denominator.d2Int = parseInt(denominator.d2);
      temp1 = parseInt(number1);
      temp1 *= denominator.d2Int;
      temp1 += numerator.n2Int;
      gcf = gcd(temp1,denominator.d2Int);
      temp1 /= gcf;
      denominator.d2Int /= gcf;

      if(denominator.d2Int <0)
      {
        temp1 *= -1;
        denominator.d2Int *= -1;
      }
      if(denominator.d2Int != 1)
      {
        numerator.n1 = temp1.toString(); // using temporary to produce product;
        numerator.n2 = denominator.d2Int.toString();
        product = numerator.n1 + "$" + numerator.n2 ;
      }
      else
      {
        product = temp1.toString();
      }
    }
    else
    {
      temp1 = parseInt(number1);
      temp2 = parseInt(number2);
      temp2 += temp1;
      product = temp2.toString();
    }
  }

  // changeing symbols;
  if(product.indexOf('-') != -1)
  {
    product = product.replace("-","_");
  }
  // changeing symbols;
  return product;
}

function gcd(x, y)
{
  if ((typeof x !== 'number') || (typeof y !== 'number'))
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y)
  {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function realToSymbol(string)
{
  for(var i = 0 ; i < string.length ; i++)
  {
    string = string.replace('/','$');
    string = string.replace('-','_');
  }
  return string;
}

function symbolToReal(string)
{
  for(var i = 0 ; i < string.length ; i++)
  {
    string = string.replace('$','/');
    string = string.replace('_','-');
  }

  return string;
}

function changeFormat(question)
{
  //changes format of the question so that the program can analyze and simplify the generated question.
  var formatedQuestion = "";

  for(var i = 0 ; i < question.length ; i++)
  {
    if(isNumber(question.charAt(i)) == true)
    {
      formatedQuestion += "(";
      var check = false;
      while(check == false)
      {
        if(question.charAt(i+1) == " " || question.charAt(i+1) == ")")
        {
          check = true;
        }
        formatedQuestion += question.charAt(i);
        i++;
      }
      formatedQuestion += ")" + question.charAt(i);
    }
    else
    {
      formatedQuestion += question.charAt(i);
    }
  }
  formatedQuestion = formatedQuestion.replace(/x/g,"X");
  formatedQuestion = "(" + formatedQuestion + ")";
  return formatedQuestion;
}

function isSign(character)
{
  var check = false;
  if(character == '+' || character == '*' || character == '-' || character == '/' )
  {
    check = true;
  }
  return check;
}

function isNumber(character)
{
  var check = false;
  if(character == '_' || character == '$'|| character == '.' || character == '0' || character == '1' || character == '2' || character == '3' || character == '4' || character == '5' || character == '6' || character == '7' || character == '8' || character == '9')
  {
    check = true;
  }
  return check;
}

function constructQuestion(arr1,arr2,signImp)
{
  var question = "((";
  for (var i = 0; i < arr1.length-1; i++)
  {
    if(i%2 == 0)//if it is even
    {
      question += arr1[i][0];
      if(arr1[i][1] != "0")
      {
        if(arr1[i][1] == "1")
        {
          question += "X";
        }
        else
        {
         question += "X^" + arr1[i][1];
        }
      }
    }
    else
    {
      question += " " + arr1[i][0] + " ";
    }
  }

  question += ") " + signImp + " (";

  for (var j = 0; j < arr2.length-1; j++)
  {
    if(j%2 == 0)//if it is even
    {
      question += arr2[j][0];
      if(arr2[j][1] != "0")
      {
        if(arr2[j][1] == "1")
        {
          question += "X";
        }
        else
        {
         question += "X^" + arr2[j][1];
        }
      }
    }
    else
    {
      question += " " + arr2[j][0] + " ";
    }
  }

  question += "))";
  return question;
}

function questionToMathML(expression)
{
  //  question = "(((5x^2 + 13x) + (6x / 5x)) + ((8$4x + 5$1x) * (3x^2 / 5))) / (((15x^2 / 1) - (5x - 4)) * ((14x / 6$2) / (13x + 2$5)))";
  var output = '<math xmlns="http://www.w3.org/1998/Math/MathML">';
  var expressions = calculationsOrder(expression);
  var expressionsMathML = [];


  for (var i = 0; i < expressions.length; i++)
  {
    var arr = includes(i,expressions);
    var temp =expressions[i];
    if(arr.length == 0)
    {
      var tempMathML = mathmlForpCount1(temp);
      expressionsMathML[i] = tempMathML;
      // for 1 parenthesis
    }
    else // if the current string includes a part which is into the array
    {

      var m2 = expressionsMathML[arr[0]]; //mathml representations
      var m1 = expressionsMathML[arr[1]];

      for(var j = 0 ; j < arr.length ; j++)
      {
        temp = temp.replace(expressions[arr[j]],"");
      }

      // left with ( + )

      var tempMathML = "";
      for (var y = 0; y < temp.length; y++)
      {
        if(temp.charAt(y) == "(")
        {
          tempMathML += '<mfenced><mrow>';
        }
        else if(temp.charAt(y) == ")")
        {
          tempMathML += '</mrow></mfenced>';
        }
        else if(isSign(temp.charAt(y)) == true)
        {
          if (temp.charAt(y) == '/')
          {
            tempMathML += '<mfrac><mrow>' + m1 + '</mrow><mrow>' + m2 + '</mrow></mfrac>';
          }
          else
          {
            tempMathML += m1 +'<mrow><mn>'+ temp.charAt(y) +'</mn></mrow>'+ m2;
          }
        }
      }

      //translate ettikten sonra
      for (var x = 0; x < arr.length; x++)
      {
        expressions[arr[x]] = "EMPTY";
      }
      expressionsMathML[i] = tempMathML;
    }
  }
  output += expressionsMathML[expressionsMathML.length-1];
  output += '</math>';
  return output;
}

function includes(order, array)
{
  part = array[order];
  var resultArray = [];
  var i = 0;
  order--;
  for (; order > -1 ; order--)
  {
    if (part.indexOf(array[order]) != -1)
    {
        resultArray[i] = order;
        i++;
    }
  }
  return resultArray;
}

function mathmlForpCount1(string)
{
    var result = "";
    var arr = getNumber(string,1);
    if(arr[1][0] == '/')
    {
      result += '<mrow><mfrac><mrow>'
    }
    for(var j = 0 ; j < arr.length-1 ; j++)
    {
      if(j%2 == 0)//if it is a number
      {
        arr[j][0] = symbolToReal(arr[j][0]); //could be removed and the instructions below could be changed from / to $
        if(arr[j][0].indexOf('/') != -1)//if it includes a $
        {
          var t1 = arr[j][0].substring(0,arr[j][0].indexOf('/'));
          var t2 = arr[j][0].substring(arr[j][0].indexOf('/') + 1, arr[j][0].length);
          result += '<mrow><mfrac><mrow><mn>' + t1 + '</mn></mrow><mrow><mn>' + t2 + '</mn></mrow></mfrac></mrow>';
        }
        else//IF IT DOESNT INCLUDES DIVISION
        {
          result += '<mrow><mn>' + arr[j][0] + '</mn></mrow>';
        }

        // to assign X --------------------------------------------------------------------------------

        if(arr[j][1] != '0')//if x has a power
        {
          if(arr[j][1] == '1')//adding power of x
          {
            result += '<mi>x</mi>';
          }
          else// adding power of x
          {
            result += '<msup><mi>x</mi><mn>'+ symbolToReal(arr[j][1]) +'</mn></msup>';
            //<msup><mi>b</mi><mn>2</mn></msup>
          }
        }
      }
      else// it it is a sign
      {
        if (arr[j][0] == '/')
        {
          result += '</mrow><mrow>'
        }
        else
        {
          result += '<mo>'+ arr[j][0] +'</mo>';
        }
      }
    }//end of the for loop

    if(arr[1][0] == '/')
    {
      result += '</mrow></mfrac></mrow>';
    }
    //buraya else koyup alttaki statementi koyacaksin ve ust tarafa result  esittir kismini eklemeyeceksin ki boluler parentezli olmasin
    result = '<mfenced><mrow>' + result + '</mrow></mfenced>';
    return result;
}

function answerToMathML(string)
{
  var output = '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>';
  //((8X^2 + 2X) / (14/9X^2)) = (36/7 + 9$7X^-1)
  for (var i = 0; i < string.length; i++)
  {
    if(string.charAt(i) == "(")
    {
      output += '<mfenced><mrow>';
    }
    else if(string.charAt(i) == ")")
    {
      output += '</mrow></mfenced>';
    }
    else if(isNumber(string.charAt(i)) == true)
    {
      var arr = getNumber(string,i);
      while(string.charAt(i) != ')')
      {
        i++;
      }
      i--;

      for(var j = 0 ; j < arr.length-1 ; j++)
      {
        if(j%2 == 0)//if it is a number
        {
          arr[j][0] = symbolToReal(arr[j][0]);
          if(arr[j][0].indexOf('/') != -1)//if it includes a $
          {
            var temp1 = arr[j][0].substring(0,arr[j][0].indexOf('/'));
            var temp2 = arr[j][0].substring(arr[j][0].indexOf('/') + 1, arr[j][0].length);
            output += '<mrow><mfrac><mrow><mn>' + temp1 + '</mn></mrow><mrow><mn>' + temp2 + '</mn></mrow></mfrac></mrow>';
          }
          else//IF IT DOESNT INCLUDES DIVISION
          {
            output += '<mrow><mn>' + arr[j][0] + '</mn></mrow>';
          }

          // to assign X --------------------------------------------------------------------------------

          if(arr[j][1] != '0')//if x has a power
          {
            if(arr[j][1] == '1')//adding power of x
            {
              output += '<mi>x</mi>';
            }
            else// adding power of x
            {
              output += '<msup><mi>x</mi><mn>'+ symbolToReal(arr[j][1]) +'</mn></msup>';
              //<msup><mi>b</mi><mn>2</mn></msup>
            }
          }
        }
        else// it it is a sign
        {
          if (arr[j][0] == '/')
          {
            arr[j][0] = '&divide;'
          }
          if (arr[j][0] == '/')
          {
            arr[j][0] = '&#215;'
          }
          output += '<mo>'+ arr[j][0] +'</mo>';
        }
      }
    }
    else if(isSign(string.charAt(i)) == true)
    {
      if (arr[j][0] == '/')
      {
        output += '<mo>&divide;</mo>';
      }
      else if (arr[j][0] == '/')
      {
        output += '<mo>&#215;</mo>';
      }
      else
      {
        output += '<mo>' + string.charAt(i) + '</mo>';
      }
    }
    else if(string.charAt(i) != ' ')
    {
      output += '<mi>' + string.charAt(i) + '</mi>';
    }
  }8
  output += '</mrow></math>';
  return output;
}

function getSign()
{
  var sign = "";
  var choice = Math.floor(Math.random() * 4); // 0 - 3 inclusive
  switch (choice) {
  case 0:
    sign = "+";
    break;
  case 1:
    sign = "-";
    break;
  case 2:
    sign = "*";
    break;
  case 3:
    sign = "/";
    break;
  }
  return sign;
}

function getCoefficient()
{
  var coefficient = "";
  var choice = Math.floor(Math.random() * 14); // 0 - 13 inclusive

  switch (choice) {
  case 0:
    coefficient = "Nx - Nx";
    break;
  case 1:
    coefficient = "Nx + N";
    break;
  case 2:
    coefficient= "Nx - N";
    break;
  case 3:
    coefficient = "Nx * N";
    break;
  case 4:
    coefficient = "Nx + Nx";
    break;
  case 5:
    coefficient = "Nx + Nx";
    break;
  case 6:
    coefficient = "Nx * Nx";
    break;
  case 7:
    coefficient = "Nx^2 + Nx";
    break;
  case 8:
    coefficient = "Nx^2 - Nx";
    break;
  case 9:
    coefficient = "Nx / Nx";
    break;
  case 10:
    coefficient = "Nx / N";
    break;
  case 11:
    coefficient = "N / N";
    break;
  case 12:
    coefficient = "Nx^2 / Nx";
    break;
  case 13:
    coefficient = "Nx^2 / N";
    break;
  }

  for(var i = 0 ; i < coefficient.length ; i++)
  {
    if(coefficient.charAt(i) == 'N')
    {
      var isInt = Math.floor(Math.random() * 10);
      if (isInt < 3) //30 percent change of having a numberator and denominator, not being a whole number
      {
        var temp1 = Math.floor(Math.random() * 10)+1;
        var temp2 = Math.floor(Math.random() * 5)+1;
        var ss =  temp1.toString() + '$' + temp2.toString();
      }
      else //70 percent change of being an whole number
      {
        var temp = Math.floor(Math.random() * 15)+1;
        var ss = temp.toString();
      }
      coefficient = coefficient.slice(0, i) + ss + coefficient.slice(i+1, coefficient.length);
    }// fix this - problem with substring function ....
  }

  return coefficient;
}

function getTemplate()
{
  var template = "";
  var choice = Math.floor(Math.random() * 6);
  switch (choice) {
  case 0:
    template = "(C) S (C)";
    break;
  case 1:
    template = "((C) S (C)) S (C)";
    break;
  case 2:
    template = "(C) S ((C) S (C))";
    break;
  case 3:
    template = "(((C) S (C)) S ((C) S (C))) S ((C) S (C))";
    break;
  case 4:
    template = "((C) S (C)) S (((C) S (C)) S ((C) S (C)))";
    break;
  case 5:
    template = "(((C) S (C)) S ((C) S (C))) S (((C) S (C)) S ((C) S (C)))";
    break;
  }
  return template;
}

function generateQuestion()
{
  //for(var j=0;j<300;j++)
  //{
    var question = getTemplate();
    for(var i = 0 ; i < question.length ; i++)
    {
      if(question.charAt(i) == 'C')
      {
        question = question.slice(0, i) + getCoefficient() + question.slice(i+1 , question.length);
      }
      if(question.charAt(i) == 'S')
      {
        question = question.slice(0, i) + getSign() + question.slice(i+1 , question.length);
      }
    }
  /*  cevap=solvedQuestion(question);*/
  /*
   $.ajax({
        type        : "GET", //GET or POST or PUT or DELETE verb
        url         : "asd.php", // Location of the service
    data        : {"qtext":question} //Data sent to server


    });
  */
  //}
  return question;
}
