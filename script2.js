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
  }
  this.activate = function()
  {
    this.lock = true;
  }
  this.deactivate = function()
  {
    this.lock = false;
  }
}

function realToSymbol(string)
{
  string = string.replace('/','$');
  string = string.replace('-','_');
  return string;
}

function symbolToReal(string)
{
  string = string.replace('$','/');
  string = string.replace('_','-');
  return string;
}

var steps = new solutionSteps();

function main22()
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
	//Ax + By = C
	//Dx + Ey = F
  steps = new solutionSteps();
  var Parent = document.getElementById('myTable');
  while(Parent.hasChildNodes())
  {
     Parent.removeChild(Parent.firstChild);
  }
  var check = false;
  var check2 = false;
  while(check == false)
  {
    while(check2 == false)
    {
      var abcANDnewtemplate1 = generateSimultaneousEquations1();
      var defANDnewtemplate2 = generateSimultaneousEquations2();
      var determinant = simplifyCoefficient("((" + abcANDnewtemplate1.simplified_a + " * " + defANDnewtemplate2.simplified_e + ")" + " - " + "(" + abcANDnewtemplate1.simplified_b + " * " + defANDnewtemplate2.simplified_d + "))"); //a*d - b*c;
      if(validation(determinant,3) == true){check2 = true;}
    }

    var solution = solveSimultaneousEquation(abcANDnewtemplate1.simplified_a,abcANDnewtemplate1.simplified_b,abcANDnewtemplate1.simplified_c,defANDnewtemplate2.simplified_d,defANDnewtemplate2.simplified_e,defANDnewtemplate2.simplified_f);
    if(validation(solution.x,1) == true &&  validation(solution.y,1) == true){check = true;}
    else{check2 = false;}
  }

  var equation1 = abcANDnewtemplate1.newtemplate1;
  var equation2 = defANDnewtemplate2.newtemplate2;
// up will be coming from database


  steps.activate();
  steps.directPush("for the first equation:");
  steps.assignQuestion(equation1);
  steps.directPush("for coefficient of x:");
  simplifyCoefficient(abcANDnewtemplate1.a);
  var a_mathml = questionToMathML(abcANDnewtemplate1.a);
  a_mathml = a_mathml.replace('<math xmlns="http://www.w3.org/1998/Math/MathML">','');
  a_mathml = a_mathml.replace('</math>','');
  steps.directPush("for coefficient of y:");
  simplifyCoefficient(abcANDnewtemplate1.b);
  var b_mathml = questionToMathML(abcANDnewtemplate1.b);
  b_mathml = b_mathml.replace('<math xmlns="http://www.w3.org/1998/Math/MathML">','');
  b_mathml = b_mathml.replace('</math>','');
  steps.directPush("for the last bit:");
  simplifyCoefficient(abcANDnewtemplate1.c);
  var c_mathml = questionToMathML(abcANDnewtemplate1.c);
  c_mathml= c_mathml.replace('<math xmlns="http://www.w3.org/1998/Math/MathML">','');
  c_mathml=c_mathml.replace('</math>','');

  steps.directPush("---------------------------------");

  steps.directPush("for the second equation:");
  steps.assignQuestion(equation2);
  steps.directPush("for coefficient of x:");
  simplifyCoefficient(defANDnewtemplate2.d);
  var d_mathml = questionToMathML(defANDnewtemplate2.d);
  d_mathml=d_mathml.replace('<math xmlns="http://www.w3.org/1998/Math/MathML">','');
  d_mathml=d_mathml.replace('</math>','');
  steps.directPush("for coefficient of y:");
  simplifyCoefficient(defANDnewtemplate2.e);
  var e_mathml = questionToMathML(defANDnewtemplate2.e);
  e_mathml=e_mathml.replace('<math xmlns="http://www.w3.org/1998/Math/MathML">','');
  e_mathml=e_mathml.replace('</math>','');
  steps.directPush("for the last bit:");
  simplifyCoefficient(defANDnewtemplate2.f);
  var f_mathml = questionToMathML(defANDnewtemplate2.f);
  f_mathml=f_mathml.replace('<math xmlns="http://www.w3.org/1998/Math/MathML">','');
  f_mathml=f_mathml.replace('</math>','');


  steps.directPush("---------------------------------");
  solveSimultaneousEquation(abcANDnewtemplate1.simplified_a,abcANDnewtemplate1.simplified_b,abcANDnewtemplate1.simplified_c,defANDnewtemplate2.simplified_d,defANDnewtemplate2.simplified_e,defANDnewtemplate2.simplified_f);

  steps.printToConsole();

  solution.x = solution.x.replace("$","/");
  solution.x = solution.x.replace("_","-");
  solution.y = solution.y.replace("$","/");
  solution.y = solution.y.replace("_","-");

  var equation1mathml = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + a_mathml+ '<mi>x</mi><mo>+</mo>' + b_mathml +'<mi>y</mi><mo>=</mo>'+ c_mathml+ '</math>';
  var equation2mathml = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + d_mathml+ '<mi>x</mi><mo>+</mo>' + e_mathml +'<mi>y</mi><mo>=</mo>'+ f_mathml+ '</math>';

  $(document).ready(function() {
     MathJax.Hub.Config({
       mml2jax: {
         preview: "mathml",
         useMathMLspacing: true
       }
     });
    var newmath = equation1mathml;
    var math = MathJax.Hub.getAllJax("questionText1")[0];//div name goes into input
    MathJax.Hub.Queue(["Text",math,newmath]);
  });

  $(document).ready(function() {
     MathJax.Hub.Config({
       mml2jax: {
         preview: "mathml",
         useMathMLspacing: true
       }
     });
    var newmath = equation2mathml;
    var math = MathJax.Hub.getAllJax("questionText2")[0];//div name goes into input
    MathJax.Hub.Queue(["Text",math,newmath]);
  });

  document.getElementById("answerText2").innerHTML = solution.y;
  document.getElementById("answerText1").innerHTML = solution.x;

}

