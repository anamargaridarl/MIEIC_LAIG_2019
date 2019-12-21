%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INCLUDE FILES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- consult('boardDisplay.pl').
:- consult('boards.pl').
:- consult('verifyGameState.pl').
:- consult('filling.pl').
:- consult('adjacents.pl').
:- consult('computer.pl').
:- consult('menu.pl').
:- consult('server.pl').
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% HELPER FUNCTIONS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

switch(X,[Val:Goal | Cases]) :-
  (X=Val -> call(Goal) ; switch(X, Cases)).

%isT(+Id)
%verify if piece is a triangle based on it's Id
isT(Id):- (Id == 3;Id ==4; Id ==5; Id ==6).

%isR(+Id)
%verify if piece is a rectangle based on it's Id
isR(Id):- (Id == 1;Id ==2).

% getId(+Piece,+Id)
% Get Id from Piece
% Piece's format: [ [Row,Col], [Cor,Id] ] 
% Use in auxiliar structure predicates and valid_plays
getId(Piece,Id):-
  [_|[Id|_]] = Piece.

%isRectangle(+Piece,+Id)
%verify if is Piece is rectangle and gets it's Id
isRectangle(Piece,Id):-
  getId(Piece,IdAux),
  isR(IdAux),
  Id is IdAux.

%isTri(+ID,+Tri) 
%Conversion from Id to T identifier
isTri(ID,Tri) :-
  ID == 0, Tri = -1;
  (ID == 1; ID == 2), Tri = -2;
  (ID == 3; ID == 5), Tri = 0;
  (ID == 4; ID == 6), Tri = 1.

getOposPlayer(Player,Opos) :-
  (Player == 1, Opos = 2);
  (Player == 2, Opos = 1).  

%getFullPiece(+Col,+Row,+Board,+Piece) 
%based on Row and Column get Piece from board 
%Piece's format: [[Row,Col],[Color,Id]]
getFullPiece(Col,Row,Board,[[_,_],Info]) :-
  getPiece(Col,Row,Board,Info).

%getPiece(+Col,+Row,+Board,+Piece)
%get Piece from board based on Column and Row
%Piece's format: [Color,Id]
getPiece(Col,Row,Board,Piece):-
  nth1(Row,Board,RowAux,_),
  nth1(Col,RowAux,Piece,_).

%_________________ getShapeAddCoord Auxiliar Functions _________________%

%getTriangleUp(+Col,+Row,+Board,+Piece)
%get upper triangle from board based on Row and Column
getTriangleUp(Col,Row,Board,Piece):-
  getPiece(Col,Row,Board,PieceAux),
  PieceAux = [Piece|_].   

%getTriangleDown(+Col,+Row,+Board,+Piece)
%get lower triangle from board based on Row and Column
getTriangleDown(Col,Row,Board,Piece):-
  getPiece(Col,Row,Board,PieceAux),
  PieceAux = [_|[Piece|_]].

%getShapeRecSq(+Row,+Col,+Board,+Piece,+T)
%get rectangle or square from board based on Row and Column
%updates T identifier
getShapeRecSq(Row,Col,Board,Piece,T):-
      getPiece(Col,Row,Board,Piece),
      getId(Piece,Id),
      isTri(Id,T).                      

%getShapeAddCoord(+Board,+Row,+Col,+Tri,+Tout,+Piece) 
%get piece from board based on input from user
%Piece fomat: [[Row,Column],[Color,Id]]
getShapeAddCoord(Board,Row,Col,Tri,Tout,Piece) :-
  switch(Tri,[
    -1:getShapeRecSq(Row,Col,Board,PieceAux,Tout),
    0: (getTriangleUp(Col,Row,Board,PieceAux), Tout is Tri),
    1: (getTriangleDown(Col,Row,Board,PieceAux),  Tout is Tri)
  ]),
  append([[Row,Col]],[PieceAux],Piece).


%___________________addPlayAux - Auxiliar Functions _______________________%

