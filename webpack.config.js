const dns = require('dns');
const assert = require('assert');
const path = require('path');
const dgram = require('dgram');
const crypto = require('crypto');
const net = require('net');
const os = require('os');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // Exemplo de uso da biblioteca crypto
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'MY_SECRET': JSON.stringify(crypto.randomBytes(32).toString('hex'))
      }
    })
  ],
  devServer: {
    // Exemplo de uso da biblioteca dns
    host: dns.lookup(os.hostname(), function (err, add, fam) {
      console.log('Endereço IP do servidor:', add);
    }),
    port: 3000,
    // Exemplo de uso da biblioteca dgram
    before: function(app, server) {
      const udpSocket = dgram.createSocket('udp4');
      udpSocket.bind(1234);
      udpSocket.on('message', function(msg, rinfo) {
        console.log(`Mensagem UDP recebida: ${msg} de ${rinfo.address}:${rinfo.port}`);
      });
    }
  }
};