function solveSimultaneousEquation(a,b,c,d,e,f)
{
  // treat the inputs as decimal number which is string.
  // cramer's rule;
  steps.directPush("to find value of x and y:");
  steps.directPush("Ax + By = C \nDx + Ey = F");
  steps.directPush("determinant = (A*E) - (B*D)");
  steps.assignQuestion(("((" + a + " * " + e + ")" + " - " + "(" + b + " * " + d + "))"));
  var determinant = simplifyCoefficient("((" + a + " * " + e + ")" + " - " + "(" + b + " * " + d + "))"); //a*d - b*c;
  steps.directPush("determinant = " + determinant);

  steps.directPush("-------------------------------------");

  var determinant = realToSymbol(determinant);
  var x = "";
  var y = "";
  if(determinant != '0')
  {
     steps.directPush("for x:");
     steps.directPush("x = (e*d - b*f)/determinant");
     steps.assignQuestion(("(((" + c + " * " + e + ")" + " - " + "(" + b + " * " + f + "))" + " / " + determinant + ")"));
     x =  simplifyCoefficient("(((" + c + " * " + e + ")" + " - " + "(" + b + " * " + f + "))" + " / " + determinant + ")"); //(e*d - b*f)/determinant;
     steps.directPush("x = " + x);

     steps.directPush("-------------------------------------");

     steps.directPush("for y:");
     steps.directPush("y = (a*f - e*c)/determinant");
     steps.assignQuestion(("(((" + a + " * " + f + ")" + " - " + "(" + c + " * " + d + "))" + " / " + determinant + ")"));
     y = simplifyCoefficient("(((" + a + " * " + f + ")" + " - " + "(" + c + " * " + d + "))" + " / " + determinant + ")");//(a*f - e*c)/determinant;
     steps.directPush("y = " + y);

     if(x == "0" || y == "0" || x.charAt(x.indexOf("/")+1) == '0' || y.charAt(y.indexOf("/")+1) == '0')
     {x = "10000";y="10000";}
  } else
  {
      x = "10000";// making sure that validation will return false so that the function will be called with different imputs.
      y = "10000";
      //"Cramer equations system: determinant is zero."
      //"there are either no solutions or many solutions exist."
  }

  /*

  var a1 = a;
  var y = "";
  var x = "";

  a = simplifyCoefficient("(" + a + " * " + d + ")");
  b = simplifyCoefficient("(" + b + " * " + d + ")");
  c = simplifyCoefficient("(" + c + " * " + d + ")");

  d = simplifyCoefficient("(" + d + " * " + a1 + ")");
  e = simplifyCoefficient("(" + e + " * " + a1 + ")");
  f = simplifyCoefficient("(" + f + " * " + a1 + ")");

  a = realToSymbol(a);
  b = realToSymbol(b);
  c = realToSymbol(c);
  d = realToSymbol(d);
  e = realToSymbol(e);
  f = realToSymbol(f);

  /*
  a=a*d;
  b=b*d;
  c=c*d;

  d=d*a1;
  e=e*a1;
  f=f*a1;
  */
  /*
  var afloat = toFloat(a);
  var dfloat = toFloat(d);
  var steps = 0;

  if((afloat<0 && dfloat >0) || (afloat>0 && dfloat<0))
  {
    y = simplifyCoefficient("((" + c + " + " + f + ")" + " / "+ "(" + b + " + " + e + "))");
    //y=(c+f)/(b+e);
  }
  if((afloat<0 && dfloat <0) || (afloat>0 && dfloat>0))
  {
    y = simplifyCoefficient("((" + c + " - " + f + ")" + " / "+ "(" + b + " - " + e + "))");
    //y=(c-f)/(b-e);
  }

  x = simplifyCoefficient("((" + c + " - " + "(" + b + " * " + y +")) / " + a + ")");
  //x=((c-(b*y))/a);

  */

  xAndy = {x,y}
  return xAndy;
}