%addAuxSq(+Col,+Row,+Board,+AuxIn,+AuxOut)
%add square pieces to auxiliar structure
addAuxSq(Col,Row,Board,AuxIn,AuxOut):-
    getPiece(Col,Row,Board,Piece),               %get piece
    append([[[Row,Col],Piece]], AuxIn, AuxOut).   %add to auxiliar structure

%addAuxRec(+Col,+Row,+Board,+AuxIn,+AuxOut)
%add rectangle pieces based on its coordinates to auxiliar structure (AuxOut)
addAuxRec(Col,Row,Board,AuxIn,AuxOut):-
    getPiece(Col,Row,Board,Piece),               
    adjRect(Board,Row,Col,Pieces,Piece), 
    append(Pieces, AuxIn, AuxOut).

%addAuxTriangleUp(+Col,+Row,+Board,+AuxIn,+AuxOut)
%add triangle up piece based on its coordinates to auxiliar structure (AuxOut)
addAuxTriangleUp(Col,Row,Board,AuxIn,AuxOut):-
  getTriangleUp(Col,Row,Board,Piece),          
  append([[[Row,Col],Piece]], AuxIn, AuxOut).

%addAuxTriangleDown(+Col,+Row,+Board,+AuxIn,+AuxOut)
%add triangle down based on its coordinates to auxiliar structure (AuxOut)
addAuxTriangleDown(Col,Row,Board,AuxIn,AuxOut):-
  getTriangleDown(Col,Row,Board,Piece),
  append([[[Row,Col],Piece]], AuxIn, AuxOut).


%____________________ valid_moves Auxiliar Functions_____________________________%

%validMovesAux(+Board,+Adjacents,+PossiblePlaysOut,+PossiblePlaysOut).
%Adds to a list(PossilePlaysOut) the adjacent pieces of the ones already played on board(Adjacents)
validMovesAux(_,[],PossiblePlaysOut,PossiblePlaysOut).
validMovesAux(Board,[Piece|Rest],PossiblePlaysIn,PossiblePlaysOut):-
  lookForAdjacent(Board,Piece, Adjacents),
  append(Adjacents,PossiblePlaysIn,T),
  sort(T,T1),
  validMovesAux(Board,Rest,T1,PossiblePlaysOut).

%removePiecesOnBoard(+Aux,+List,+List2):-
%remove the pieces already played(Aux) from possible valid pieces for the next play(List) 
%List2 - list with removed pieces
removePiecesOnBoard([],List2,List2).
removePiecesOnBoard([Piece|Rest],List,List2):-
  delete(List,Piece,T),
  removePiecesOnBoard(Rest,T,List2).

%______________________________________________________________________________%

%lookForAdjacent(+Board,+Piece,+Adjacents)
%look for Adjacents of a Piece
lookForAdjacent(Board,[Coord|[Info|_]],Adjacents):-
    (getId(Info,Id),
    Coord = [Row|[Col|_]]),
    ((Id == 3, adjacentUp3(Board,Col,Row,Adjacents));
    (Id == 4, adjacentDown4(Board,Col,Row,Adjacents));
    (Id == 5, adjacentUp5(Board,Row,Col,Adjacents));
    (Id == 6, adjacentDown6(Board,Col,Row,Adjacents));
    (Id == 0,adjacentSquare(Board,Col,Row,Adjacents));
    ((Id == 1; Id == 2),adjacentRectangle(Board,Col,Row,Adjacents) )
    ).


%_______________________________Display Possible Plays ________________________%

%printList(+List)
%List - format: [Row, Column]
%used on the display of possible plays
printList([Row|Column]):-
  writef('['),
  format('~w',Row),
  writef(','),
  Aux is Column+64,
  char_code(Aux2,Aux),
  format('~w',Aux2),
  writef(']').  

%removeform(+List,+ListAux,+ListOut)
%List - pieces's format: [[Row,Column],[Color,Id]]
%ListOut - pieces's format: [Row,Column]
%used in the first list of possible plays (all the triangles of the board)
removeform([],ListAux,ListAux).
removeform([[Coord|_]|Rest],ListAux,ListOut):-
  removeform(Rest,[Coord|ListAux],ListOut).

