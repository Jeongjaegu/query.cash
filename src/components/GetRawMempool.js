import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
import JSONPretty from 'react-json-pretty';

class GetRawMempool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verbose: 'null',
      data: 'null'
    };
  }

  handleVerboseChange(e){
    this.setState({
      verbose: !this.state.verbose
    });
  }

  handleSubmit(e) {
    this.props.bitbox.Blockchain.getRawMempool(this.state.verbose).then((result) => {
      this.setState({
        verbose: result
      })
    }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
      <div className="GetRawMempool">
        <h1 className="GetRawMempool-title">GetRawMempool</h1>
        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <div className="pure-control-group">
              <div>
                <label>Verbose</label>
                <input onChange={this.handleVerboseChange.bind(this)} id="verbose"  type="radio" name="verbose" value="true" checked={this.state.verbose} /> true
                <input onChange={this.handleVerboseChange.bind(this)} id="verbose" type="radio" name="verbose" value="false" checked={!this.state.verbose}/> false
              </div>
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
  Returns all transaction ids in memory pool as a json array of string transaction ids.

  Arguments:
  1. verbose (boolean, optional, default=false) True for a json object, false for array of transaction ids

  Result: (for verbose = false):
  [                     (json array of string)
    "transactionid"     (string) The transaction id
    ,...
  ]

  Result: (for verbose = true):
  {                           (json object)
    "transactionid" : {       (json object)
      "size" : n,             (numeric) transaction size.
      "fee" : n,              (numeric) transaction fee in BCH
      "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
      "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
      "height" : n,           (numeric) block height when transaction entered pool
      "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
      "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
      "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
      "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
      "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
      "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
      "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
      "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
      "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
          "transactionid",    (string) parent transaction id
         ... ]
    }, ...
  }

  Examples:
  > bitcoin-cli getrawmempool true
  > curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawmempool", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
        `}</SyntaxHighlighter>
      </div>
    );
  }
}

export default GetRawMempool;
