// const WHITE_KING = '\u2654';
// const WHITE_QUEEN = '\u2655';
// const WHITE_ROOK = '\u2656';
// const WHITE_BISHIP = '\u2657';
// const WHITE_KNIGHT = '\u2658';
// const WHITE_PAWN = '\u2659';
//
// const BLACK_KING = '\u265A';
// const BLACK_QUEEN = '\u265B';
// const BLACK_ROOK = '\u265C';
// const BLACK_BISHIP = '\u265D';
// const BLACK_KNIGHT = '\u265E';
// const BLACK_PAWN = '\u265F';

class Piece
{
  constructor()
  {
    this.previous_position;
  }

  oppositeColor()
  {
    if(this.color == 'black')
    {
      var character = 'W'
    }
    if(this.color == 'white')
    {
      var character = 'B'
    }
    return character;
  }

  getposition()
  {
    return this.position;
  }

  setposition(newPosition)
  {
    this.position = newPosition;
  }

  getName()
  {
    return this.name;
  }

  move(position2)
  {
    var possibleMoves = (this.getPossibleMoves());
    var printTable = this.constructTable(this.getPossibleMoves());
    var check = false;
    var j;
    for (var i = 0; i < possibleMoves.length; i++)
    {
      if(board[possibleMoves[i]][1] == position2)
      {
        j = i;
        check = true;
        break;
      }
    }
    console.log("tried to move to: " + possibleMoves[i] + " = " + position2);
    if(check == false)
    {
      console.log('not possible move');
      console.table(printTable);
      return false;
    }
    if(check == true)
    {
      if(board[possibleMoves[j]][0] != 'available')
      {
        var temp = board[possibleMoves[j]][0];
        for (var i = 0; i < objects.length; i++) {
          if(objects[i].getName() == temp){
            var index = i;
            break;
          }
        }
        objects.splice( index , 1 );
      }
      console.log('possible move');
      board[this.position][0] = 'available';
      boardSYMBOL[this.position] = ' ';
      this.previous_position = this.position;
      this.position = possibleMoves[j];
      board[possibleMoves[j]][0] = this.name;
      boardSYMBOL[possibleMoves[j]] = this.symbol;
      isCheckmate(this.name);
      changeTurn();
      console.table(printTable);
      return true;
    }

    console.table(printTable);
    //console.log('yooo');
    //console.table(board);
    refresh();
  }

  constructTable(arr)
  {
    var arr2 = [arr.length];

    for(var i = 0 ; i < arr.length ; i++)
    {
      arr2[i] = [2];
      arr2[i][0] = arr[i];
      arr2[i][1] = this.translageCoordinate(arr[i]);
    }

    return arr2;
  }

  translageCoordinate(input)
  {
    var index = 12;
    for (var i = 0; i < 8; i++)
    {
      for (var j = 0; j < 8; j++)
      {
        index += 10;
        if(index == input)
        {
          return board[index][1];
        }
      }
      index = index - 80 + 1;
    }

    return "not in the table range";
  }
}