%printPossibleMoves2(+PossiblePlaysList)
%PossiblePlaysList - piece's format: [Row,Column]
%used as auxiliar to the print of begining list
printPossibleMoves2([]).
printPossibleMoves2([X|Rest]):-
  printList(X),writef(','),
  printPossibleMoves2(Rest).

%printPossibleMoves(+PossiblePlays)
%print possible plays into the screen - begining list
%PossiblePlays - pieces's format: [[Row,Column],[Color,Id]]
printPossibleMoves(PossiblePlays):-
  buildTriList(T),
  PossiblePlays == T,
  removeform(PossiblePlays,[],ListOut),
  sort(ListOut,L),
  printPossibleMoves2(L).

%printPossibleMoves(+PossiblePlays)
%print possible plays into the screen
%PossiblePlays - piece's format: [Row,Column]
printPossibleMoves([]).
printPossibleMoves([[Coord|_]|Rest]):-
  printList(Coord),writef(','),
  printPossibleMoves(Rest).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% GAME LOGIC %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%game_over(+State):-
% State: 0 - continue; 1- Player 1 wins; 2- Player 2 wins; 3- Tie game
% asserts state of game and display message in case of final states
game_over(State):-
  (State == 0,fail);
  (State == 1, winMessage(State),!);
  (State == 2, winMessage(State),!);
  (State == 3, tieMessage(),!).


%validPlay(+Piece,+PossiblePlays):-
%Pieces - [ [Row,Col], [Color,Id] ]
%validates if choosen piece is valid to play at the moment
validPlay(Piece,PossiblePlays):-
  (buildTriList(T),
   PossiblePlays == T,
   Piece = [_|[Info|_]],
   getId(Info,Id),
   isT(Id));
  member(Piece,PossiblePlays).

%valid_moves(+Board,+Aux,+PossiblePlays)
%calculate possible plays based on already played pieces - Aux
valid_moves(_,[],NoAux) :- buildTriList(NoAux).
valid_moves(Board,Aux,NoAux):-
  validMovesAux(Board,Aux,[],PossiblePlaysOut),          %adds all adjacent pieces to those played
  removePiecesOnBoard(Aux,PossiblePlaysOut,NoAux).       %removes from upper list the pieces that were already played

%addPlayAux(+AuxIn,+Board,+Col,+Row,+T, +AuxOut)
%add played piece to auxiliar structure - AuxOut
addPlayAux(AuxIn,Board,Col,Row,T, AuxOut):-
    switch(T,[
    -1:addAuxSq(Col,Row,Board,AuxIn,AuxOut),
    -2:addAuxRec(Col,Row,Board,AuxIn,AuxOut),
    0:addAuxTriangleUp(Col,Row,Board,AuxIn,AuxOut),
    1:addAuxTriangleDown(Col,Row,Board,AuxIn,AuxOut)
  ]).

%move(+Player, +Board, +AuxIn, +AuxOut,+BoardOut,+StateOut)
%related to one play
move(Player, Board, AuxIn, AuxOut,BoardOut,StateOut):-
  display_game(Board,Player),!,                          %display board with last move
  valid_moves(Board,AuxIn,PossiblePlays),                %compute possible plays --> format: [[Row,Col],[Color,Id]],...
  writef('Possible Plays'),nl,                           %print possible plays --> format: [Row,Col],...
  printPossibleMoves(PossiblePlays),nl,
  repeat,
  getPlayInfo(Col,Row,T),                                %process play from user input (Error proof)
  getShapeAddCoord(Board,Row,Col,T,Tout,Piece),          %fetch played piece from board --> board piece format: [Color,Id]; 'Piece' format: [[Row,Col],[Color,Id]]
  validPlay(Piece,PossiblePlays),                        %validate play - true if Piece is in possible plays list
  fillPiece(Board,Row,Col,Tout,Player,BoardOut),         %fill played piece color field in board 
  addPlayAux(AuxIn,BoardOut,Col,Row,Tout, AuxOut),       %add played piece to auxiliar structure --> pieces format: [[Row,Col],[Color,Id]] 
  value(BoardOut,AuxOut,StateOut).                       %evalues game state 

