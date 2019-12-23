getOption(Option) :-
  read_line_to_codes(user_input,Codes),
  length(Codes,N), 
  (N == 1; (writef("Invalid option selected"),nl)),
  nth0(0,Codes,Code),
  Option is Code - 48.

getAILevel(Lvl) :-
  repeat,
  writef('Set CPU level:'),nl,
  writef('0 - Easy: computer does random choices. Like the average joe.'),nl,
  writef('1 - Harder?: computer gets greedy. Might beat you, might make your life easier.'),nl,
  getOption(Lvl),(Lvl == 0; Lvl == 1).

getAILvls(Lvl1,Lvl2) :-
  repeat,
  writef('Set CPU1 level:'),nl,
  writef('0 - Easy: computer does random choices. Like the average joe.'),nl,
  writef('1 - Harder?: computer gets greedy. Might beat you, might make your life easier.'),nl,
  getOption(Lvl1),(Lvl1 == 0; Lvl1 == 1),
  writef('Set CPU2 level:'),nl,
  getOption(Lvl2),(Lvl2 == 0; Lvl2 == 1).

play_mode(Option) :-
  buildBlankList(L),
  ((Option == 0,!,twoPlayerGame(L,[],0));
  (Option == 1,getAILevel(Lvl),!, humanCPUGame(L,[],Lvl));
  (Option == 2,getAILevel(Lvl),!, cpuHumanGame(L,[],Lvl));
  (Option == 3,getAILvls(Lvl1,Lvl2),!, twoComputerGame(L,[],Lvl1,Lvl2))).
  
play() :-
  writef("Welcome to Boco. Choose game mode: "),nl,
  repeat,
  writef('0 - Human Vs Human'),nl,
  writef('1 - Human Vs Computer'),nl,
  writef('2 - Computer Vs Human'),nl, 
  writef('3 - Computer Vs Computer'),nl,
  getOption(Option),!,
  play_mode(Option).