class pawnObject extends Piece
{
  constructor(color, startPosition)
  {
    super();
    this.startPosition = startPosition;
    this.color = color;
    this.sign;
    if(this.color == 'black')
    {this.sign = '-'; this.symbol = '\u265F';}
    if(this.color == 'white')
    {this.sign = '+'; this.symbol = '\u2659';}

    this.position = startPosition;
    this.firstMove = true;

    if(this.color == "black")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'p' + PAWNID_BLACK;
      PAWNID_BLACK = PAWNID_BLACK + 1;
    }
    if(this.color == "white")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'p' + PAWNID_WHITE;
      PAWNID_WHITE = PAWNID_WHITE + 1;
    }
    board[startPosition][0] = this.name;
    boardSYMBOL[startPosition] = this.symbol;
    //console.table(board);
  }

  getPossibleMoves()
  {
    var possibleMoves = [];
    var eatMoves = [];
    var i = 0;
    if (this.position != this.startPosition)
    {
      this.firstMove = false;
    }
    //2 possibilities, if the pawn has not moved yet so it will be able to move 2 spaces
    // if it moved, it can eat or move forward if the space is available
    if(this.firstMove == true)
    {
      possibleMoves[i] = eval(this.position + this.sign + 20);
      i=i+1;
    }
    possibleMoves[i] = eval(this.position + this.sign + 10);
    i=i+1;
    eatMoves[0] = eval(this.position + this.sign + 11);
    i=i+1;
    eatMoves[1] = eval(this.position + this.sign + 9);
    i=i+1;

    var j = 0;
    var possibleMoves2 = [];

    for (var i = 0; i < possibleMoves.length; i++)
    {
      if(board[possibleMoves[i]][0] == 'available')
      {
        possibleMoves2[j] = possibleMoves[i];
        j++;
      }
    }

    for (var i = 0; i < eatMoves.length; i++)
    {
      var temp = board[eatMoves[i]][0];
      if(temp.charAt(0) == this.oppositeColor())
      {
        possibleMoves2[j] = eatMoves[i];
        j++;
      }
    }
    return possibleMoves2;
  }

  getpossibleAttacks()
  {
    var possibleMoves = [];
    var eatMoves = [];
    var i = 0;
    if (this.position != this.startPosition)
    {
      this.firstMove = false;
    }
    //2 possibilities, if the pawn has not moved yet so it will be able to move 2 spaces
    // if it moved, it can eat or move forward if the space is available
    if(this.firstMove == true)
    {
      possibleMoves[i] = eval(this.position + this.sign + 20);
      i=i+1;
    }
    possibleMoves[i] = eval(this.position + this.sign + 10);
    i=i+1;
    eatMoves[0] = eval(this.position + this.sign + 11);
    i=i+1;
    eatMoves[1] = eval(this.position + this.sign + 9);
    i=i+1;

    var j = 0;
    var possibleMoves2 = [];

    for (var i = 0; i < possibleMoves.length; i++)
    {
      if(board[possibleMoves[i]][0] == 'available')
      {
        possibleMoves2[j] = possibleMoves[i];
        j++;
      }
    }

    for (var i = 0; i < eatMoves.length; i++)
    {
      var temp = board[eatMoves[i]][0];
      if(temp.charAt(0) != 'error')
      {
        possibleMoves2[j] = eatMoves[i];
        j++;
      }
    }
    return possibleMoves2;
  }
}

