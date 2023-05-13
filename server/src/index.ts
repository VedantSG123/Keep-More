import express from "express"
import http from "http"
import socketIO from "socket.io"

const port: number = 5000

class App {
  private server: http.Server
  private port: number
  private options = {
    cors: {
      origin: ["http://localhost:3000"] //change according to your client
    }
  }

  constructor(port: number) {
    this.port = port
    const app = express()
    this.server = new http.Server(app)
    const io = new socketIO.Server(this.server, this.options)

    io.on("connection", function(socket:socketIO.Socket){
      console.log("A USER HAS CONNECTED")
    })
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`)
    })
  }
}

new App(port).Start()