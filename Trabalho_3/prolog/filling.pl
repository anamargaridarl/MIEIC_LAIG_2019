%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FILLING %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%___________Aux functions_______________________%
getPieceFillOther(TabIn,Row,Col,FillOut):-
  nth1(Row,TabIn,Line,_),
  nth1(Col,Line,[FillOut|_],_).

getPieceFillTriUp(TabIn,Row,Col,FillOut) :-
  nth1(Row,TabIn,Line,_),
  nth1(Col,Line,[[FillOut,_|_]|_],_).

getPieceFillTriDwn(TabIn,Row,Col,FillOut) :-
  nth1(Row,TabIn,Line,_),
  nth1(Col,Line,[_,[FillOut,_|_]|_],_).

getPieceFill(TabIn,Row,Col,Tri,FillOut) :-
  switch(Tri,[
    -2:getPieceFillOther(TabIn,Row,Col,FillOut),
    -1:getPieceFillOther(TabIn,Row,Col,FillOut),
    0:getPieceFillTriUp(TabIn,Row,Col,FillOut),
    1:getPieceFillTriDwn(TabIn,Row,Col,FillOut)
  ]).

%fillRectVert(+TabIn,+Row,+Col,+In,+In2,+Player,-TabOut)
%To fill a vertical rectangle, we need to search the pieces
%on top and below of the piece and fill the blank spots where
%the piece is the same type (ID) as the input one
fillRectVert(TabIn,Row,Col,ID,ID2,_,TabOut) :-
  ((Row @< 1; Row @>10), TabIn=TabOut);
  (getFullPiece(Col,Row,TabIn,[_,[Fill,_]|_]),
  (Fill \= 0;(ID \= ID2)),TabOut = TabIn).

fillRectVert(TabIn,Row,Col,ID,ID,Player,TabOut) :-
  fillPieceOther(TabIn,Row,Col,Player,AuxTab),
  RowB is Row - 1,
  RowA is Row + 1,
  (RowB @< 1;
  RowA @> 10;
  (getFullPiece(Col,RowB,AuxTab,[_,[_,IDB]|_]),
  getFullPiece(Col,RowA,AuxTab,[_,[_,IDA]|_]))),
  fillRectVert(AuxTab,RowB,Col,ID,IDB,Player,AuxTab2),
  fillRectVert(AuxTab2,RowA,Col,ID,IDA,Player,TabOut).

%fillRectHorz(+TabIn,+Row,+Col,+ID,+ID2,+Player,-TabOut)
%To fill a horizontal rectangle, we need to search the pieces
%on the sides of the piece and fill the blank spots where
%the piece is the same type (ID) as the input one
fillRectHorz(TabIn,Row,Col,ID,ID2,_,TabOut):-
  ((Col @< 1; Col @>10), TabIn=TabOut);
  (getFullPiece(Col,Row,TabIn,[_,[Fill,_]|_]),
  (Fill \= 0;(ID \= ID2)),TabOut = TabIn).

fillRectHorz(TabIn,Row,Col,ID,ID,Player,TabOut) :-
  fillPieceOther(TabIn,Row,Col,Player,AuxTab),
  ColB is Col - 1,
  ColA is Col + 1,
  (ColB @< 1;
  ColA @> 10;
  (getFullPiece(ColB,Row,AuxTab,[_,[_,IDB]|_]),
  getFullPiece(ColA,Row,AuxTab,[_,[_,IDA]|_]))),
  fillRectHorz(AuxTab,Row,ColB,ID,IDB,Player,AuxTab2),
  fillRectHorz(AuxTab2,Row,ColA,ID,IDA,Player,TabOut).

%fillRect(+TabIn,+Piece,+Player,-TabOut)
%Having a piece of a rectangle we need to check where the piece is
%and find whether the rectangle is vertical or horizontal
fillRect(TabIn,[[Row,Col],[_,ID]|_],Player,TabOut) :-
  (Row == 1, Col \= 1, fillRectHorz(TabIn,Row,Col,ID,ID,Player,TabOut));
  (Row == 10, Col \= 10, fillRectHorz(TabIn,Row,Col,ID,ID,Player,TabOut));
  fillRectVert(TabIn,Row,Col,ID,ID,Player,TabOut).

%fillPieceRect(+TabIn,+RowN,+ColN,+Player,-TabOut)
%Knowing that the piece is a rectangle, we need to get the piece
%from the board and then fill it
fillPieceRect(TabIn,RowN,ColN,Player,TabOut) :-
  nth1(RowN,TabIn,Row,_), %retrieve row
  nth1(ColN,Row,Info,_), %retrieve column and piece ID
  fillRect(TabIn,[[RowN,ColN],Info],Player,TabOut).

%fillPieceOther(+TabIn,+RowN,+ColN,+Player,-TabOut)
%To fill a standard piece (square/rectangle) we need to obtain the piece
%from the board where its stored in the format: [Fill,Type]
fillPieceOther(TabIn,RowN,ColN,Player,TabOut) :-
  nth1(RowN,TabIn,Row,NewTab), %retrieve row
  nth1(ColN,Row,[_|ID],NewRow), %retrieve column and piece ID
  nth1(ColN,NRow,[Player|ID],NewRow), %insert col into row
  nth1(RowN,TabOut,NRow,NewTab).  % insert row into tab

%fillPieceTriUp(+TabIn,+RowN,+ColN,+Player,-TabOut)
%To fill a up triangle piece, we need to obtain the piece
%from the board where its stored in the format: [[Fill,Type],_]
fillPieceTriUp(TabIn,RowN,ColN,Player,TabOut):-
  nth1(RowN,TabIn,Row,NewTab), %retrieve row
  nth1(ColN,Row,[[_,ID|_]|[Rest]],NewRow), %retrieve column and triangle piece ID
  nth1(ColN,NRow,[[Player,ID],Rest],NewRow), %insert col into row
  nth1(RowN,TabOut,NRow,NewTab). % insert row into tab

%fillPieceTriDwn(+TabIn,+RowN,+ColN,+Player,-TabOut)
%To fill a down triangle piece, we need to obtain the piece
%from the board where its stored in the format: [_,[Fill,Type]]
fillPieceTriDwn(TabIn,RowN,ColN,Player,TabOut):-
  nth1(RowN,TabIn,Row,NewTab), %retrieve row
  nth1(ColN,Row,[Rest,[_,ID|_]|_],NewRow), %retrieve column and triangle piece ID
  nth1(ColN,NRow,[Rest,[Player,ID]],NewRow), %insert col into row
  nth1(RowN,TabOut,NRow,NewTab).

%fillPiece(+TabIn,+RowN,+ColN,+Tri,+Fill,-TabOut)
%To fill a piece with color, we need to decide whether the kind of piece is:
%Rectangle : -2 // Square : -1 // Triangle Up : 0 // Triangle Down : 1
fillPiece(TabIn,RowN,ColN,-2,Fill,TabOut) :- fillPieceRect(TabIn,RowN,ColN,Fill,TabOut).
fillPiece(TabIn,RowN,ColN,-1,Fill,TabOut) :- fillPieceOther(TabIn,RowN,ColN,Fill,TabOut).
fillPiece(TabIn,RowN,ColN,0,Fill,TabOut) :- fillPieceTriUp(TabIn,RowN,ColN,Fill,TabOut).
fillPiece(TabIn,RowN,ColN,1,Fill,TabOut) :- fillPieceTriDwn(TabIn,RowN,ColN,Fill,TabOut).