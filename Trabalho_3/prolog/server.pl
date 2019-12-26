:- set_setting(http:cors, [*]).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).

:- http_handler(root(create),buildBoard, []).
:- http_handler(root(plays),getPossiblePlays,[]).
:- http_handler(root(playermove),playerMove,[]).
:- http_handler(root(cpumove),cpuMove,[]).

:- json_object
    board(b:list).

:- json_object
    boardState(board:list(list), plays:list).

:- json_object
    possPlays(poss:list).

:- json_object
    cpu_move_preconds(board:list,played:list,player:integer,level:integer).

:- json_object
    player_move_preconds(board:list,played: list, player:integer, row:integer, col:integer, t:integer).

:- json_object
    move_result(played:list,board:list,state:integer).

buildBoard(_) :-
  buildBlankList(B),
  prolog_to_json(board(B), JSONOut),
  cors_enable,  
  reply_json(JSONOut).

buildBoard(Request) :-
  option(method(options), Request), !,
  cors_enable(Request,[methods([get,post,delete])]),
  format('~n').

getPossiblePlays(Request) :-
  http_read_json(Request, JSONIn),
  json_to_prolog(JSONIn, boardState(B,P)),
  valid_moves(B,P,Out),
  prolog_to_json(possPlays(Out),JSONOut),
  cors_enable,
  reply_json(JSONOut).

getPossiblePlays(Request) :-
  option(method(options), Request), !,
  cors_enable(Request,[methods([get,post,delete])]),
  format('~n').

playerMove(Request) :-
  http_read_json(Request,JSONIn),
  json_to_prolog(JSONIn, player_move_preconds(Board, Played,Player,Row,Col,T)),
  player_move(Board,Played,Player,Row,Col,T,BoardOut,PlayedOut,StateOut),
  prolog_to_json(move_result(PlayedOut,BoardOut,StateOut),JSONOut),
  cors_enable,
  reply_json(JSONOut).

playerMove(Request) :-
  option(method(options), Request), !,
  cors_enable(Request,[methods([get,post,delete])]),
  format('~n').

cpuMove(Request) :-
  http_read_json(Request,JSONIn),
  json_to_prolog(JSONIn,cpu_move_preconds(Board,Played,Player,Level)),
  valid_moves(Board,Played,Poss),
  cpu_move(Board,Played,Player,Poss,Level,BoardOut,PlayedOut,StateOut),
  prolog_to_json(move_result(PlayedOut,BoardOut,StateOut),JSONOut),
  cors_enable,
  reply_json(JSONOut).
  
cpuMove(Request) :-
  option(method(options), Request), !,
  cors_enable(Request,[methods([get,post,delete])]),
  format('~n').

server :-
  http_server(http_dispatch,[port(8081)]).
