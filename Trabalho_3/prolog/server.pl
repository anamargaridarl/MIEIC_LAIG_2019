:-use_module(library(http/http_server)).
:-use_module(library(http/http_json)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_cors)).
:-use_module(library(http/json)).
:- use_module(library(http/json_convert)).

:- http_handler(root(create),buildBoard, []).
:- http_handler(root(plays),getPossiblePlays,[]).

:- json_object
    board(board:list)
:- json_object
    boardState(board:list(list), plays:list).

:- json_object
    possPlays(p:list).

:- json_object
    computer_move(player:integer,board:list,played:list,level:integer).

:- json_object
    move_result(played:list,board:list,state:integer).


buildBoard(_) :-
  cors_enable,  
  buildBlankList(B),
  prolog_to_json(, JSONOut),
  reply_json(JSONOut).

getPossiblePlays(Request) :-
  cors_enable,
  http_read_json(Request, JSONIn),
  json_to_prolog(JSONIn, boardState(B,P)),
  valid_moves(B,P,Out),
  prolog_to_json(Out,JSONOut),
  reply_json(JSONOut).


  

server :-
  http_server(http_dispatch,[port(8080)]).

% Necessary predicates to send requests
% 
% - computer moves (random and greedy) (choose_move)
% - player move (move)
% - verify game state (value)
% 