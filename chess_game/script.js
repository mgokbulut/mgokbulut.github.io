var board = [121];
var boardSYMBOL = [121];
var TABLE;
var CURRENT_TURN;
var CURRENT_OBJECTINDEX;
var CURRENT_COLOR;
var CURRENT_POSSIBLEMOVES;

var PAWNID_BLACK = 1;
var PAWNID_WHITE = 1;
var ROOKID_BLACK = 1;
var ROOKID_WHITE = 1;
var KNIGHTID_BLACK = 1;
var KNIGHTID_WHITE = 1;
var BISHOPID_BLACK = 1;
var BISHOPID_WHITE = 1;
var objects = [];
var TABLE_ANGLE = 0;
// if(board[index][0] != 'available')
// {
//   appendString += '<th width="60" height="60">'+ boardSYMBOL[index] + '/' + board[index][1] +'</th>'; // change 1 to 0
// }
// else
// {
//   appendString += '<th width="60" height="60">'+ ' ' + '/' + board[index][1] +'</th>';
// }

function setup()
{
  init();
  setBoard();
  printBoard();
  //board[53][0] = "Wp";
  console.table(board);
  //var rook = new rookObject('white', 88);

  // pawn.move('A3');
  // pawn.move('B4');
  //
  // rook.move('B7');
  // rook.move('B4');
}

function game()
{
  var command = document.getElementById('moveCommand').value;
  command =  command.split(" ");
  var currentPos = command[0];
  var nextPos = command[1];

  for (var i = 0; i < board.length; i++)
  {
    if (board[i][1] == currentPos)
    {
      currentPos = i;
    }
  }

  if (board[currentPos][0].charAt(0).toUpperCase() != document.getElementById("turn_text").innerHTML.charAt(0).toUpperCase())
  {
    alert("not your turn");
    return;
  }
  var objectName = board[currentPos][0];

  for (var i = 0; i < objects.length; i++)
  {
    if(objects[i].getName() == objectName)
    {
      objects[i].move(nextPos);
      break;
    }
  }

  printBoard();
}

function init()
{
  TABLE = document.getElementById('chess_table');
  CURRENT_TURN = "white's turn";
  CURRENT_POSITION = 0;
}

function setBoard()
{
  for (var i = 0; i < 121; i++)
  {
    board[i] = [2];
    if(i%10 == 1 || i%10 == 0)
    {
      board[i][0] = 'error';
    }
    else if(i < 21 || i > 100)
    {
      board[i][0] = 'error';
    }
    else
    {
      board[i][0] = 'available';
      board[i][1] = String.fromCharCode(65 + (i%10) -2)  + (Math.floor(i/10) - 1);
    }
  }
  putPieces();
}

function printBoard()
{
  if(TABLE_ANGLE == 0)
  {
    $("#chess_table").html("");
    var index = 92;
    var appendString = "";

    for (var i = 8; i > 0; i--)
    {
      appendString += '<tr>';
      appendString += '<td>' + i + '</td>';
      for(var j = 0 ; j < 8 ; j++)
      {
        if(board[index][0] != 'available')
        {
          appendString += '<td><a href="#!" onclick="changepos('+ index +')">'+ boardSYMBOL[index] +'</a></td>'; // change 1 to 0
        }
        else
        {
          appendString += '<td><a href="#!" onclick="changepos('+ index +')">'+ ' ' +'</a></td>';
        }
        index = index + 1;
      }
      appendString += '</tr>';
      $('#chess_table').append(appendString);
      appendString = "";
      index = index - 18;
    }
    $('#chess_table').append("<tr><td></td><td>a</td><td>b</td><td>c</td><td>d</td><td>e</td><td>f</td><td>g</td><td>h</td></tr>");
  }
  else if (TABLE_ANGLE == 1)
  {
    var index = 12;
    var appendString = "";
    for (var i = 0; i < 8; i++)
    {
      appendString += '<tr>';
      for (var j = 0; j < 8; j++)
      {
        index += 10;
        if(board[index][0] != 'available')
        {
          appendString += '<th>'+ boardSYMBOL[index] + '/' + board[index][1] +'</th>'; // change 1 to 0
        }
        else
        {
          appendString += '<th>'+ ' ' + '/' + board[index][1] +'</th>';
        }
      }
      appendString += '</tr>';
      $('#chess_table').append(appendString);
      appendString = "";
      index = index - 80 + 1;
    }
  }
}

