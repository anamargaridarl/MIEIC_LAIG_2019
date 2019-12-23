%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Verify Game State %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%verifyAdjPieceState(+TabIn,+Player,+Adj,+InPlay,-InPlay2,-TabOut,-PieceState)
%Very similar to verifyPieceState/6, except that recieves a piece to check externally
%to the pieces in play and then removes it from the list
verifyAdjPieceState(TabIn,Player,Adj,InPlay,InPlay2,TabOut,PieceState) :-
  Adj = [[Row,Col],[_,ID]],
  lookForAdjacent(TabIn,Adj,Adjs),
  checkAdjs(Adjs,Player,AdjcentTo,[],Result),
  isTri(ID,Tri),
  getOposPlayer(Player,Opos),
  ((Result == 0, InPlay2 = InPlay, fillPiece(TabIn,Row,Col,Tri,0,TabOut), PieceState = 0);
  (Result == 1, fillPiece(TabIn,Row,Col,Tri,Opos,AuxTab), select(Adj,InPlay,InPlayO), processAdjs(AuxTab,Player,AdjcentTo,InPlayO,InPlay2,TabOut,PieceState));
  (Result == 2, PieceState = 1, TabOut = TabIn)).


%processAdjs(+TabIn,+Player,+Adjs,+Inplay,-InPlay2,-TabOut,-PieceState)
%Process adjacents of a piece sequentially, and if one of them is free then the main piece
%is free. Otherwise, if the processing reaches its end, it means the block is trapped
processAdjs(TabOut,_,[],_,_,TabOut,1).

processAdjs(TabIn,Player,[Adj|Rest],InPlay,InPlay2,TabOut,PieceState):-
  verifyAdjPieceState(TabIn,Player,Adj,InPlay,InplayO,AuxTab,PieceResult),
  ((PieceResult == 0, PieceState = 0, TabOut = AuxTab);
  processAdjs(AuxTab,Player,Rest,InplayO,InPlay2,TabOut,PieceState)).
  
%checkAdjs(+Adjs,+Player,-AdjacentTo,?Temp,-Result)
%To check adjacents, we check if piece is empty or belongs to the player (and/or rectangle),
%Save adjacent pieces of the same player in a list and determine the result in the end
%Result: 0 - Piece is safe 1 - Piece has adjacents of the same player 2 - Piece is surrounded
checkAdjs(List,_,Temp,Temp,Result):-
  List == [],(Temp == [], Result = 2; Result = 1).

checkAdjs([Piece|Rest],Player, AdjcentTo,Temp,Result):-
  Piece = [_,[Fill,Type]],
  (((Fill == 0; (Fill == Player, (Type == 1; Type == 2))), Result = 0);
  (Fill == Player, append(Temp,[Piece],TempN), checkAdjs(Rest,Player,AdjcentTo,TempN,Result));
  checkAdjs(Rest,Player,AdjcentTo,Temp,Result)).

%verifyPieceState(+TabIn,+Player,+InPlay,-InPlay2,-TabOut,-PieceState)
%To verify a piece state, get adjacents, check them, and analyze adjacent pieces of the same player
%With a DFS-like solution
%PieceState: 0 - Piece is safe 1 - Piece or block is surrounded
verifyPieceState(TabIn,Player,[Piece|Rest],InPlay2,TabOut,PieceState) :-
  Piece = [[Row,Col],[Fill,ID]],
  (((\+(Fill == Player); ID == 1; ID == 2), InPlay2 = Rest, TabOut = TabIn, PieceState = 0);
  (lookForAdjacent(TabIn,Piece,Adjs),
  checkAdjs(Adjs,Player,AdjcentTo,[],Result),
  isTri(ID,Tri),
  getOposPlayer(Player,Opos),
  ((Result == 0, InPlay2 = Rest, fillPiece(TabIn,Row,Col,Tri,0,TabOut), PieceState = 0);
  (Result == 1, fillPiece(TabIn,Row,Col,Tri,Opos,AuxTab), processAdjs(AuxTab,Player,AdjcentTo,Rest,InPlay2,TabOut,PieceState));
  (Result == 2, PieceState = 1,TabOut = TabIn)))).  

%verifyPlayerState(+TabIn,+Player,+InPlay,-StateOut)
%To verify the player's state, verify all pieces in play in order to check 
%if some piece/pieces belonging to the player is surrounded
%StateOut: 0 - Player continues; 1 - Player loses
verifyPlayerState(_,_,[],0).
verifyPlayerState(TabIn,Player,InPlay,StateOut) :-
  verifyPieceState(TabIn,Player, InPlay, InPlay2, AuxTab, PieceState),
  ((PieceState == 0, verifyPlayerState(AuxTab,Player,InPlay2,StateOut));
  (PieceState == 1, getOposPlayer(Player,Opp),display_game(TabIn,Opp), StateOut = 1)).

%value(+TabIn,+InPlay,-StateOut)
%To verify game state, verify if player 1 and player 2 has some piece/pieces surrounded
% StateOut: 0 - continue; 1- Player 1 wins; 2- Player 2 wins; 3- Tie game
value(TabIn,InPlay,StateOut) :-
  verifyPlayerState(TabIn,1,InPlay,P1State), 
  verifyPlayerState(TabIn,2,InPlay,P2State), 
  ((P1State == 0, P2State == 0, StateOut = 0);
  (P1State == 0, P2State == 1, StateOut = 1);
  (P1State == 1, P2State == 0, StateOut = 2);
  (P1State == 1, P2State == 1, StateOut = 3)).