class rookObject extends Piece
{
  constructor(color, startPosition)
  {
    super();
    this.color = color;
    if(this.color == 'black')
    {this.symbol = '\u265C';}
    if(this.color == 'white')
    {this.symbol = '\u2656';}

    this.position = startPosition;

    if(this.color == "black")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'r' + ROOKID_BLACK;
      ROOKID_BLACK = ROOKID_BLACK + 1;
    }
    if(this.color == "white")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'r' + ROOKID_WHITE;
      ROOKID_WHITE = ROOKID_WHITE + 1;
    }
    board[startPosition][0] = this.name;
    boardSYMBOL[startPosition] = this.symbol;
    //console.table(board);
  }

  getPossibleMoves()
  {
    var possibleMoves = [];
    var itemCount = 0;

    var i = 1;
    while (true) // horizontally rightwards
    {
      if(this.position+ (i*10) > 100)
      {
        break;
      }

      if((board[this.position+ (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
      }
      else if ((board[this.position + (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position - (i*10) < 20)
      {
        break;
      }

      if((board[this.position - (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
      }
      else if ((board[this.position - (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }


    var i = 1;
    while (true) // horizontally rightwards
    {
      var limit = ((Math.floor(this.position/10) + 1)*10)-1;
      if(this.position + (i) > limit)
      {
        break;
      }

      if((board[this.position + (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
      }
      else if ((board[this.position + (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    var i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position+ (i) < ((Math.floor(this.position/10))*10)+1)
      {
        break;
      }

      if((board[this.position - (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
      }
      else if ((board[this.position - (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    return possibleMoves;
  }

  getpossibleAttacks()
  {
    var possibleMoves = [];
    var itemCount = 0;

    var i = 1;
    while (true) // horizontally rightwards
    {
      if(this.position+ (i*10) > 100)
      {
        break;
      }

      if((board[this.position+ (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
      }
      else if ((board[this.position + (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
        break;
      }
      else if (board[this.position + (i*10)][0].charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position - (i*10) < 20)
      {
        break;
      }

      if((board[this.position - (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
      }
      else if ((board[this.position - (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
        break;
      }
      else if (board[this.position - (i*10)][0].charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }


    var i = 1;
    while (true) // horizontally rightwards
    {
      var limit = ((Math.floor(this.position/10) + 1)*10)-1;
      if(this.position + (i) > limit)
      {
        break;
      }

      if((board[this.position + (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
      }
      else if ((board[this.position + (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
        break;
      }
      else if (board[this.position + (i)][0].charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    var i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position+ (i) < ((Math.floor(this.position/10))*10)+1)
      {
        break;
      }

      if((board[this.position - (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
      }
      else if ((board[this.position - (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
        break;
      }
      else if (board[this.position - (i)][0].charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    return possibleMoves;
  }
}

class bishopObject extends Piece
{
  constructor(color, startPosition)
  {
    super();
    this.color = color;
    if(this.color == 'black')
    {this.symbol = '\u265D';}
    if(this.color == 'white')
    {this.symbol = '\u2657';}

    this.position = startPosition;

    if(this.color == "black")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'b' + BISHOPID_BLACK;
      BISHOPID_BLACK = BISHOPID_BLACK + 1;
    }
    if(this.color == "white")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'b' + BISHOPID_WHITE;
      BISHOPID_WHITE = BISHOPID_WHITE + 1;
    }
    board[startPosition][0] = this.name;
    boardSYMBOL[startPosition] = this.symbol;
    //console.table(board);
  }

  getPossibleMoves()
  {
    var possibleMoves = [];
    var itemCount = 0;

    var i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position + (11*i)][0];
      if(this.position + (11*i) > 98 || this.position + (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position + (9*i)][0];
      if(this.position + (9*i) > 98 || this.position + (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position - (9*i)][0];
      if(this.position - (9*i) > 98 || this.position - (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position - (11*i)][0];
      if(this.position - (11*i) > 98 || this.position - (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    return possibleMoves;
  }

  getpossibleAttacks()
  {
    var possibleMoves = [];
    var itemCount = 0;

    var i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position + (11*i)][0];
      if(this.position + (11*i) > 98 || this.position + (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
        break;
      }
      else if ((temp.charAt(0) == this.name.charAt(0).toUpperCase()))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position + (9*i)][0];
      if(this.position + (9*i) > 98 || this.position + (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
        break;
      }
      else if ((temp.charAt(0) == this.name.charAt(0).toUpperCase()))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position - (9*i)][0];
      if(this.position - (9*i) > 98 || this.position - (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
        break;
      }
      else if ((temp.charAt(0) == this.name.charAt(0).toUpperCase()))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position - (11*i)][0];
      if(this.position - (11*i) > 98 || this.position - (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
        break;
      }
      else if ((temp.charAt(0) == this.name.charAt(0).toUpperCase()))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    return possibleMoves;
  }
}

class knightObject extends Piece
{
  constructor(color, startPosition)
  {
    super();
    this.color = color;
    if(this.color == 'black')
    {this.symbol = '\u265E';}
    if(this.color == 'white')
    {this.symbol = '\u2658';}

    this.position = startPosition;

    if(this.color == "black")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'h' + KNIGHTID_BLACK; // h representing horse cause king will be k
      KNIGHTID_BLACK = KNIGHTID_BLACK + 1;
    }
    if(this.color == "white")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'h' + KNIGHTID_WHITE;
      KNIGHTID_WHITE = KNIGHTID_WHITE + 1;
    }
    board[startPosition][0] = this.name;
    boardSYMBOL[startPosition] = this.symbol;
    //console.table(board);
  }

  getPossibleMoves()
  {
    var possibleMoves = [];
    var itemCount = 0;

    if( board[this.position-21][0] == 'available' || board[this.position-21][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-21; itemCount++;}

    if( board[this.position-19][0] == 'available' || board[this.position-19][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-19; itemCount++;}

    if( board[this.position-12][0] == 'available' || board[this.position-12][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-12; itemCount++;}

    if( board[this.position-8][0] == 'available' || board[this.position-8][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-8; itemCount++;}

    if( board[this.position+21][0] == 'available' || board[this.position+21][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+21; itemCount++;}

    if( board[this.position+19][0] == 'available' || board[this.position+19][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+19; itemCount++;}

    if( board[this.position+12][0] == 'available' || board[this.position+12][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+12; itemCount++;}

    if( board[this.position+8][0] == 'available' || board[this.position+8][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+8; itemCount++;}

    return possibleMoves;
  }

  getpossibleAttacks()
  {
    var possibleMoves = [];
    var itemCount = 0;

    if( board[this.position-21][0] != 'error')
    {possibleMoves[itemCount] = this.position-21; itemCount++;}

    if( board[this.position-19][0] != 'error')
    {possibleMoves[itemCount] = this.position-19; itemCount++;}

    if( board[this.position-12][0] != 'error')
    {possibleMoves[itemCount] = this.position-12; itemCount++;}

    if( board[this.position-8][0] != 'error')
    {possibleMoves[itemCount] = this.position-8; itemCount++;}

    if( board[this.position+21][0] != 'error')
    {possibleMoves[itemCount] = this.position+21; itemCount++;}

    if( board[this.position+19][0] != 'error')
    {possibleMoves[itemCount] = this.position+19; itemCount++;}

    if( board[this.position+12][0] != 'error')
    {possibleMoves[itemCount] = this.position+12; itemCount++;}

    if( board[this.position+8][0] != 'error')
    {possibleMoves[itemCount] = this.position+8; itemCount++;}

    return possibleMoves;
  }
}

class queenObject extends Piece
{
  constructor(color, startPosition)
  {
    super();
    this.color = color;
    if(this.color == 'black')
    {this.symbol = '\u265B';}
    if(this.color == 'white')
    {this.symbol = '\u2655';}

    this.position = startPosition;

    if(this.color == "black")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'q';
    }
    if(this.color == "white")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'q';
    }
    board[startPosition][0] = this.name;
    boardSYMBOL[startPosition] = this.symbol;
    //console.table(board);
  }

  getPossibleMoves()
  {
    var possibleMoves = [];
    var itemCount = 0;

    var i = 1;
    while (true) // horizontally rightwards
    {
      if(this.position+ (i*10) > 100)
      {
        break;
      }

      if((board[this.position+ (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
      }
      else if ((board[this.position + (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position - (i*10) < 20)
      {
        break;
      }

      if((board[this.position - (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
      }
      else if ((board[this.position - (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }


    var i = 1;
    while (true) // horizontally rightwards
    {
      var limit = ((Math.floor(this.position/10) + 1)*10)-1;
      if(this.position + (i) > limit)
      {
        break;
      }

      if((board[this.position + (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
      }
      else if ((board[this.position + (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    var i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position+ (i) < ((Math.floor(this.position/10))*10)+1)
      {
        break;
      }

      if((board[this.position - (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
      }
      else if ((board[this.position - (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position + (11*i)][0];
      if(this.position + (11*i) > 98 || this.position + (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position + (9*i)][0];
      if(this.position + (9*i) > 98 || this.position + (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position - (9*i)][0];
      if(this.position - (9*i) > 98 || this.position - (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position - (11*i)][0];
      if(this.position - (11*i) > 98 || this.position - (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    return possibleMoves;
  }

  getpossibleAttacks()
  {
    var possibleMoves = [];
    var itemCount = 0;

    var i = 1;
    while (true) // horizontally rightwards
    {
      if(this.position+ (i*10) > 100)
      {
        break;
      }

      if((board[this.position+ (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
      }
      else if ((board[this.position + (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
        break;
      }
      else if ((board[this.position + (i*10)][0].charAt(0) == this.name.charAt(0).toUpperCase()))
      {
        possibleMoves[itemCount] = this.position+ (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position - (i*10) < 20)
      {
        break;
      }

      if((board[this.position - (i*10)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
      }
      else if ((board[this.position - (i*10)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
        break;
      }
      else if ((board[this.position - (i*10)][0].charAt(0) == this.name.charAt(0).toUpperCase()))
      {
        possibleMoves[itemCount] = this.position - (i*10);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }


    var i = 1;
    while (true) // horizontally rightwards
    {
      var limit = ((Math.floor(this.position/10) + 1)*10)-1;
      if(this.position + (i) > limit)
      {
        break;
      }

      if((board[this.position + (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
      }
      else if ((board[this.position + (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
        break;
      }
      else if ((board[this.position + (i)][0].charAt(0) == this.name.charAt(0).toUpperCase()))
      {
        possibleMoves[itemCount] = this.position+ (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    var i = 1;
    while (true) // horizontally leftwards
    {
      if(this.position+ (i) < ((Math.floor(this.position/10))*10)+1)
      {
        break;
      }

      if((board[this.position - (i)][0] == 'available'))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
      }
      else if ((board[this.position - (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
        break;
      }
      else if ((board[this.position - (i)][0].charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position + (11*i)][0];
      if(this.position + (11*i) > 98 || this.position + (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
        break;
      }
      else if (temp.charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position + (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position + (9*i)][0];
      if(this.position + (9*i) > 98 || this.position + (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
        break;
      }
      else if (temp.charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position + (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 + (i) < 10) // horizontally rightwards
    {
      var temp = board[this.position - (9*i)][0];
      if(this.position - (9*i) > 98 || this.position - (9*i) < 22){break;}
      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
        break;
      }
      else if (temp.charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position - (9*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    i = 1;
    while (this.position%10 - (i) > 0) // horizontally rightwards
    {
      var temp = board[this.position - (11*i)][0];
      if(this.position - (11*i) > 98 || this.position - (11*i) < 22){break;}

      if((temp == 'available'))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
      }
      else if ((temp.charAt(0) == this.oppositeColor()))
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
        break;
      }
      else if (temp.charAt(0) == this.name.charAt(0).toUpperCase())
      {
        possibleMoves[itemCount] = this.position - (11*i);
        itemCount++;
        break;
      }
      else
      {
        break;
      }
      i++;
    }

    return possibleMoves;
  }
}

class kingObject extends Piece
{
  constructor(color, startPosition)
  {
    super();
    this.color = color;
    if(this.color == 'black')
    {this.symbol = '\u265A';}
    if(this.color == 'white')
    {this.symbol = '\u2654';}

    this.position = startPosition;

    if(this.color == "black")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'k'; // h representing horse cause king will be k
    }
    if(this.color == "white")
    {
      this.name = this.color.charAt(0).toUpperCase() + 'k';
    }
    board[startPosition][0] = this.name;
    boardSYMBOL[startPosition] = this.symbol;
    //console.table(board);
  }

  getPossibleMoves()
  {
    var possibleMoves = [];
    var itemCount = 0;
    var temp = board[this.position-22][0];

    if( board[this.position-11][0] == 'available' || board[this.position-11][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-11; itemCount++;}

    if( board[this.position-10][0] == 'available' || board[this.position-10][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-10; itemCount++;}

    if( board[this.position-9][0] == 'available' || board[this.position-9][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-9; itemCount++;}

    if( board[this.position-1][0] == 'available' || board[this.position-1][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position-1; itemCount++;}

    if( board[this.position+1][0] == 'available' || board[this.position+1][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+1; itemCount++;}

    if( board[this.position+9][0] == 'available' || board[this.position+9][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+9; itemCount++;}

    if( board[this.position+10][0] == 'available' || board[this.position+10][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+10; itemCount++;}

    if( board[this.position+11][0] == 'available' || board[this.position+11][0].charAt(0) == this.oppositeColor() )
    {possibleMoves[itemCount] = this.position+11; itemCount++;}

    var threats =  possibleThreats(this.oppositeColor());
    var arr = [];
    // check if the possible moves of king has a possible threat
    for (var i = 0; i < possibleMoves.length; i++)
    {
      if(threats.includes(possibleMoves[i]) == false)
      {
        arr.push(possibleMoves[i]);
      }
    }

    return arr;
  }

  getpossibleAttacks()
  {
    var possibleMoves = [];
    var itemCount = 0;
    var temp = board[this.position-22][0];

    if( board[this.position-11][0] != 'error' )
    {possibleMoves[itemCount] = this.position-11; itemCount++;}

    if( board[this.position-10][0] != 'error')
    {possibleMoves[itemCount] = this.position-10; itemCount++;}

    if( board[this.position-9][0] != 'error')
    {possibleMoves[itemCount] = this.position-9; itemCount++;}

    if( board[this.position-1][0] != 'error')
    {possibleMoves[itemCount] = this.position-1; itemCount++;}

    if( board[this.position+1][0] != 'error')
    {possibleMoves[itemCount] = this.position+1; itemCount++;}

    if( board[this.position+9][0] != 'error')
    {possibleMoves[itemCount] = this.position+9; itemCount++;}

    if( board[this.position+10][0] != 'error')
    {possibleMoves[itemCount] = this.position+10; itemCount++;}

    if( board[this.position+11][0] != 'error')
    {possibleMoves[itemCount] = this.position+8; itemCount++;}

    return possibleMoves;
  }
}
