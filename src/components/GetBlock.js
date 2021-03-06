import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
import JSONPretty from 'react-json-pretty';

class GetBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'null',
      verbose: false
    };
  }

  handleVerboseChange(e){
    this.setState({
      verbose: !this.state.verbose
    });
  }

  handleInputChange(e) {
    let value = e.target.value;
    this.setState({
      hex: value
    });
  }

  handleSubmit(e) {
    this.props.bitbox.Blockchain.getBlock(this.state.hex, this.state.verbose).then((result) => {
      this.setState({
        data: result
      })
    }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
      <div className="GetBlock">
        <h1 className="GetBlock-title">GetBlock</h1>
        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <div className="pure-control-group">
              <label>Block Hash*</label>
              <input onChange={this.handleInputChange.bind(this)} id="blockhash" type="text" placeholder="Block header hash"/>
            </div>
            <div className='pure-control-group'>
              <label>Verbose</label>
              <input onChange={this.handleVerboseChange.bind(this)} id="verbose"  type="radio" name="verbose" value="true" checked={this.state.verbose} /> true
              <input onChange={this.handleVerboseChange.bind(this)} id="verbose" type="radio" name="verbose" value="false" checked={!this.state.verbose} /> false
            </div>
            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">Submit</button>
            </div>
          </fieldset>
        </form>
        <h2>Command Result</h2>
        <JSONPretty id="json-pretty" json={this.state.data}></JSONPretty>
        <h2>RPC Help</h2>
        <SyntaxHighlighter language='bash' style={ocean}>{`
  getblock "blockhash" ( verbose )

  If verbose is false, returns a string that is serialized, hex-encoded data for block 'hash'.
  If verbose is true, returns an Object with information about block <hash>.

  Arguments:
  1. "blockhash"          (string, required) The block hash
  2. verbose                (boolean, optional, default=true) true for a json object, false for the hex encoded data

  Result (for verbose = true):
  {
    "hash" : "hash",     (string) the block hash (same as provided)
    "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
    "size" : n,            (numeric) The block size
    "height" : n,          (numeric) The block height or index
    "version" : n,         (numeric) The block version
    "versionHex" : "00000000", (string) The block version formatted in hexadecimal
    "merkleroot" : "xxxx", (string) The merkle root
    "tx" : [               (array of string) The transaction ids
       "transactionid"     (string) The transaction id
       ,...
    ],
    "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
    "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
    "nonce" : n,           (numeric) The nonce
    "bits" : "1d00ffff", (string) The bits
    "difficulty" : x.xxx,  (numeric) The difficulty
    "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
    "previousblockhash" : "hash",  (string) The hash of the previous block
    "nextblockhash" : "hash"       (string) The hash of the next block
  }

  Result (for verbose=false):
  "data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

  Examples:
  > bitcoin-cli getblock "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
  > curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
        `}</SyntaxHighlighter>
      </div>
    );
  }
}

export default GetBlock;
