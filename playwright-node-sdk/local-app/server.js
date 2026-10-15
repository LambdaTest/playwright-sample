// A tiny app on http://localhost:4173 that only the tunnel can reach from the cloud.
const http = require('node:http')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<!doctype html><title>Local app</title><h1>Served from your machine</h1>')
  })
  .listen(4173)