function changepos(pos)
{
  if(CURRENT_TURN.charAt(0).toUpperCase() == board[pos][0].charAt(0).toUpperCase())
  {
    //----------Getting the possible moves--------------//
    var objectName = board[pos][0];
    if (objectName != null)
    {
      for (var a = 0; a < objects.length; a++)
      {
        if(objects[a].getName() == objectName)
        {
          var moves = (objects[a].getPossibleMoves());
        }
      }
    }
    CURRENT_POSSIBLEMOVES = moves;
    //----------Getting the possible moves--------------//

    $("#chess_table").html("");
    var index = 92;
    var appendString = "";

    for (var i = 8; i > 0; i--)
    {
      appendString += '<tr>';
      appendString += '<td>' + i + '</td>';
      for(var j = 0 ; j < 8 ; j++)
      {
        var check = true;
        if(moves != null)
        {
                    for (var c = 0; c < moves.length; c++)
                    {
                      if (index == moves[c])
                      {
                        if(board[index][0] != 'available')
                        {
                          appendString += '<td><a href="#!" onclick="changepos('+ index +')" style="background-color:rgb(204,102,0); outline: 4px solid rgb(105,105,105); outline-offset:-4px;">'+ boardSYMBOL[index] +'</a></td>'; // change 1 to 0
                        }
                        else
                        {
                          appendString += '<td><a href="#!" onclick="changepos('+ index +')" style="background-color:rgb(204,102,0); outline: 4px solid rgb(105,105,105); outline-offset:-4px;">'+ ' ' +'</a></td>'; // change 1 to 0
                        }
                        check = false;
                      }
                    }
        }

        if(check == true)
        {
          if(board[index][0] != 'available')
          {
            if (index == pos)
            {
              appendString += '<td><a href="#!" onclick="changepos('+ index +')" style="outline: 4px solid yellow; outline-offset:-4px; background-color:grey;">'+ boardSYMBOL[index] +'</a></td>'; // change 1 to 0

              var objectName = board[index][0];
              for (var s = 0; s < objects.length; s++)
              {
                if(objects[s].getName() == objectName)
                {
                  CURRENT_OBJECTINDEX = s;
                }
              }
            }
            else
            {
              appendString += '<td><a href="#!" onclick="changepos('+ index +')">'+ boardSYMBOL[index] +'</a></td>'; // change 1 to 0
            }

          }
          else
          {
              appendString += '<td><a href="#!" onclick="changepos('+ index +')">'+ ' ' +'</a></td>'; // change 1 to 0
          }
        }
        index = index + 1;
      }
      appendString += '</tr>';
      $('#chess_table').append(appendString);
      appendString = "";
      index = index - 18;
    }
    $('#chess_table').append("<tr><td></td><td>a</td><td>b</td><td>c</td><td>d</td><td>e</td><td>f</td><td>g</td><td>h</td></tr>");

  }
  else
  {
    if(CURRENT_POSSIBLEMOVES != null)
    {
      for (var i = 0; i < CURRENT_POSSIBLEMOVES.length; i++)
      {
        if(CURRENT_POSSIBLEMOVES[i] == pos)
        {
          objects[CURRENT_OBJECTINDEX].move(board[pos][1]);
          break;
        }
      }
      CURRENT_POSSIBLEMOVES = null;
      printBoard();
    }
  }
}

function pos_to_tableLocation()
{
  var index = 92;
  var table_i = 0;
  var table_j = 1;

  for (var i = 8; i > 0; i--)
  {
    for(var j = 0 ; j < 8 ; j++)
    {
      if(pos == index)
      {
        return {table_i, table_j};
      }
      index = index + 1;
      table_j += 1;
    }
    index = index - 18;
    table_i += 1;
    table_j = 1;
  }

  return false;
}

function putPieces()
{
  var i = 0;
  objects[i] = new pawnObject('white', 32); i++;
  objects[i] = new pawnObject('white', 33); i++;
  objects[i] = new pawnObject('white', 34); i++;
  objects[i] = new pawnObject('white', 35); i++;
  objects[i] = new pawnObject('white', 36); i++;
  objects[i] = new pawnObject('white', 37); i++;
  objects[i] = new pawnObject('white', 38); i++;
  objects[i] = new pawnObject('white', 39);  i++;

  objects[i] = new pawnObject('black', 82);  i++;
  objects[i] = new pawnObject('black', 83);  i++;
  objects[i] = new pawnObject('black', 84);  i++;
  objects[i] = new pawnObject('black', 85);  i++;
  objects[i] = new pawnObject('black', 86);  i++;
  objects[i] = new pawnObject('black', 87);  i++;
  objects[i] = new pawnObject('black', 88);  i++;
  objects[i] = new pawnObject('black', 89);  i++;

  objects[i] = new rookObject('black', 92);  i++;
  objects[i] = new rookObject('black', 99);  i++;

  objects[i] = new rookObject('white', 22);  i++;
  objects[i] = new rookObject('white', 29);  i++;

  objects[i] = new bishopObject('white', 24);  i++;
  objects[i] = new bishopObject('white', 27);  i++;

  objects[i] = new bishopObject('black', 94);  i++;
  objects[i] = new bishopObject('black', 97);  i++;

  objects[i] = new knightObject('black', 93);  i++;
  objects[i] = new knightObject('black', 98);  i++;

  objects[i] = new knightObject('white', 23);  i++;
  objects[i] = new knightObject('white', 28);  i++;

  objects[i] = new queenObject('white', 25);  i++;
  objects[i] = new queenObject('black', 95);  i++;

  objects[i] = new kingObject('white', 26);  i++;
  objects[i] = new kingObject('black', 96);  i++;

}

