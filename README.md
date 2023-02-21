# Nodejs Secure Webserver with HTTP2, HLS.js, and WebSockets

This is a personal side project that creates a secure webserver using Node.js's http2 module to serve an HLS (HTTP Live Streaming) player and allow users to sync the stream using websockets. The project also includes a very simple basic authentication system.

## Requirements
To use this project, you must have the following installed:
* Node.js
* NPM

## Getting Started

To get started, clone the repository and install the necessary dependencies using npm.

```bash
git clone https://github.com/jan5u/node-streaming-app.git
cd node-streaming-app
npm install
```

# Usage

Before running the server, make sure to set the following environment variables:
* BASIC_USERNAME: The username for basic authentication. Default is admin.
* BASIC_PASSWORD: The password for basic authentication. Default is admin.

To start the server, run the following command:

```bash
npm start
```

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details.