function generateSimultaneousEquations1()
{
	var template1 = "Ax + By = C";
	var newtemplate1 = "";
  var simplified_a = "";
  var simplified_b = "";
  var simplified_c = "";

  var check = false;

  while(check == false)
  {
    var a = selectCoefficient();
    if(validation(simplifyCoefficient(a),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var b = selectCoefficient();
    if(validation(simplifyCoefficient(b),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var c = selectCoefficient();
    if(validation(simplifyCoefficient(c),2) == true){check = true;}
  }
  //end of the validation

	for(var i = 0 ; i < template1.length ; i++)
	{
		if(template1.charAt(i) == 'A')
		{
			newtemplate1 = newtemplate1 + a;
		}
		else if(template1.charAt(i) == 'B')
		{
			newtemplate1 = newtemplate1 + b;
		}
		else if(template1.charAt(i) == 'C')
		{
			newtemplate1 = newtemplate1 + c;
		}
		else
		{
			newtemplate1 = newtemplate1 + template1.charAt(i);
		}
	}

  steps.assignQuestion(newtemplate1);
  simplified_a = simplifyCoefficient(a);
  simplified_b = simplifyCoefficient(b);
  simplified_c = simplifyCoefficient(c);
  var abcANDnewtemplate1 = {a, b, c, simplified_a, simplified_b, simplified_c, newtemplate1};
  return abcANDnewtemplate1;
}

function generateSimultaneousEquations2()
{
  var template2 = "Dx + Ey = F";
  var newtemplate2 = "";
  var simplified_d = "";
  var simplified_e = "";
  var simplified_f = "";

  var check = false;

  while(check == false)
  {
    var d = selectCoefficient();
    if(validation(simplifyCoefficient(d),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var e = selectCoefficient();
    if(validation(simplifyCoefficient(e),0) == true){check = true;}
  }
  check = false;
  while(check == false)
  {
    var f = selectCoefficient();
    if(validation(simplifyCoefficient(f),2) == true){check = true;}
  }
  //end of the validation
  for(var i = 0 ; i < template2.length ; i++)
	{
		if(template2.charAt(i) == 'D')
		{
			newtemplate2 = newtemplate2 + d;
		}
		else if(template2.charAt(i) == 'E')
		{
			newtemplate2 = newtemplate2 + e;
		}
		else if(template2.charAt(i) == 'F')
		{
			newtemplate2 = newtemplate2 + f;
		}
		else
		{
			newtemplate2 = newtemplate2 + template2.charAt(i);
		}
	}

  // buralara ekleme lazım alooo  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  // buralara ekleme lazım alooo
  steps.question = newtemplate2;
  simplified_d = simplifyCoefficient(d);
  simplified_e = simplifyCoefficient(e);
  simplified_f = simplifyCoefficient(f);

  var defANDnewtemplate2 = {d, e, f, simplified_d, simplified_e, simplified_f, newtemplate2};
  return defANDnewtemplate2;
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

function simplifyCoefficient(template)
{
    calculations = calculationsOrder(template);
    //calculations.sort(function(a, b){return a.length - b.length});

    for(var i = 0 ; i < calculations.size() ; i++)
    {
      var current = calculations.storage[i];
      if(current.charAt(0) == '(')
      {
        var arr = getNumber(current,1);
      }
      else
      {
        var arr = getNumber(current,0);
      }
      var firstNumber = arr[0][0];
      var sign = arr[1][0];
      var secondNumber = arr[2][0];





      var changeSymbols = function(input)
      {
        input = input.replace("$","/");
        input = input.replace("_","-");
        return input;
      }

      var temp = makeCalculation(firstNumber, secondNumber, sign);
      var temp2 = calculations.storage[i];
      steps.directPush(temp2 + " = " + changeSymbols(temp));
      steps.getCurrentStep(temp2);
      steps.push(temp);
      for(var z = 0; z < calculations.size() ; z++)
      {
        var temp3 = calculations.storage[z];
        temp3 = temp3.replace(temp2.toString(), temp.toString());
        calculations.storage[z] = temp3.toString();
      }
    }

    //
    var result = calculations.storage[calculations.size() - 1];
    return result;
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

      if(i > template.length)
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
  var calculations = new Stack();

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
  return calculations;

  /*
  var openBracketsIndex = [];
  var closedBracketsIndex = [];
  var cordinatesOftheCalculations = [];
  var calculations = [];
  var currentOpenBrackets = 0;
  var currentClosedBrackets = 0;

  for(var i = 0 ; i < template.length ; i++)
  {
    var temp = template.charAt(i);
    if(temp == '(')
    {
      openBracketsIndex[currentOpenBrackets] = i;
      currentOpenBrackets ++;
    }
    else if(temp == ')')
    {
      closedBracketsIndex[currentClosedBrackets] = i;
      currentClosedBrackets ++;
    }
  }

  //putting indexes into array
  //(((8 + 5) + (7 + 6)) + (7+2)) + (8 +3)

  var check = false;
  var j = 0;
  while(check == false)
  {

    var greatest = 0;
    for(var z = 0 ; z <openBracketsIndex.length ; z++)
    {
      if(closedBracketsIndex[0]>openBracketsIndex[z])
      {
          greatest = openBracketsIndex[z];
      }
    }
    var firstCoordinate = greatest;
    var index = openBracketsIndex.indexOf(greatest);
    firstCoordinate = firstCoordinate.toString();
    var secondCoordinate = closedBracketsIndex[0];
    secondCoordinate = secondCoordinate.toString();
    cordinatesOftheCalculations[j] = "(" + firstCoordinate + " - " + secondCoordinate + ")";
    calculations[j] = template.substring(greatest,parseInt(secondCoordinate) + 1);
    // remove the bits
    openBracketsIndex.splice(index, 1);
    closedBracketsIndex.splice(0, 1);
    j++;

    if(openBracketsIndex.length == 0 && closedBracketsIndex.length == 0)
    {
      check = true;
    }

  }
  */
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

function makeCalculation(number1, number2, sign)
{
  // assuming number1 and 2 are string
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

function validation(number,choice)
{
  //treat number as string
  var toFloat = function(decimal)
  {
    var float= 0.0;
    if(decimal.indexOf('/') != -1)
    {
    var number1 = parseInt(decimal.substring(0,decimal.indexOf('/')))
    var number2 = parseInt(decimal.substring(decimal.indexOf('/')+1, decimal.length));
    float = number1 / number2;
    }
    else
    {
    float = parseInt(decimal);
    }
    return float;
  }
  number = number.replace("$","/");
  number = number.replace("_","");
  number = number.replace("-","");
  var float = toFloat(number);
  if(choice == 0 || choice == 2)
  {
    if(float > 50.0 || float < -50.0 || float == 0){return false;}
  }

  if(choice == 0 ||choice == 2)
  {
    if(number.indexOf("/") != -1)
    {
      var temp1 = number.substring(0,number.indexOf("/"));
      var temp2 = number.substring(number.indexOf("/")+1,number.length);
      var intTemp2 = parseInt(temp2);
      if(intTemp2 > 20){return false;}
      if(temp1.length > 2){return false;}
      if(temp2.length > 2){return false;}
    }
    else
    {
      if(number.length>2){return false;}
    }
  }
  if(choice == 2)
  {
    var temp2 = number.substring(number.indexOf("/")+1,number.length);
    var intTemp2 = parseInt(temp2);
    if(intTemp2 > 10){return false;}
  }
  if(choice == 3)
  {
    if(number.indexOf("/") != -1)
    {
      var temp1 = number.substring(0,number.indexOf("/"));
      var temp2 = number.substring(number.indexOf("/")+1,number.length);
      var float = simplifyCoefficient("(" + temp1 + " / " + temp2 + ")");
      if(float > 50 || float < -51 || float == 0){return false;}
      if(temp1.length > 3){return false;}
      if(temp2.length > 3){return false;}
    }
    else
    {
      var integer = parseInt(number);
      if(integer > 50){return false;}
    }
  }
  if(choice == 1)
  {
    if(number.indexOf("/") != -1)
    {
      var temp1 = number.substring(0,number.indexOf("/"));
      var temp2 = number.substring(number.indexOf("/")+1,number.length);
      if(temp1.length > 3){return false;}
      if(temp2.length > 3){return false;}
    }
    else
    {
      if(number.length > 3){return false;}
    }
  }

  return true;
}

function calculationsOrder1(template)
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

function questionToMathML(expression)
{
  //  question = "(((5x^2 + 13x) + (6x / 5x)) + ((8$4x + 5$1x) * (3x^2 / 5))) / (((15x^2 / 1) - (5x - 4)) * ((14x / 6$2) / (13x + 2$5)))";
  var output = '<math xmlns="http://www.w3.org/1998/Math/MathML">';
  var expressions = calculationsOrder1(expression);
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

function selectSign()
{
  var sign = "";
  var choice = (Math.floor(Math.random() * 4)); // 0 to 4
  switch (choice)
  {
    case 0:
      sign = "+";
      break;
    case 1:
      sign = "-";
      break;
    case 2:
      sign = "/";
      break;
    case 3:
      sign = "*";
      break;
  }
  return sign;
}

function selectCoefficient()
{
	var option = Math.floor(Math.random() * 7); // 0 to 3
	var coefficient;
	switch(option)
	{
		case 0:
			coefficient = "(N S N)";
		break;

		case 1:
			coefficient = "((N S N) S  (N S N))";
		break;

		case 2:
			coefficient = "(N S N)";
		break;

		case 3:
			coefficient = "((N S N) S (N S N))";
		break;

		case 4:
			coefficient = "((N S N) S (N S N))";
		break;

		case 5:
			coefficient = "(((N S N) S (N S N)) S (N S N))";
		break;

		case 6:
			coefficient = "((N S N) S ((N S N) S (N S N)))";
		break;
	}

	var newCoefficient = "";
	for(var i = 0 ; i < coefficient.length ; i++)
	{
    var number = (Math.floor(Math.random() * 15)) + 1;
    number = number.toString();
		if (coefficient.charAt(i) == 'N')
		{
			newCoefficient =newCoefficient + number;
		}
    else if(coefficient.charAt(i) == 'S')
    {
      newCoefficient =newCoefficient + selectSign();
    }
		else
		{
		newCoefficient = newCoefficient + coefficient.charAt(i);
		}
	}
	return newCoefficient;
}

function selectTemplate1()
{
	var option = Math.floor(Math.random() * 3); // 0 to 2
	var template;

	switch(option)
	{
		case 0:
			template = "Ax + By = C";
		break;

		case 1:
			template = "Ax + C = By";
		break;

		case 2:
			template = "C + By = Ax";
		break;
	}

	return template;
}

function selectTemplate2()
{
	var option = Math.floor(Math.random() * 3); // 0 to 2
	var template;

	switch(option)
	{
		case 0:
			template = "Dx + Ey = F";
		break;

		case 1:
			template = "Dx + F = Ey";
		break;

		case 2:
			template = "F + Ey = Dx";
		break;
	}

	return template;
}
