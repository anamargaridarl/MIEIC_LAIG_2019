const HOSTPORT = "http://localhost:8081"

class MyRequestHandler {
  static async initBoard() {
    const response = await fetch(`${HOSTPORT}/create`);
    const data = await response.json();
    return data;
  }

































}