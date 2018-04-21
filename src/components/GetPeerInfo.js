import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';

let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: '138.68.54.100',
  port: 8332,
  username: 'bitcoin',
  password: 'xhFjluMJMyOXcYvF',
  corsproxy: true
});

class GetPeerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'null'
    };
  }

  handleSubmit(e) {
    BITBOX.Network.getPeerInfo(this.state.txid).then((result) => {
      this.setState({
        data: JSON.stringify(result)
      })
    }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
      <div className="GetPeerInfo">
        <h1 className="GetPeerInfo-title">GetPeerInfo</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <button type="submit" className="pure-button pure-button-primary">Submit</button>
        </form>
        <h2>Command Result</h2>
        <SyntaxHighlighter language='javascript' style={ocean}>{this.state.data}</SyntaxHighlighter>
        <h2>RPC Help</h2>
        <SyntaxHighlighter language='bash' style={ocean}>{`
  Returns data about each connected network node as a json array of objects.

  Result:
  [
    {
      "id": n,                   (numeric) Peer index
      "addr":"host:port",      (string) The ip address and port of the peer
      "addrlocal":"ip:port",   (string) local address
      "services":"xxxxxxxxxxxxxxxx",   (string) The services offered
      "relaytxes":true|false,    (boolean) Whether peer has asked us to relay transactions to it
      "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
      "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
      "bytessent": n,            (numeric) The total bytes sent
      "bytesrecv": n,            (numeric) The total bytes received
      "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
      "timeoffset": ttt,         (numeric) The time offset in seconds
      "pingtime": n,             (numeric) ping time (if available)
      "minping": n,              (numeric) minimum observed ping time (if any at all)
      "pingwait": n,             (numeric) ping wait (if non-zero)
      "version": v,              (numeric) The peer version, such as 7001
      "subver": "/Satoshi:0.8.5/",  (string) The string version
      "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
      "addnode": true|false,     (boolean) Whether connection was due to addnode and is using an addnode slot
      "startingheight": n,       (numeric) The starting height (block) of the peer
      "banscore": n,             (numeric) The ban score
      "synced_headers": n,       (numeric) The last header we have in common with this peer
      "synced_blocks": n,        (numeric) The last block we have in common with this peer
      "inflight": [
         n,                        (numeric) The heights of blocks we're currently asking from this peer
         ...
      ],
      "whitelisted": true|false, (boolean) Whether the peer is whitelisted
      "bytessent_per_msg": {
         "addr": n,              (numeric) The total bytes sent aggregated by message type
         ...
      },
      "bytesrecv_per_msg": {
         "addr": n,              (numeric) The total bytes received aggregated by message type
         ...
      }
    }
    ,...
  ]

  Examples:
  > bitcoin-cli getpeerinfo
  > curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
        `}</SyntaxHighlighter>
      </div>
    );
  }
}

export default GetPeerInfo;