function refresh()
{

  if(TABLE_ANGLE == 0)
  {
    $("#chess_table").html("");
    var index = 92;
    var appendString = "";

    for (var i = 8; i > 0; i--)
    {
      appendString += '<tr>';
      appendString += '<td>' + i + '</td>';
      for(var j = 0 ; j < 8 ; j++)
      {
        if(board[index][0] != 'available')
        {
          appendString += '<td><a href="#!">'+ boardSYMBOL[index] +'</a></td>'; // change 1 to 0
        }
        else
        {
          appendString += '<td><a href="#!">'+ ' ' +'</a></td>';
        }
        index = index + 1;
      }
      appendString += '</tr>';
      $('#chess_table').append(appendString);
      appendString = "";
      index = index - 18;
    }
    $('#chess_table').append("<tr><td></td><td>a</td><td>b</td><td>c</td><td>d</td><td>e</td><td>f</td><td>g</td><td>h</td></tr>");

  }
  else if (TABLE_ANGLE == 1)
  {
    var index = 12;
    for (var i = 0; i < 8; i++)
    {
      for (var j = 0; j < 8; j++)
      {
        index += 10;
        if(board[index][0] == 'available')
        {
          TABLE.rows[i].cells[j].innerHTML = " " + '/' + board[index][1];
        }
        else
        {
          TABLE.rows[i].cells[j].innerHTML = boardSYMBOL[index] + '/' + board[index][1];
        }
      }
      index = index - 80 + 1;
    }
  }



}

function changeTurn()
{
  if (CURRENT_TURN == "white's turn")
  {
    document.getElementById("turn_text").innerHTML = "black's turn";
    CURRENT_TURN = "black's turn";
  }
  else if (CURRENT_TURN == "black's turn")
  {
    document.getElementById("turn_text").innerHTML = "white's turn";
    CURRENT_TURN = "white's turn";
  }
}

function isCheckmate(name)
{
  var object = objects[findObject(name)];
  var king = objects[findObject(object.oppositeColor() + 'k')];

  var object_possibleMoves = object.getPossibleMoves();
  if(isCheck(object_possibleMoves,king) == true)
  {
    // check checkmate
    var king_possibleMoves = king.getPossibleMoves();
    var threats = possibleThreats(object.getName().charAt(0).toUpperCase());
    var arr = [];
    // check if the possible moves of king has a possible threat
    for (var i = 0; i < king_possibleMoves.length; i++)
    {
      if(threats.includes(king_possibleMoves[i]) == false)
      {
        arr.push(king_possibleMoves[i]);
      }
    }

    if(arr.length == 0)// if king cant move then try to capture the attacker.
    {
      // get possible attacks for kings color, and try to capture the attacker
      var king_defanceMoves = possibleDefance(king.getName().charAt(0));
      var possibleMoves = [];
      // can you block or capture the attacker
      /* possibilities:

        if attacker is:

        queen -> find the path between the king and queen
        bishop -> find the path between the king and queen
        knight -> only option is to capture it
        pawn -> capture it
        rook ->find the path between them
        king -> x

      */
      var attack_path = getPathMoves(object.getName(), object.getposition(), king.getposition());

      for (var i = 0; i < attack_path.length; i++)
      {
        for (var j = 0; j < king_defanceMoves.length; j++)
        {
          if(attack_path[i] == king_defanceMoves[j])
          {
            possibleMoves.push(attack_path[i]);
            break;
          }
        }
      }

      if(possibleMoves.length == 0)
      {
        alert("checkmate");
      }
      else
      {
        //return possibleMoves;
      }
      // 2 SECTION : CAN I CAPTURE,  CAN I BLOCK



      // for (var i = 0; i < king_defanceMoves.length; i++)
      // {
      //   for (var j = 0; j < object_possibleMoves.length; j++)
      //   {
      //     if(king_defanceMoves.includes(object_possibleMoves[j]) == true)
      //     {
      //       possibleMoves.push(king_defanceMoves[i]);
      //     }
      //   }
      // }
      //
      // if(possibleMoves.length == 0)
      // {
      //   alert("Checkmate");
      // }
      // else
      // {
      //   return possibleMoves();
      // }
    }

  }

//  findKing();
}

