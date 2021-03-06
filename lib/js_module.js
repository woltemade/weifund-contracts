'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['weifund-contracts'] = (function builder () {
  var environments = {};

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'BalanceClaim': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'claimBalance',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': '_owner',
                'type': 'address'
              }
            ],
            'type': 'constructor'
          }
        ],
        'bytecode': '60606040526040516020806101cf833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50610146806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610120565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561011d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'BalanceClaimInterface': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'claimBalance',
            'outputs': [],
            'type': 'function'
          }
        ],
        'bytecode': ''
      },
      'Campaign': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'beneficiary',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'version',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'fundingGoal',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'amountRaised',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'contributeMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'payoutMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'expiry',
            'outputs': [
              {
                'name': 'timestamp',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'refundMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_contributor',
                'type': 'address'
              }
            ],
            'name': 'ContributionMade',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_payoutDestination',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              }
            ],
            'name': 'RefundPayoutClaimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_payoutDestination',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              }
            ],
            'name': 'BeneficiaryPayoutClaimed',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052610430806100126000396000f360606040523615610095576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde031461009757806338af3eed1461011257806354fd4d501461014b5780637a3a0e84146101c65780637b3e5e7b146101e95780638e3390b41461020c578063a4d69fd314610287578063e184c9be14610302578063fb687c241461032557610095565b005b6100a460048050506103a0565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101045780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61011f60048050506103b8565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61015860048050506103be565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101b85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101d360048050506103d6565b6040518082815260200191505060405180910390f35b6101f660048050506103dc565b6040518082815260200191505060405180910390f35b61021960048050506103e2565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102795780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61029460048050506103fa565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102f45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61030f6004805050610412565b6040518082815260200191505060405180910390f35b6103326004805050610418565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103925780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60206040519081016040528060008152602001505b90565b60005b90565b60206040519081016040528060008152602001505b90565b60005b90565b60005b90565b60206040519081016040528060008152602001505b90565b60206040519081016040528060008152602001505b90565b60005b90565b60206040519081016040528060008152602001505b9056'
      },
      'CampaignDataRegistry': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              },
              {
                'name': '_data',
                'type': 'bytes'
              }
            ],
            'name': 'register',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'storedData',
            'outputs': [
              {
                'name': 'dataStored',
                'type': 'bytes'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'CampaignDataRegistered',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526103ef806100126000396000f360606040523615610048576000357c01000000000000000000000000000000000000000000000000000000009004806324b8fbf614610055578063a17cc7eb146100b457610048565b6100535b610002565b565b005b6100b26004808035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610138565b005b6100ca6004808035906020019091905050610307565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561012a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b813373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff161415156101dd57610002565b81600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061025657805160ff1916838001178555610287565b82800160010185558215610287579182015b82811115610286578251826000505591602001919060010190610268565b5b5090506102b29190610294565b808211156102ae5760008181506000905550600101610294565b5090565b50507fa379e02b459108b2afd707cd51f2570af1704e78a9573cb9d18baff224b60ab383604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1505b5050565b6020604051908101604052806000815260200150600060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103de5780601f106103b3576101008083540402835291602001916103de565b820191906000526020600020905b8154815290600101906020018083116103c157829003601f168201915b505050505090506103ea565b91905056'
      },
      'CampaignDataRegistryInterface': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              },
              {
                'name': '_data',
                'type': 'bytes'
              }
            ],
            'name': 'register',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'storedData',
            'outputs': [
              {
                'name': 'dataStored',
                'type': 'bytes'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'CampaignDataRegistered',
            'type': 'event'
          }
        ],
        'bytecode': ''
      },
      'CampaignRegistry': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaignID',
                'type': 'uint256'
              }
            ],
            'name': 'addressOf',
            'outputs': [
              {
                'name': 'campaign',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'campaigns',
            'outputs': [
              {
                'name': 'addr',
                'type': 'address'
              },
              {
                'name': 'interface',
                'type': 'address'
              },
              {
                'name': 'registered',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'name': 'ids',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaignID',
                'type': 'uint256'
              }
            ],
            'name': 'interfaceOf',
            'outputs': [
              {
                'name': 'interface',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'numCampaigns',
            'outputs': [
              {
                'name': 'count',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaignID',
                'type': 'uint256'
              }
            ],
            'name': 'registeredAt',
            'outputs': [
              {
                'name': 'registered',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              },
              {
                'name': '_interface',
                'type': 'address'
              }
            ],
            'name': 'register',
            'outputs': [
              {
                'name': 'campaignID',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'idOf',
            'outputs': [
              {
                'name': 'campaignID',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_campaign',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_interface',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_campaignID',
                'type': 'uint256'
              }
            ],
            'name': 'CampaignRegistered',
            'type': 'event'
          }
        ],
        'bytecode': '606060405261079d806100126000396000f36060604052361561008a576000357c01000000000000000000000000000000000000000000000000000000009004806311a800bc14610097578063141961bc146100d95780631847c06b1461013f5780631bf9a2c41461016b5780632c0f7b6f146101ad578063891df671146101d0578063aa677354146101fc578063d94fe832146102315761008a565b6100955b610002565b565b005b6100ad600480803590602001909190505061025d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100ef60048080359060200190919050506102b0565b604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390f35b610155600480803590602001909190505061032d565b6040518082815260200191505060405180910390f35b6101816004808035906020019091905050610348565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ba600480505061039b565b6040518082815260200191505060405180910390f35b6101e660048080359060200190919050506103b0565b6040518082815260200191505060405180910390f35b61021b60048080359060200190919080359060200190919050506103e6565b6040518082815260200191505060405180910390f35b610247600480803590602001909190505061075f565b6040518082815260200191505060405180910390f35b6000600160005082815481101561000257906000526020600020906003020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506102ab565b919050565b600160005081815481101561000257906000526020600020906003020160005b915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160005054905083565b60006000506020528060005260406000206000915090505481565b6000600160005082815481101561000257906000526020600020906003020160005b5060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610396565b919050565b600060016000508054905090506103ad565b90565b6000600160005082815481101561000257906000526020600020906003020160005b506002016000505490506103e1565b919050565b6000823373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff1614151561048d57610002565b6000600160005080549050111561054b578073ffffffffffffffffffffffffffffffffffffffff166001600050600060005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054815481101561000257906000526020600020906003020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561054a57610002565b5b6001600050805480919060010190908154818355818115116105f7576003028160030283600052602060002091820191016105f69190610586565b808211156105f25760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600282016000506000905550600301610586565b5090565b5b5050509150815081600060005060008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508190555060606040519081016040528085815260200184815260200142815260200150600160005083815481101561000257906000526020600020906003020160005b5060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550604082015181600201600050559050507ffc874187ba59760250beea8c6308e6863ac5035da7aa765eee0bcdc04c844173848484604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a1505b92915050565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610798565b91905056'
      },
      'CampaignRegistryInterface': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaignID',
                'type': 'uint256'
              }
            ],
            'name': 'addressOf',
            'outputs': [
              {
                'name': 'campaign',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaignID',
                'type': 'uint256'
              }
            ],
            'name': 'interfaceOf',
            'outputs': [
              {
                'name': 'interface',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'numCampaigns',
            'outputs': [
              {
                'name': 'count',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaignID',
                'type': 'uint256'
              }
            ],
            'name': 'registeredAt',
            'outputs': [
              {
                'name': 'registered',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              },
              {
                'name': '_interface',
                'type': 'address'
              }
            ],
            'name': 'register',
            'outputs': [
              {
                'name': 'campaignID',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'idOf',
            'outputs': [
              {
                'name': 'campaignID',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          }
        ],
        'bytecode': ''
      },
      'Owner': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [],
            'type': 'constructor'
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b609480603d6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480638da5cb5b146037576035565b005b60426004805050606e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'StaffPicks': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'pickedCampaigns',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'name': 'activePicks',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'deactivate',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              }
            ],
            'name': 'register',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6103a98061003f6000396000f360606040523615610069576000357c0100000000000000000000000000000000000000000000000000000000900480632cd535c214610076578063378ed698146100b85780633ea053eb146100e65780634420e486146100fe5780638da5cb5b1461011657610069565b6100745b610002565b565b005b61008c600480803590602001909190505061014f565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100ce6004808035906020019091905050610191565b60405180821515815260200191505060405180910390f35b6100fc60048080359060200190919050506101b6565b005b6101146004808035906020019091905050610254565b005b6101236004805050610383565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600260005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160005060205280600052604060002060009150909054906101000a900460ff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610250576000600160005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561037f576001600160005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055506002600050805480600101828181548183558181151161033f5781836000526020600020918201910161033e9190610320565b8082111561033a5760008181506000905550600101610320565b5090565b5b5050509190906000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'StandardCampaign': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'contributions',
            'outputs': [
              {
                'name': 'sender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              },
              {
                'name': 'created',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalContributions',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'beneficiary',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'version',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'fundingGoal',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'amountRaised',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'contributeMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'payoutMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'payoutToBeneficiary',
            'outputs': [
              {
                'name': 'amountClaimed',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'address'
              },
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'contributionsBySender',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'stage',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_sender',
                'type': 'address'
              }
            ],
            'name': 'totalContributionsBySender',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'contributeMsgValue',
            'outputs': [
              {
                'name': 'contributionID',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'expiry',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'refundMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': '_name',
                'type': 'string'
              },
              {
                'name': '_expiry',
                'type': 'uint256'
              },
              {
                'name': '_fundingGoal',
                'type': 'uint256'
              },
              {
                'name': '_beneficiary',
                'type': 'address'
              }
            ],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_contributor',
                'type': 'address'
              }
            ],
            'name': 'ContributionMade',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_payoutDestination',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              }
            ],
            'name': 'RefundPayoutClaimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_payoutDestination',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              }
            ],
            'name': 'BeneficiaryPayoutClaimed',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052606060405190810160405280602d81526020017f636f6e747269627574654d736756616c756528293a2875696e7432353620636f81526020017f6e747269627574696f6e4944290000000000000000000000000000000000000081526020015060096000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100b257805160ff19168380011785556100e3565b828001600101855582156100e3579182015b828111156100e25782518260005055916020019190600101906100c4565b5b50905061010e91906100f0565b8082111561010a57600081815060009055506001016100f0565b5090565b5050606060405190810160405280602d81526020017f7061796f7574546f42656e656669636961727928293a2875696e74323536206181526020017f6d6f756e74436c61696d65642900000000000000000000000000000000000000815260200150600a6000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101be57805160ff19168380011785556101ef565b828001600101855582156101ef579182015b828111156101ee5782518260005055916020019190600101906101d0565b5b50905061021a91906101fc565b8082111561021657600081815060009055506001016101fc565b5090565b5050604051611094380380611094833981016040528080518201919060200180519060200190919080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b8360086000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102d357805160ff1916838001178555610304565b82800160010185558215610304579182015b828111156103035782518260005055916020019190600101906102e5565b5b50905061032f9190610311565b8082111561032b5760008181506000905550600101610311565b5090565b5050826004600050819055508160026000508190555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50505050610ce6806103ae6000396000f3606060405236156100ed576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde03146100fa5780631cee07001461017557806337c08923146101c557806338af3eed146101e857806354fd4d50146102215780637a3a0e841461029c5780637b3e5e7b146102bf5780638da5cb5b146102e25780638e3390b41461031b578063a4d69fd314610396578063a63c7ba214610411578063ac5db33214610434578063c040e6b814610469578063d52230c41461048c578063db0251e9146104b8578063e184c9be146104db578063fb687c24146104fe576100ed565b6100f85b610002565b565b005b6101076004805050610579565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101675780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61018b600480803590602001909190505061061a565b604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390f35b6101d2600480505061067a565b6040518082815260200191505060405180910390f35b6101f5600480505061068f565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61022e60048050506106b5565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561028e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102a960048050506106cd565b6040518082815260200191505060405180910390f35b6102cc60048050506106d6565b6040518082815260200191505060405180910390f35b6102ef60048050506106df565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103286004805050610705565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103885780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103a360048050506107a6565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104035780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61041e6004805050610847565b6040518082815260200191505060405180910390f35b61045360048080359060200190919080359060200190919050506109b2565b6040518082815260200191505060405180910390f35b61047660048050506109e7565b6040518082815260200191505060405180910390f35b6104a260048080359060200190919050506109f0565b6040518082815260200191505060405180910390f35b6104c56004805050610a31565b6040518082815260200191505060405180910390f35b6104e86004805050610cc5565b6040518082815260200191505060405180910390f35b61050b6004805050610cce565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561056b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60086000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106125780601f106105e757610100808354040283529160200191610612565b820191906000526020600020905b8154815290600101906020018083116105f557829003601f168201915b505050505081565b600660005081815481101561000257906000526020600020906003020160005b915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160005054908060020160005054905083565b6000600660005080549050905061068c565b90565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60206040519081016040528060008152602001505b90565b60026000505481565b60036000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60096000508054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561079e5780601f106107735761010080835404028352916020019161079e565b820191906000526020600020905b81548152906001019060200180831161078157829003601f168201915b505050505081565b600a6000508054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561083f5780601f106108145761010080835404028352916020019161083f565b820191906000526020600020905b81548152906001019060200180831161082257829003601f168201915b505050505081565b600060026004600050544210156108685760006001600050819055506108a8565b42600460005054118015610886575060026000505460036000505410155b1561089b5760026001600050819055506108a7565b60016001600050819055505b5b806001600050541415156108bb57610002565b3073ffffffffffffffffffffffffffffffffffffffff163191508150600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600083604051809050600060405180830381858888f19350505050151561093657610002565b7f22c1e24047f1e0c1af6f78290547f44645cdd2ad4d06b09115a162e41460c4d5600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1505b90565b600760005060205281600052604060002060005081815481101561000257906000526020600020900160005b91509150505481565b60016000505481565b6000600760005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050805490509050610a2c565b919050565b60006000600460005054421015610a52576000600160005081905550610a92565b42600460005054118015610a70575060026000505460036000505410155b15610a85576002600160005081905550610a91565b60016001600050819055505b5b80600160005054141515610aa557610002565b600660005080548091906001019090815481835581811511610b3557600302816003028360005260206000209182019101610b349190610ae0565b80821115610b305760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160005060009055600282016000506000905550600301610ae0565b5090565b5b5050509150815060606040519081016040528033815260200134815260200142815260200150600660005083815481101561000257906000526020600020906003020160005b5060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506020820151816001016000505560408201518160020160005055905050600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508054806001018281815481835581811511610c4657818360005260206000209182019101610c459190610c27565b80821115610c415760008181506000905550600101610c27565b5090565b5b5050509190906000526020600020900160005b84909190915055503460036000828282505401925050819055507f97a3367c201ad38e0d37322fd0ffa1b93457541ae8baf20eb9aa50bb83fcabef33604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1505b90565b60046000505481565b60206040519081016040528060008152602001505b9056'
      },
      'StandardRefundCampaign': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'contributions',
            'outputs': [
              {
                'name': 'sender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              },
              {
                'name': 'created',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalContributions',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'beneficiary',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'version',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'fundingGoal',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'amountRaised',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'refundsClaimed',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'contributeMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_contributionID',
                'type': 'uint256'
              }
            ],
            'name': 'claimRefundOwed',
            'outputs': [
              {
                'name': 'balanceClaim',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'payoutMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'payoutToBeneficiary',
            'outputs': [
              {
                'name': 'amountClaimed',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'address'
              },
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'contributionsBySender',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'stage',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_sender',
                'type': 'address'
              }
            ],
            'name': 'totalContributionsBySender',
            'outputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'contributeMsgValue',
            'outputs': [
              {
                'name': 'contributionID',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'expiry',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'refundMethodABI',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_contributor',
                'type': 'address'
              }
            ],
            'name': 'ContributionMade',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_payoutDestination',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              }
            ],
            'name': 'RefundPayoutClaimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_payoutDestination',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              }
            ],
            'name': 'BeneficiaryPayoutClaimed',
            'type': 'event'
          }
        ],
        'bytecode': ''
      },
      'Token': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_spender',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'success',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_from',
                'type': 'address'
              },
              {
                'name': '_to',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'success',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_owner',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'balance',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_to',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'success',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_owner',
                'type': 'address'
              },
              {
                'name': '_spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': 'remaining',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': '_from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': '_to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': '_owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': '_spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526101db806100126000396000f360606040523615610074576000357c010000000000000000000000000000000000000000000000000000000090048063095ea7b31461007657806318160ddd146100ad57806323b872dd146100d057806370a0823114610110578063a9059cbb1461013c578063dd62ed3e1461017357610074565b005b61009560048080359060200190919080359060200190919050506101a8565b60405180821515815260200191505060405180910390f35b6100ba60048050506101b1565b6040518082815260200191505060405180910390f35b6100f860048080359060200190919080359060200190919080359060200190919050506101b7565b60405180821515815260200191505060405180910390f35b61012660048080359060200190919050506101c1565b6040518082815260200191505060405180910390f35b61015b60048080359060200190919080359060200190919050506101c9565b60405180821515815260200191505060405180910390f35b61019260048080359060200190919080359060200190919050506101d2565b6040518082815260200191505060405180910390f35b60005b92915050565b60005b90565b60005b9392505050565b60005b919050565b60005b92915050565b60005b9291505056'
      },
      'User': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'claim',
                'type': 'address'
              }
            ],
            'name': 'claimBalance',
            'outputs': [],
            'type': 'function'
          }
        ],
        'bytecode': '606060405260b18060106000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063b633e4cd146037576035565b005b604b6004808035906020019091905050604d565b005b8073ffffffffffffffffffffffffffffffffffffffff166330509bca604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506000604051808303816000876161da5a03f1156002575050505b5056'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      this.objects[i] = this.classes[obj['class']].at(obj.address);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['weifund-contracts'];
}
