%%%%%%%%%%%%%%%%% Evaluation functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- use_module(library(random)).
  
%%%%%%% Level 0 AI %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%getRandomPiece(+PossList,-Row,-Col,-Tri)
%Computer will select randomly one of the possible pieces
%it has to play
getRandomPiece(PossList,Row,Col,Tri) :-
  length(PossList,Size),
  random(1, Size, N),
  nth1(N,PossList,[[Row,Col],[_,ID]],_),
  isTri(ID,Tri).

%%%%%% Level 1 AI %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%getGreedyPiece(+TabIn,+Played,+Player,+PossList,-Row,-Col,-Tri)
%Computer will play each possible piece and select the one that
%gives the opponent the lowest number of possible plays.
%The idea is that the less possible plays, the more restricted the
%opponent is, therefore being a greedy strategy.
getGreedyPiece(TabIn,Played,Player,[First|Rest],Row,Col,Tri) :-
  evalPiece(TabIn,Played,Player,First,N),
  getMinValue(TabIn,Played,Player,Rest,N,First,Best),
  Best = [[Row,Col],[_,ID]],
  isTri(ID,Tri).

%getMinValue(+TabIn,+Played,+Player,+PossList,-N,+Aux,-Best)
%Search in the possible pieces list and evaluate them, looking
%for the one that gets the minimum (best) outcome possible.
%The value of a play is the number of plays that the opponent can make
%that on its adjacent pieces. The less it has, the more surrounded it is.
getMinValue(_,_,_,[],_,Best,Best).
getMinValue(TabIn,Played,Player,[Piece|Rest],N,Aux,Best) :-
  evalPiece(TabIn,Played,Player,Piece,TempN),
  ((TempN @> N, getMinValue(TabIn,Played,Player,Rest,TempN,Piece,Best));
  getMinValue(TabIn,Played,Player,Rest,N,Aux,Best)).

%evalPiece(+Tabin,+Played,+Player,+Piece,-N)
%In order to evaluate a piece, it makes a simulation of the play
%analysing the possible moves, then gets the plays already made by the
%opponent and gets its adjacents, crossmatching with the valid moves
%returning the number of matches made (length of the intersection)
evalPiece(TabIn,Played,Player,[[Row,Col],[_,ID]],N) :-
  makeFakeMove(TabIn,Played,Player,Row,Col,ID,Played2,TabOut),
  valid_moves(TabOut,Played2,ToPlay),
  getOposPlayer(Player,Opponent),
  getPlayerPieces(Played2,Opponent,OppPieces),
  getAllAdjacents(TabOut,OppPieces,Adjacents),
  intersection(Adjacents,ToPlay,PlayerPoss),
  length(PlayerPoss,NumAux),
  N is 0-NumAux.

%makeFakeMove(+TabIn,+Played,+Player,+Row,+Col,+ID,-PlayedOut,-TabOut)
%Works as the move/6 predicate, except the graphic interface is left out
%since its purpose is only to retrive internal data on move of a given piece
makeFakeMove(TabIn,Played,Player,Row,Col,ID,PlayedOut,TabOut):-
  isTri(ID,T),
  fillPiece(TabIn,Row,Col,T,Player,TabOut),
  addPlayAux(Played,TabOut,Col,Row,T, PlayedOut).

%getPlayerPieces(+Played,+Player,-Pieces)
%Searches the played pieces list, retrieving those belonging
%to a given player
getPlayerPieces([],_,[]).
getPlayerPieces([Elem|Rest],Player,[E2|Rest2]) :-
  Elem = [_,[Fill,_]],
  Fill == Player,
  E2 = Elem, 
  getPlayerPieces(Rest,Player,Rest2).

getPlayerPieces([_|Rest],Player,ListOut) :-
  getPlayerPieces(Rest,Player,ListOut).

%getAllAdjacents(+TabIn,+OppPieces,-Adjacents)
%Retrieves all pieces adjacent to the pieces played
%by the opponent
getAllAdjacents(TabIn,OppPieces,Adjacents) :-
  getAllAdjacents(TabIn,OppPieces,[],Adjacents).

getAllAdjacents(_,[],Adjacents,Adjacents).
getAllAdjacents(TabIn,[Piece|Rest],Aux,Adjacents) :-
  lookForAdjacent(TabIn,Piece,Adjs),
  append(Adjs,Aux,NewAux),
  getAllAdjacents(TabIn,Rest,NewAux,Adjacents).
