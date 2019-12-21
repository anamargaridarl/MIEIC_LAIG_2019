:-use_module(library(http/http_server)).
:-use_module(library(http/http_json)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_cors)).
:-use_module(library(http/json)).
:- use_module(library(http/json_convert)).

:- http_handler(root(create),buildBoard, []).
:- http_handler(root(plays),getPossiblePlays,[]).
% testing
:- http_handler(root(test),test,[]).
:- json_object
    testing(b:list).

:- json_object
    board(b:list(list), p:list).

:- json_object
    possPlays(p:list).



buildBoard(_) :-
  cors_enable,  
  buildBlankList(B),
  prolog_to_json(B, JSONOut),
  reply_json(JSONOut).

getPossiblePlays(Request) :-
  cors_enable,
  http_read_json(Request, JSONIn),
  json_to_prolog(JSONIn, board(B,P)),
  valid_moves(B,P,Out),
  prolog_to_json(Out,JSONOut),
  reply_json(JSONOut).


  

server :-
  http_server(http_dispatch,[port(8080)]).
  


% testing
test(Request) :-
  cors_enable,
  http_read_json(Request,JSONIn),
  json_to_prolog(JSONIn,testing(B)),
  displayList(B),
  reply_json("Okay").  

displayList([]).
displayList([L|Ls]) :-
  print(L),
  displayList(Ls).