import http from 'http';
import app from './app';

const port: number = 5000;

const server = http.createServer(app);

server.listen(port);