%choose_move(+Player,+Board,+AuxIn,-AuxOut,-BoardOut,-StateOut,+Lvl)  
choose_move(Player, Board, AuxIn, AuxOut,BoardOut,StateOut,0) :-
  display_game(Board,Player),!,
  sleep(1),    
  valid_moves(Board,AuxIn,PossiblePlays),
  repeat,
  getRandomPiece(PossiblePlays,Row,Col,T),               %differs from move because the piece played will be obatined randomly
  fillPiece(Board,Row,Col,T,Player,BoardOut),        
  addPlayAux(AuxIn,BoardOut,Col,Row,T, AuxOut),
  value(BoardOut,AuxOut,StateOut).

choose_move(Player, Board, AuxIn, AuxOut,BoardOut,StateOut,1) :-
  display_game(Board,Player),!,
  sleep(1),
  valid_moves(Board,AuxIn,PossiblePlays),
  repeat,
  getGreedyPiece(Board,AuxIn,Player,PossiblePlays,Row,Col,T), %instead of choosing randomly, decided which piece is best with a greedy strategy
  fillPiece(Board,Row,Col,T,Player,BoardOut),        
  addPlayAux(AuxIn,BoardOut,Col,Row,T, AuxOut),
  value(BoardOut,AuxOut,StateOut).

%twoPlayerGame(+Board,+Aux,+StateOut)
%The boco game with 2-player mode.
twoPlayerGame(Board,Aux,StateOut):-
  (game_over(StateOut);
  (clear,move(1,Board,Aux,Aux2,BoardOut,StateOut2),
  (game_over(StateOut2);
  (clear,move(2,BoardOut,Aux2,AuxF,BoardOut2,StateOut3),
  twoPlayerGame(BoardOut2,AuxF,StateOut3),!)))).                      

%cpuHumanGame(+Board,+Aux,+Lvl)
%The boco game with 1-player mode where the computer makes the first move.
%Depending on the value of Lvl, the computer will make a move following
%different strategies.
cpuHumanGame(Board,Aux,Lvl) :-
  clear,choose_move(1,Board,Aux,Aux2,BoardOut,StateOut,Lvl),
  (game_over(StateOut);
  (clear,move(2,BoardOut,Aux2,AuxF,BoardOut2,StateOut2),!,
  (game_over(StateOut2);
  (cpuHumanGame(BoardOut2,AuxF,Lvl),!)))).

%humanCPUGame(+Board,+Aux,+StateOut)
%The boco game with 1-player mode where the user makes the first move.
%Same as above, the computer will behave differently according to the
%difficulty level.
humanCPUGame(Board,Aux,Lvl) :-
  clear,move(1,Board,Aux,Aux2,BoardOut,StateOut),
  (game_over(StateOut);
  (clear,choose_move(2,BoardOut,Aux2,AuxF,BoardOut2,StateOut2,Lvl),!,
  (game_over(StateOut2);
  (humanCPUGame(BoardOut2,AuxF,Lvl),!)))).

%twoComputerGame(+Board,Aux,+Lvl1,+Lvl2)
%the boco game with two computer mode, the user will spectate will the computer
%plays against himself
%As before both computer bots will have their difficulty level set.
twoComputerGame(Board,Aux,Lvl1,Lvl2) :-
  clear,choose_move(1,Board,Aux,Aux2,BoardOut,StateOut,Lvl1),
  (game_over(StateOut);
  (clear,choose_move(2,BoardOut,Aux2,AuxF,BoardOut2,StateOut2,Lvl2),!,
  (game_over(StateOut2);
  (twoComputerGame(BoardOut2,AuxF,Lvl1,Lvl2),!)))).

