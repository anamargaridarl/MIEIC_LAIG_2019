const HOSTPORT = "http://localhost:8081"

class MyRequestHandler {
  static async initBoard() {
    const response = await fetch(`${HOSTPORT}/create`, {
      method: 'POST',
      mode: 'cors' 
    });
    const data = await response.json();
    return data;
  }

  static async getPossiblePlays(board,played) {
    const json = {
      board : board,
      plays : played
    }

    const response = await fetch(`${HOSTPORT}/plays`, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });

    const data = await response.json();
    return data;
  }

  static async playerMove(board,played,player,row,col,t) {
    const json = {
      board: board,
      played: played,
      player: player,
      row: row,
      col: col,
      t: t
    }

    const response = await fetch(`${HOSTPORT}/playermove`, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });

    const data = await response.json();
    return data;
  }

  static async cpuMove(board,played,player,level) {
    const json = {
      board: board,
      played: played,
      player: player,
      level: level
    }

    const response = await fetch(`${HOSTPORT}/cpumove`, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });

    const data = await response.json();
    return data;
  }

































}