function getPathMoves(name, objectpos,kingpos)
{
  /* possibilities:

    if attacker is:

    queen -> find the path between the king and queen
    bishop -> find the path between the king and queen
    horse -> knight -> only option is to capture it
    pawn -> capture it
    rook ->find the path between them
    king -> x

  */

  var arr = []; // moves that can be blockd when check
  var currentpos = objectpos;

  if (name.charAt(1) == 'q')
  {
    if(currentpos > kingpos)
    {
      if (objectpos%10 > kingpos%10) // mid obj - top left king
      {
        while (true)
        {
            currentpos = currentpos - 11;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
      if (objectpos%10 < kingpos%10)
      {
        while (true)
        {
            currentpos = currentpos - 9;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
      if (objectpos%10 == kingpos%10)
      {
        while (true)
        {
            currentpos = currentpos - 10;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
    }

    if(currentpos < kingpos) // bottom side
    {
      if (objectpos%10 > kingpos%10) // mid obj - top left king
      {
        while (true)
        {
            currentpos = currentpos + 9;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
      if (objectpos%10 < kingpos%10)
      {
        while (true)
        {
            currentpos = currentpos + 11;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
      if (objectpos%10 == kingpos%10)
      {
        while (true)
        {
            currentpos = currentpos + 10;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
    }

  }

  else if (name.charAt(1) == 'h')//knight
  {
    arr.push(0);
  }

  else if (name.charAt(1) == 'b')//bishop +
  {
    if(currentpos > kingpos)
    {
      if (objectpos%10 > kingpos%10) // mid obj - top left king
      {
        while (true)
        {
            currentpos = currentpos - 11;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
      if (objectpos%10 < kingpos%10)
      {
        while (true)
        {
            currentpos = currentpos - 9;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
    }

    if(currentpos < kingpos) // bottom side
    {
      if (objectpos%10 > kingpos%10) // mid obj - top left king
      {
        while (true)
        {
            currentpos = currentpos + 9;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
      if (objectpos%10 < kingpos%10)
      {
        while (true)
        {
            currentpos = currentpos + 11;
            if(currentpos == kingpos){break;}
            arr.push(currentpos);
        }
      }
    }
  }

  else if (name.charAt(1) == 'p')// pawn +
  {
    if (name.charAt(0) == "W")
    {
      if(currentpos%10 > kingpos%10)
      {
        arr.push(currentpos-11);
      }
      if(currentpos%10 < kingpos%10)
      {
        arr.push(currentpos-9);
      }
    }
    else if (name.charAt(0) == "B")
    {
      if(currentpos%10 > kingpos%10)
      {
        arr.push(currentpos+9);
      }
      if(currentpos%10 < kingpos%10)
      {
        arr.push(currentpos+11);
      }
    }
  }

  else if (name.charAt(1) == 'r')
  {
    if(currentpos > kingpos)
    {
      while (true)
      {
          currentpos = currentpos - 10;
          if(currentpos == kingpos){break;}
          arr.push(currentpos);
      }
    }
    if(currentpos < kingpos) // bottom side
    {
      while (true)
      {
          currentpos = currentpos + 10;
          if(currentpos == kingpos){break;}
          arr.push(currentpos);
      }
    }

  }

  else if (name.charAt(1) == 'k')
  {
    alert("you can not check with king");2
  }
  arr.push(objectpos);
  return arr;
}

function possibleThreats(color)
{
  var possibleThreads = [];
  var temparr = [];
  for (var i = 0; i < objects.length; i++)
  {
    if(objects[i].getName().charAt(0).toUpperCase() == color)
    {
      temparr = objects[i].getpossibleAttacks();
      for (var j = 0; j < temparr.length; j++)
      {
        possibleThreads.push(temparr[j]);
      }
    }
  }
  return possibleThreads;
}

function possibleDefance(color)
{
  var possibleThreads = [];
  var temparr = [];
  for (var i = 0; i < objects.length; i++)
  {
    if(objects[i].getName() == color + "k")
    {
      // kings moves are already checked
    }
    else if(objects[i].getName().charAt(0).toUpperCase() == color)
    {
      temparr = objects[i].getPossibleMoves();
      for (var j = 0; j < temparr.length; j++)
      {
        possibleThreads.push(temparr[j]);
      }
    }

  }
  return possibleThreads;
}

function isCheck(object_possibleMoves,king)
{
  for (var i = 0; i < object_possibleMoves.length; i++)
  {
    if(object_possibleMoves[i] == king.getposition())
    {
      alert("check");
      return true;
    }
  }
  return false;
}

function findObject(name)
{
  for (var i = 0; i < objects.length; i++) {
    if(objects[i].getName() == name) {
      return i;
    }
  }
}

function findKing()
{
  var index = 92;
  var result;
  for (var i = 8; i > 0; i--)
  {
    for(var j = 0 ; j < 8 ; j++)
    {
      if (board[index][0] == name) {

      }
      index = index + 1;
    }
    index = index - 18;
  }
  return result;
}
