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
      'Campaign': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'created',
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
            'constant': false,
            'inputs': [],
            'name': 'claimRefundOwed',
            'outputs': [
              {
                'name': 'claimProxyAddress',
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
            'name': 'contributors',
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
            'name': 'contributions',
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
            'name': 'paidOut',
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
            'name': 'numContributors',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
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
                'name': 'claimProxyAddress',
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
            'name': 'contributorMadeClaim',
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
            'inputs': [],
            'name': 'contributeMsgValue',
            'outputs': [
              {
                'name': 'contributionMade',
                'type': 'bool'
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
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_contributorAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_contributionAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_amountRaised',
                'type': 'uint256'
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
                'name': '_claimProxyAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_beneficiaryTarget',
                'type': 'address'
              }
            ],
            'name': 'BeneficiaryPayoutClaimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_claimProxyAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_refundAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_refundTarget',
                'type': 'address'
              }
            ],
            'name': 'RefundClaimed',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b610e988061003f6000396000f3606060405236156100cc576000357c010000000000000000000000000000000000000000000000000000000090048063325a19f1146100de57806338af3eed14610101578063394ec89d1461013a5780633cb5d1001461017357806342e94c90146101b55780635c76ca2d146101e15780637a3a0e84146102065780637b3e5e7b146102295780638da5cb5b1461024c5780638f03850b14610285578063a63c7ba2146102a8578063adea5682146102e1578063db0251e91461030f578063e184c9be14610334576100cc565b6100dc5b6100d8610357565b505b565b005b6100eb6004805050610527565b6040518082815260200191505060405180910390f35b61010e6004805050610530565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101476004805050610556565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101896004808035906020019091905050610794565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101cb60048080359060200190919050506107d6565b6040518082815260200191505060405180910390f35b6101ee60048050506107f1565b60405180821515815260200191505060405180910390f35b6102136004805050610804565b6040518082815260200191505060405180910390f35b610236600480505061080d565b6040518082815260200191505060405180910390f35b6102596004805050610816565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610292600480505061083c565b6040518082815260200191505060405180910390f35b6102b56004805050610851565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102f760048080359060200190919050506109ea565b60405180821515815260200191505060405180910390f35b61031c6004805050610357565b60405180821515815260200191505060405180910390f35b6103416004805050610a0f565b6040518082815260200191505060405180910390f35b600060006000341180156103775750600460005054346003600050540111155b80156103905750600560009054906101000a900460ff16155b1561051d576000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054141561045f576006600050805480600101828181548183558181151161041f5781836000526020600020918201910161041e9190610400565b8082111561041a5760008181506000905550600101610400565b5090565b5b5050509190906000526020600020900160005b33909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b34905080600360008282825054019250508190555080600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055506001915081507f5dc1fe5ab986a852c4eda8e8bb94247d13307065c593fb83f1a09be2736793823382600360005054604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a1610522565b610002565b5b5090565b60026000505481565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600460005054600360005054108015610587575060011515600560009054906101000a900460ff16151514155b8015610597575060016000505442115b80156105d257506000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054115b801561061b575060001515600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b1561078a576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055503360405161024080610a18833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f091508150600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490508173ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f1935050505015610780577fe34dc7a697103fc8f3d1786482f1565dcbc7b31bf558a7f566e3b622ce314d64828233604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1610785565b610002565b61078f565b610002565b5b5090565b600660005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076000506020528060005260406000206000915090505481565b600560009054906101000a900460ff1681565b60046000505481565b60036000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600660005080549050905061084e565b90565b600060046000505460036000505410158015610880575060001515600560009054906101000a900460ff161515145b156109e1576001600560006101000a81548160ff02191690830217905550600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660405161024080610c58833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f0905080508073ffffffffffffffffffffffffffffffffffffffff166000600360005054604051809050600060405180830381858888f19350505050156109d7577f60a17cb32893b540da8b4a0e5585c27a4cce9a6bbf7886e9e9f8868f52f4190381600360005054600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a16109dc565b610002565b6109e6565b610002565b5b90565b600860005060205280600052604060002060009150909054906101000a900460ff1681565b60016000505481566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'CampaignDataRegistry': {
        'interface': [
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
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaignAddress',
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
                'name': '',
                'type': 'address'
              }
            ],
            'name': 'data',
            'outputs': [
              {
                'name': '',
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
                'name': '_campaignAddress',
                'type': 'address'
              }
            ],
            'name': 'CampaignDataRegistered',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526104c2806100126000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063141961bc1461004f57806324b8fbf614610091578063b90d3d0c146100f05761004d565b005b6100656004808035906020019091905050610174565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100ee6004808035906020019091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506101b6565b005b610106600480803590602001909190505061040f565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101665780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600160005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16638da5cb5b604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff16141561040a5780600060005060008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102cd57805160ff19168380011785556102fe565b828001600101855582156102fe579182015b828111156102fd5782518260005055916020019190600101906102df565b5b509050610329919061030b565b80821115610325576000818150600090555060010161030b565b5090565b50506001600050805480600101828181548183558181151161037d5781836000526020600020918201910161037c919061035e565b80821115610378576000818150600090555060010161035e565b5090565b5b5050509190906000526020600020900160005b84909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550507fa379e02b459108b2afd707cd51f2570af1704e78a9573cb9d18baff224b60ab382604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b5b5050565b60006000506020528060005260406000206000915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104ba5780601f1061048f576101008083540402835291602001916104ba565b820191906000526020600020905b81548152906001019060200180831161049d57829003601f168201915b50505050508156'
      },
      'CampaignFactory': {
        'interface': [
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
            'constant': false,
            'inputs': [
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
            'name': 'createCampaign',
            'outputs': [
              {
                'name': 'campaignAddress',
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
            'name': 'services',
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
                'name': '_service',
                'type': 'address'
              }
            ],
            'name': 'isService',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_service',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_serviceId',
                'type': 'uint256'
              }
            ],
            'name': 'ServiceRegistered',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526113b2806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631847c06b1461005a5780637c6dd43514610086578063c22c4f43146100da578063e9d8dbfd1461011c57610058565b005b610070600480803590602001909190505061014a565b6040518082815260200191505060405180910390f35b6100ae6004808035906020019091908035906020019091908035906020019091905050610165565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100f060048080359060200190919050506101c5565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101326004808035906020019091905050610207565b60405180821515815260200191505060405180910390f35b60016000506020528060005260406000206000915090505481565b6000838383604051610f7e80610434833901808481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019350505050604051809103906000f0905080506101bc816102f1565b505b9392505050565b600060005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff166000600050600160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054815481101561000257906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156102dd5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156102eb57600190506102ec565b5b919050565b60006102fc82610207565b1561030657610002565b60006000508054809190600101909081548183558181151161035a57818360005260206000209182019101610359919061033b565b80821115610355576000818150600090555060010161033b565b5090565b5b5050509050805081600060005082815481101561000257906000526020600020900160005b6101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600160005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055507f4d1e8f2391b486da617ac19662a2e74b44dbb88223c32ac66162549b45e309728282604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b919050566060604052604051606080610f7e833981016040528080519060200190919080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b826001600050819055508160046000508190555080600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055504260026000508190555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505050610e98806100e66000396000f3606060405236156100cc576000357c010000000000000000000000000000000000000000000000000000000090048063325a19f1146100de57806338af3eed14610101578063394ec89d1461013a5780633cb5d1001461017357806342e94c90146101b55780635c76ca2d146101e15780637a3a0e84146102065780637b3e5e7b146102295780638da5cb5b1461024c5780638f03850b14610285578063a63c7ba2146102a8578063adea5682146102e1578063db0251e91461030f578063e184c9be14610334576100cc565b6100dc5b6100d8610357565b505b565b005b6100eb6004805050610527565b6040518082815260200191505060405180910390f35b61010e6004805050610530565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101476004805050610556565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101896004808035906020019091905050610794565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101cb60048080359060200190919050506107d6565b6040518082815260200191505060405180910390f35b6101ee60048050506107f1565b60405180821515815260200191505060405180910390f35b6102136004805050610804565b6040518082815260200191505060405180910390f35b610236600480505061080d565b6040518082815260200191505060405180910390f35b6102596004805050610816565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610292600480505061083c565b6040518082815260200191505060405180910390f35b6102b56004805050610851565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102f760048080359060200190919050506109ea565b60405180821515815260200191505060405180910390f35b61031c6004805050610357565b60405180821515815260200191505060405180910390f35b6103416004805050610a0f565b6040518082815260200191505060405180910390f35b600060006000341180156103775750600460005054346003600050540111155b80156103905750600560009054906101000a900460ff16155b1561051d576000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054141561045f576006600050805480600101828181548183558181151161041f5781836000526020600020918201910161041e9190610400565b8082111561041a5760008181506000905550600101610400565b5090565b5b5050509190906000526020600020900160005b33909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b34905080600360008282825054019250508190555080600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055506001915081507f5dc1fe5ab986a852c4eda8e8bb94247d13307065c593fb83f1a09be2736793823382600360005054604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a1610522565b610002565b5b5090565b60026000505481565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600460005054600360005054108015610587575060011515600560009054906101000a900460ff16151514155b8015610597575060016000505442115b80156105d257506000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054115b801561061b575060001515600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b1561078a576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055503360405161024080610a18833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f091508150600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490508173ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f1935050505015610780577fe34dc7a697103fc8f3d1786482f1565dcbc7b31bf558a7f566e3b622ce314d64828233604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1610785565b610002565b61078f565b610002565b5b5090565b600660005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076000506020528060005260406000206000915090505481565b600560009054906101000a900460ff1681565b60046000505481565b60036000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600660005080549050905061084e565b90565b600060046000505460036000505410158015610880575060001515600560009054906101000a900460ff161515145b156109e1576001600560006101000a81548160ff02191690830217905550600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660405161024080610c58833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f0905080508073ffffffffffffffffffffffffffffffffffffffff166000600360005054604051809050600060405180830381858888f19350505050156109d7577f60a17cb32893b540da8b4a0e5585c27a4cce9a6bbf7886e9e9f8868f52f4190381600360005054600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a16109dc565b610002565b6109e6565b610002565b5b90565b600860005060205280600052604060002060009150909054906101000a900460ff1681565b60016000505481566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'ClaimProxy': {
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
        'bytecode': '6060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'ContributorProxy': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_campaign',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'contribute',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_claimProxy',
                'type': 'address'
              }
            ],
            'name': 'claimReward',
            'outputs': [],
            'type': 'function'
          }
        ],
        'bytecode': '6060604052610154806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480638418cd9914610044578063d279c1911461006557610042565b005b610063600480803590602001909190803590602001909190505061007d565b005b61007b60048080359060200190919050506100ef565b005b8173ffffffffffffffffffffffffffffffffffffffff1663db0251e982604051827c010000000000000000000000000000000000000000000000000000000002815260040180905060206040518083038185886185025a03f115610002575050505060405180519060200150505b5050565b8073ffffffffffffffffffffffffffffffffffffffff166330509bca604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506000604051808303816000876161da5a03f115610002575050505b5056'
      },
      'DispersalCalculator': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'multiplier',
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
            'name': 'divisor',
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
                'name': '_weiValue',
                'type': 'uint256'
              }
            ],
            'name': 'amount',
            'outputs': [
              {
                'name': 'dispersalAmount',
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
            'inputs': [
              {
                'name': '_expiry',
                'type': 'uint256'
              },
              {
                'name': '_multiplier',
                'type': 'uint256'
              },
              {
                'name': '_divisor',
                'type': 'uint256'
              }
            ],
            'type': 'constructor'
          }
        ],
        'bytecode': '6060604052604051606080610199833981016040528080519060200190919080519060200190919080519060200190919050505b8260006000508190555081600160005081905550806002600050819055505b505050610136806100636000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631b3ed7221461005a5780631f2dc5ef1461007d5780638b0d0258146100a0578063e184c9be146100cc57610058565b005b61006760048050506100ef565b6040518082815260200191505060405180910390f35b61008a60048050506100f8565b6040518082815260200191505060405180910390f35b6100b66004808035906020019091905050610101565b6040518082815260200191505060405180910390f35b6100d9600480505061012d565b6040518082815260200191505060405180910390f35b60016000505481565b60026000505481565b600042600060005054111515610127576002600050546001600050548302049050610128565b5b919050565b6000600050548156'
      },
      'DispersalCalculatorFactory': {
        'interface': [
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
            'constant': false,
            'inputs': [
              {
                'name': '_expiry',
                'type': 'uint256'
              },
              {
                'name': '_multiplier',
                'type': 'uint256'
              },
              {
                'name': '_divisor',
                'type': 'uint256'
              }
            ],
            'name': 'createDispersalCalculator',
            'outputs': [
              {
                'name': 'dispersalCalculator',
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
            'name': 'services',
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
                'name': '_service',
                'type': 'address'
              }
            ],
            'name': 'isService',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_service',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_serviceId',
                'type': 'uint256'
              }
            ],
            'name': 'ServiceRegistered',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526105b7806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631847c06b1461005a5780633d3d8fb514610086578063c22c4f43146100da578063e9d8dbfd1461011c57610058565b005b610070600480803590602001909190505061014a565b6040518082815260200191505060405180910390f35b6100ae6004808035906020019091908035906020019091908035906020019091905050610165565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100f060048080359060200190919050506101af565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61013260048080359060200190919050506101f1565b60405180821515815260200191505060405180910390f35b60016000506020528060005260406000206000915090505481565b60008383836040516101998061041e833901808481526020018381526020018281526020019350505050604051809103906000f0905080506101a6816102db565b505b9392505050565b600060005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff166000600050600160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054815481101561000257906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156102c75750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156102d557600190506102d6565b5b919050565b60006102e6826101f1565b156102f057610002565b600060005080548091906001019090815481835581811511610344578183600052602060002091820191016103439190610325565b8082111561033f5760008181506000905550600101610325565b5090565b5b5050509050805081600060005082815481101561000257906000526020600020900160005b6101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600160005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055507f4d1e8f2391b486da617ac19662a2e74b44dbb88223c32ac66162549b45e309728282604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b919050566060604052604051606080610199833981016040528080519060200190919080519060200190919080519060200190919050505b8260006000508190555081600160005081905550806002600050819055505b505050610136806100636000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631b3ed7221461005a5780631f2dc5ef1461007d5780638b0d0258146100a0578063e184c9be146100cc57610058565b005b61006760048050506100ef565b6040518082815260200191505060405180910390f35b61008a60048050506100f8565b6040518082815260200191505060405180910390f35b6100b66004808035906020019091905050610101565b6040518082815260200191505060405180910390f35b6100d9600480505061012d565b6040518082815260200191505060405180910390f35b60016000505481565b60026000505481565b600042600060005054111515610127576002600050546001600050548302049050610128565b5b919050565b6000600050548156'
      },
      'DispersalCalculatorInterface': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': '_weiValue',
                'type': 'uint256'
              }
            ],
            'name': 'amount',
            'outputs': [
              {
                'name': 'dispersalAmount',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          }
        ],
        'bytecode': ''
      },
      'HumanStandardToken': {
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
                'name': '',
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
            'inputs': [],
            'name': 'decimals',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
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
            'constant': true,
            'inputs': [],
            'name': 'symbol',
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
            'constant': false,
            'inputs': [
              {
                'name': '_spender',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              },
              {
                'name': '_extraData',
                'type': 'bytes'
              }
            ],
            'name': 'approveAndCall',
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
            'inputs': [
              {
                'name': '_initialAmount',
                'type': 'uint256'
              },
              {
                'name': '_tokenName',
                'type': 'string'
              },
              {
                'name': '_decimalUnits',
                'type': 'uint8'
              },
              {
                'name': '_tokenSymbol',
                'type': 'string'
              }
            ],
            'type': 'constructor'
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
        'bytecode': '6060604052604060405190810160405280600481526020017f48302e310000000000000000000000000000000000000000000000000000000081526020015060066000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061008c57805160ff19168380011785556100bd565b828001600101855582156100bd579182015b828111156100bc57825182600050559160200191906001019061009e565b5b5090506100e891906100ca565b808211156100e457600081815060009055506001016100ca565b5090565b5050604051610ff4380380610ff4833981016040528080519060200190919080518201919060200180519060200190919080518201919060200150505b83600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081905550836002600050819055508260036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101b257805160ff19168380011785556101e3565b828001600101855582156101e3579182015b828111156101e25782518260005055916020019190600101906101c4565b5b50905061020e91906101f0565b8082111561020a57600081815060009055506001016101f0565b5090565b505081600460006101000a81548160ff021916908302179055508060056000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027757805160ff19168380011785556102a8565b828001600101855582156102a8579182015b828111156102a7578251826000505591602001919060010190610289565b5b5090506102d391906102b5565b808211156102cf57600081815060009055506001016102b5565b5090565b50505b50505050610d0c806102e86000396000f3606060405236156100ab576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde03146100b8578063095ea7b31461013357806318160ddd1461016a57806323b872dd1461018d578063313ce567146101cd57806354fd4d50146101f357806370a082311461026e57806395d89b411461029a578063a9059cbb14610315578063cae9ca511461034c578063dd62ed3e146103ca576100ab565b6100b65b610002565b565b005b6100c560048050506103ff565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61015260048080359060200190919080359060200190919050506104a0565b60405180821515815260200191505060405180910390f35b6101776004805050610574565b6040518082815260200191505060405180910390f35b6101b5600480803590602001909190803590602001909190803590602001909190505061057d565b60405180821515815260200191505060405180910390f35b6101da6004805050610789565b604051808260ff16815260200191505060405180910390f35b610200600480505061079c565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102605780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610284600480803590602001909190505061083d565b6040518082815260200191505060405180910390f35b6102a7600480505061087b565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610334600480803590602001909190803590602001909190505061091c565b60405180821515815260200191505060405180910390f35b6103b26004808035906020019091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610a5c565b60405180821515815260200191505060405180910390f35b6103e96004808035906020019091908035906020019091905050610ca3565b6040518082815260200191505060405180910390f35b60036000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104985780601f1061046d57610100808354040283529160200191610498565b820191906000526020600020905b81548152906001019060200180831161047b57829003601f168201915b505050505081565b600081600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905061056e565b92915050565b60026000505481565b600081600060005060008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410158015610617575081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410155b80156106235750600082115b156107785781600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054019250508190555081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905061078256610781565b60009050610782565b5b9392505050565b600460009054906101000a900460ff1681565b60066000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108355780601f1061080a57610100808354040283529160200191610835565b820191906000526020600020905b81548152906001019060200180831161081857829003601f168201915b505050505081565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610876565b919050565b60056000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109145780601f106108e957610100808354040283529160200191610914565b820191906000526020600020905b8154815290600101906020018083116108f757829003601f168201915b505050505081565b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050541015801561095d5750600082115b15610a4c5781600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610a5656610a55565b60009050610a56565b5b92915050565b600082600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a38373ffffffffffffffffffffffffffffffffffffffff1660405180807f72656365697665417070726f76616c28616464726573732c75696e743235362c81526020017f616464726573732c627974657329000000000000000000000000000000000000815260200150602e01905060405180910390207c0100000000000000000000000000000000000000000000000000000000900433853086604051857c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018280519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610c6b5780820380516001836020036101000a031916815260200191505b509450505050506000604051808303816000876161da5a03f1925050501515610c9357610002565b60019050610c9c565b9392505050565b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610d06565b9291505056'
      },
      'HumanStandardTokenFactory': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_initialAmount',
                'type': 'uint256'
              },
              {
                'name': '_name',
                'type': 'string'
              },
              {
                'name': '_decimals',
                'type': 'uint8'
              },
              {
                'name': '_symbol',
                'type': 'string'
              }
            ],
            'name': 'createHumanStandardToken',
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
              },
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'created',
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
            'name': 'humanStandardByteCode',
            'outputs': [
              {
                'name': '',
                'type': 'bytes'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'createdByMe',
            'outputs': [
              {
                'name': '',
                'type': 'address[]'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_tokenContract',
                'type': 'address'
              }
            ],
            'name': 'verifyHumanStandardToken',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'inputs': [],
            'type': 'constructor'
          }
        ],
        'bytecode': '60606040525b6000610088612710604060405190810160405280600c81526020017f56657269667920546f6b656e00000000000000000000000000000000000000008152602001506003604060405190810160405280600381526020017f565458000000000000000000000000000000000000000000000000000000000081526020015061014f565b9050610093816103a0565b60016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100e157805160ff1916838001178555610112565b82800160010185558215610112579182015b828111156101115782518260005055916020019190600101906100f3565b5b50905061013d919061011f565b80821115610139576000818150600090555060010161011f565b5090565b50505b50611847806103de6000396000f35b6000600085858585604051610ff480611c2583390180858152602001806020018460ff168152602001806020018381038352868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101d45780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561022d5780820380516001836020036101000a031916815260200191505b509650505050505050604051809103906000f090508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb3388604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005080548060010182818154818355818115116103505781836000526020600020918201910161034f9190610331565b8082111561034b5760008181506000905550600101610331565b5090565b5b5050509190906000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555050809150610397565b50949350505050565b6020604051908101604052806000815260200150813b6040519150601f19601f602083010116820160405280825280600060208401853c505b9190505660606040526000357c01000000000000000000000000000000000000000000000000000000009004806308216c0f146100655780635f8dead31461013e578063acad94ae14610189578063dc3f65d314610204578063fc94dd181461025b57610063565b005b6101126004808035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610289565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61015d60048080359060200190919080359060200190919050506104da565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610196600480505061052c565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101f65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61021160048050506105cd565b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f1509050019250505060405180910390f35b6102716004808035906020019091905050610689565b60405180821515815260200191505060405180910390f35b6000600085858585604051610ff48061085383390180858152602001806020018460ff168152602001806020018381038352868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561030e5780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103675780820380516001836020036101000a031916815260200191505b509650505050505050604051809103906000f090508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb3388604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600060005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050805480600101828181548183558181151161048a57818360005260206000209182019101610489919061046b565b80821115610485576000818150600090555060010161046b565b5090565b5b5050509190906000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550508091506104d1565b50949350505050565b600060005060205281600052604060002060005081815481101561000257906000526020600020900160005b915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105c55780601f1061059a576101008083540402835291602001916105c5565b820191906000526020600020905b8154815290600101906020018083116105a857829003601f168201915b505050505081565b6020604051908101604052806000815260200150600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005080548060200260200160405190810160405280929190818152602001828054801561067a57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610646575b50505050509050610686565b90565b6000602060405190810160405280600081526020015060006106aa84610815565b9150600160005080546001816001161561010002031660029004905082511415156106d8576000925061080e565b600090505b815181101561080557600160005081815460018160011615610100020316600290048110156100025790908154600116156107275790600052602060002090602091828204019190065b9054901a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191682828151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415156107f7576000925061080e565b5b80806001019150506106dd565b6001925061080e565b5050919050565b6020604051908101604052806000815260200150813b6040519150601f19601f602083010116820160405280825280600060208401853c505b919050566060604052604060405190810160405280600481526020017f48302e310000000000000000000000000000000000000000000000000000000081526020015060066000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061008c57805160ff19168380011785556100bd565b828001600101855582156100bd579182015b828111156100bc57825182600050559160200191906001019061009e565b5b5090506100e891906100ca565b808211156100e457600081815060009055506001016100ca565b5090565b5050604051610ff4380380610ff4833981016040528080519060200190919080518201919060200180519060200190919080518201919060200150505b83600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081905550836002600050819055508260036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101b257805160ff19168380011785556101e3565b828001600101855582156101e3579182015b828111156101e25782518260005055916020019190600101906101c4565b5b50905061020e91906101f0565b8082111561020a57600081815060009055506001016101f0565b5090565b505081600460006101000a81548160ff021916908302179055508060056000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027757805160ff19168380011785556102a8565b828001600101855582156102a8579182015b828111156102a7578251826000505591602001919060010190610289565b5b5090506102d391906102b5565b808211156102cf57600081815060009055506001016102b5565b5090565b50505b50505050610d0c806102e86000396000f3606060405236156100ab576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde03146100b8578063095ea7b31461013357806318160ddd1461016a57806323b872dd1461018d578063313ce567146101cd57806354fd4d50146101f357806370a082311461026e57806395d89b411461029a578063a9059cbb14610315578063cae9ca511461034c578063dd62ed3e146103ca576100ab565b6100b65b610002565b565b005b6100c560048050506103ff565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61015260048080359060200190919080359060200190919050506104a0565b60405180821515815260200191505060405180910390f35b6101776004805050610574565b6040518082815260200191505060405180910390f35b6101b5600480803590602001909190803590602001909190803590602001909190505061057d565b60405180821515815260200191505060405180910390f35b6101da6004805050610789565b604051808260ff16815260200191505060405180910390f35b610200600480505061079c565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102605780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610284600480803590602001909190505061083d565b6040518082815260200191505060405180910390f35b6102a7600480505061087b565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610334600480803590602001909190803590602001909190505061091c565b60405180821515815260200191505060405180910390f35b6103b26004808035906020019091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610a5c565b60405180821515815260200191505060405180910390f35b6103e96004808035906020019091908035906020019091905050610ca3565b6040518082815260200191505060405180910390f35b60036000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104985780601f1061046d57610100808354040283529160200191610498565b820191906000526020600020905b81548152906001019060200180831161047b57829003601f168201915b505050505081565b600081600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905061056e565b92915050565b60026000505481565b600081600060005060008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410158015610617575081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410155b80156106235750600082115b156107785781600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054019250508190555081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905061078256610781565b60009050610782565b5b9392505050565b600460009054906101000a900460ff1681565b60066000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108355780601f1061080a57610100808354040283529160200191610835565b820191906000526020600020905b81548152906001019060200180831161081857829003601f168201915b505050505081565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610876565b919050565b60056000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109145780601f106108e957610100808354040283529160200191610914565b820191906000526020600020905b8154815290600101906020018083116108f757829003601f168201915b505050505081565b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050541015801561095d5750600082115b15610a4c5781600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610a5656610a55565b60009050610a56565b5b92915050565b600082600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a38373ffffffffffffffffffffffffffffffffffffffff1660405180807f72656365697665417070726f76616c28616464726573732c75696e743235362c81526020017f616464726573732c627974657329000000000000000000000000000000000000815260200150602e01905060405180910390207c0100000000000000000000000000000000000000000000000000000000900433853086604051857c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018280519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610c6b5780820380516001836020036101000a031916815260200191505b509450505050506000604051808303816000876161da5a03f1925050501515610c9357610002565b60019050610c9c565b9392505050565b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610d06565b92915050566060604052604060405190810160405280600481526020017f48302e310000000000000000000000000000000000000000000000000000000081526020015060066000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061008c57805160ff19168380011785556100bd565b828001600101855582156100bd579182015b828111156100bc57825182600050559160200191906001019061009e565b5b5090506100e891906100ca565b808211156100e457600081815060009055506001016100ca565b5090565b5050604051610ff4380380610ff4833981016040528080519060200190919080518201919060200180519060200190919080518201919060200150505b83600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081905550836002600050819055508260036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101b257805160ff19168380011785556101e3565b828001600101855582156101e3579182015b828111156101e25782518260005055916020019190600101906101c4565b5b50905061020e91906101f0565b8082111561020a57600081815060009055506001016101f0565b5090565b505081600460006101000a81548160ff021916908302179055508060056000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027757805160ff19168380011785556102a8565b828001600101855582156102a8579182015b828111156102a7578251826000505591602001919060010190610289565b5b5090506102d391906102b5565b808211156102cf57600081815060009055506001016102b5565b5090565b50505b50505050610d0c806102e86000396000f3606060405236156100ab576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde03146100b8578063095ea7b31461013357806318160ddd1461016a57806323b872dd1461018d578063313ce567146101cd57806354fd4d50146101f357806370a082311461026e57806395d89b411461029a578063a9059cbb14610315578063cae9ca511461034c578063dd62ed3e146103ca576100ab565b6100b65b610002565b565b005b6100c560048050506103ff565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61015260048080359060200190919080359060200190919050506104a0565b60405180821515815260200191505060405180910390f35b6101776004805050610574565b6040518082815260200191505060405180910390f35b6101b5600480803590602001909190803590602001909190803590602001909190505061057d565b60405180821515815260200191505060405180910390f35b6101da6004805050610789565b604051808260ff16815260200191505060405180910390f35b610200600480505061079c565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102605780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610284600480803590602001909190505061083d565b6040518082815260200191505060405180910390f35b6102a7600480505061087b565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610334600480803590602001909190803590602001909190505061091c565b60405180821515815260200191505060405180910390f35b6103b26004808035906020019091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610a5c565b60405180821515815260200191505060405180910390f35b6103e96004808035906020019091908035906020019091905050610ca3565b6040518082815260200191505060405180910390f35b60036000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104985780601f1061046d57610100808354040283529160200191610498565b820191906000526020600020905b81548152906001019060200180831161047b57829003601f168201915b505050505081565b600081600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905061056e565b92915050565b60026000505481565b600081600060005060008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410158015610617575081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410155b80156106235750600082115b156107785781600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054019250508190555081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905061078256610781565b60009050610782565b5b9392505050565b600460009054906101000a900460ff1681565b60066000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108355780601f1061080a57610100808354040283529160200191610835565b820191906000526020600020905b81548152906001019060200180831161081857829003601f168201915b505050505081565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610876565b919050565b60056000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109145780601f106108e957610100808354040283529160200191610914565b820191906000526020600020905b8154815290600101906020018083116108f757829003601f168201915b505050505081565b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050541015801561095d5750600082115b15610a4c5781600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610a5656610a55565b60009050610a56565b5b92915050565b600082600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a38373ffffffffffffffffffffffffffffffffffffffff1660405180807f72656365697665417070726f76616c28616464726573732c75696e743235362c81526020017f616464726573732c627974657329000000000000000000000000000000000000815260200150602e01905060405180910390207c0100000000000000000000000000000000000000000000000000000000900433853086604051857c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018280519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610c6b5780820380516001836020036101000a031916815260200191505b509450505050506000604051808303816000876161da5a03f1925050501515610c9357610002565b60019050610c9c565b9392505050565b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610d06565b9291505056'
      },
      'PrivateServiceRegistry': {
        'interface': [
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
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'services',
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
                'name': '_service',
                'type': 'address'
              }
            ],
            'name': 'isService',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_service',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_serviceId',
                'type': 'uint256'
              }
            ],
            'name': 'ServiceRegistered',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052610232806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631847c06b1461004f578063c22c4f431461007b578063e9d8dbfd146100bd5761004d565b005b61006560048080359060200190919050506100eb565b6040518082815260200191505060405180910390f35b6100916004808035906020019091905050610106565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100d36004808035906020019091905050610148565b60405180821515815260200191505060405180910390f35b60016000506020528060005260406000206000915090505481565b600060005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff166000600050600160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054815481101561000257906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561021e5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561022c576001905061022d565b5b91905056'
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
                'name': '_campaignAddress',
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
                'name': '_campaignAddress',
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6103988061003f6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480632cd535c214610065578063378ed698146100a75780633ea053eb146100d55780634420e486146100ed5780638da5cb5b1461010557610063565b005b61007b600480803590602001909190505061013e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100bd6004808035906020019091905050610180565b60405180821515815260200191505060405180910390f35b6100eb60048080359060200190919050506101a5565b005b6101036004808035906020019091905050610243565b005b6101126004805050610372565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600260005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160005060205280600052604060002060009150909054906101000a900460ff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561023f576000600160005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561036e576001600160005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055506002600050805480600101828181548183558181151161032e5781836000526020600020918201910161032d919061030f565b80821115610329576000818150600090555060010161030f565b5090565b5b5050509190906000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'StandardCampaign': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'created',
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
            'constant': false,
            'inputs': [],
            'name': 'claimRefundOwed',
            'outputs': [
              {
                'name': 'claimProxyAddress',
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
            'name': 'contributors',
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
            'name': 'contributions',
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
            'name': 'paidOut',
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
            'name': 'numContributors',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
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
                'name': 'claimProxyAddress',
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
            'name': 'contributorMadeClaim',
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
            'inputs': [],
            'name': 'contributeMsgValue',
            'outputs': [
              {
                'name': 'contributionMade',
                'type': 'bool'
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
            'inputs': [
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
                'name': '_contributorAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_contributionAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_amountRaised',
                'type': 'uint256'
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
                'name': '_claimProxyAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_beneficiaryTarget',
                'type': 'address'
              }
            ],
            'name': 'BeneficiaryPayoutClaimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_claimProxyAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_refundAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_refundTarget',
                'type': 'address'
              }
            ],
            'name': 'RefundClaimed',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052604051606080610f7e833981016040528080519060200190919080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b826001600050819055508160046000508190555080600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055504260026000508190555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505050610e98806100e66000396000f3606060405236156100cc576000357c010000000000000000000000000000000000000000000000000000000090048063325a19f1146100de57806338af3eed14610101578063394ec89d1461013a5780633cb5d1001461017357806342e94c90146101b55780635c76ca2d146101e15780637a3a0e84146102065780637b3e5e7b146102295780638da5cb5b1461024c5780638f03850b14610285578063a63c7ba2146102a8578063adea5682146102e1578063db0251e91461030f578063e184c9be14610334576100cc565b6100dc5b6100d8610357565b505b565b005b6100eb6004805050610527565b6040518082815260200191505060405180910390f35b61010e6004805050610530565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101476004805050610556565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101896004808035906020019091905050610794565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101cb60048080359060200190919050506107d6565b6040518082815260200191505060405180910390f35b6101ee60048050506107f1565b60405180821515815260200191505060405180910390f35b6102136004805050610804565b6040518082815260200191505060405180910390f35b610236600480505061080d565b6040518082815260200191505060405180910390f35b6102596004805050610816565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610292600480505061083c565b6040518082815260200191505060405180910390f35b6102b56004805050610851565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102f760048080359060200190919050506109ea565b60405180821515815260200191505060405180910390f35b61031c6004805050610357565b60405180821515815260200191505060405180910390f35b6103416004805050610a0f565b6040518082815260200191505060405180910390f35b600060006000341180156103775750600460005054346003600050540111155b80156103905750600560009054906101000a900460ff16155b1561051d576000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054141561045f576006600050805480600101828181548183558181151161041f5781836000526020600020918201910161041e9190610400565b8082111561041a5760008181506000905550600101610400565b5090565b5b5050509190906000526020600020900160005b33909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b34905080600360008282825054019250508190555080600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055506001915081507f5dc1fe5ab986a852c4eda8e8bb94247d13307065c593fb83f1a09be2736793823382600360005054604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a1610522565b610002565b5b5090565b60026000505481565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600460005054600360005054108015610587575060011515600560009054906101000a900460ff16151514155b8015610597575060016000505442115b80156105d257506000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054115b801561061b575060001515600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b1561078a576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055503360405161024080610a18833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f091508150600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490508173ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f1935050505015610780577fe34dc7a697103fc8f3d1786482f1565dcbc7b31bf558a7f566e3b622ce314d64828233604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1610785565b610002565b61078f565b610002565b5b5090565b600660005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076000506020528060005260406000206000915090505481565b600560009054906101000a900460ff1681565b60046000505481565b60036000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600660005080549050905061084e565b90565b600060046000505460036000505410158015610880575060001515600560009054906101000a900460ff161515145b156109e1576001600560006101000a81548160ff02191690830217905550600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660405161024080610c58833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f0905080508073ffffffffffffffffffffffffffffffffffffffff166000600360005054604051809050600060405180830381858888f19350505050156109d7577f60a17cb32893b540da8b4a0e5585c27a4cce9a6bbf7886e9e9f8868f52f4190381600360005054600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a16109dc565b610002565b6109e6565b610002565b5b90565b600860005060205280600052604060002060009150909054906101000a900460ff1681565b60016000505481566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'StandardToken': {
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
                'name': '',
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
        'bytecode': '6060604052610678806100126000396000f360606040523615610074576000357c010000000000000000000000000000000000000000000000000000000090048063095ea7b31461007657806318160ddd146100ad57806323b872dd146100d057806370a0823114610110578063a9059cbb1461013c578063dd62ed3e1461017357610074565b005b61009560048080359060200190919080359060200190919050506101a8565b60405180821515815260200191505060405180910390f35b6100ba600480505061027c565b6040518082815260200191505060405180910390f35b6100f86004808035906020019091908035906020019091908035906020019091905050610285565b60405180821515815260200191505060405180910390f35b6101266004808035906020019091905050610491565b6040518082815260200191505060405180910390f35b61015b60048080359060200190919080359060200190919050506104cf565b60405180821515815260200191505060405180910390f35b610192600480803590602001909190803590602001909190505061060f565b6040518082815260200191505060405180910390f35b600081600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a360019050610276565b92915050565b60026000505481565b600081600060005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050541015801561031f575081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410155b801561032b5750600082115b156104805781600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054019250508190555081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905061048a56610489565b6000905061048a565b5b9392505050565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506104ca565b919050565b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054101580156105105750600082115b156105ff5781600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905061060956610608565b60009050610609565b5b92915050565b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610672565b9291505056'
      },
      'StandardTokenCampaign': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'created',
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
            'constant': false,
            'inputs': [],
            'name': 'claimRefundOwed',
            'outputs': [
              {
                'name': 'claimProxyAddress',
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
            'name': 'contributors',
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
            'name': 'contributions',
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
            'name': 'paidOut',
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
            'name': 'numContributors',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'claimStandardTokensOwed',
            'outputs': [
              {
                'name': 'tokenAmountClaimed',
                'type': 'uint256'
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
                'name': 'claimProxyAddress',
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
            'name': 'contributorMadeClaim',
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
            'inputs': [],
            'name': 'contributeMsgValue',
            'outputs': [
              {
                'name': 'contributionMade',
                'type': 'bool'
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
            'name': 'dispersal',
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
            'name': 'token',
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
              },
              {
                'name': '_dispersalCalculator',
                'type': 'address'
              },
              {
                'name': '_token',
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
                'name': '_tokenAmountClaimed',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_claimRecipient',
                'type': 'address'
              }
            ],
            'name': 'StandardTokensClaimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_contributorAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_contributionAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_amountRaised',
                'type': 'uint256'
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
                'name': '_claimProxyAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_payoutAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_beneficiaryTarget',
                'type': 'address'
              }
            ],
            'name': 'BeneficiaryPayoutClaimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_claimProxyAddress',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_refundAmount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': '_refundTarget',
                'type': 'address'
              }
            ],
            'name': 'RefundClaimed',
            'type': 'event'
          }
        ],
        'bytecode': '606060405260405160a08061156f833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b846001600050819055508360046000508190555082600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055504260026000508190555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505050505061141f806101506000396000f3606060405236156100ed576000357c010000000000000000000000000000000000000000000000000000000090048063325a19f1146100ff57806338af3eed14610122578063394ec89d1461015b5780633cb5d1001461019457806342e94c90146101d65780635c76ca2d146102025780637a3a0e84146102275780637b3e5e7b1461024a5780638da5cb5b1461026d5780638f03850b146102a6578063a555d4b5146102c9578063a63c7ba2146102ec578063adea568214610325578063db0251e914610353578063e184c9be14610378578063eeef479d1461039b578063fc0c546a146103d4576100ed565b6100fd5b6100f961040d565b505b565b005b61010c6004805050610577565b6040518082815260200191505060405180910390f35b61012f6004805050610580565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61016860048050506105a6565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101aa60048080359060200190919050506107e4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ec6004808035906020019091905050610826565b6040518082815260200191505060405180910390f35b61020f6004805050610841565b60405180821515815260200191505060405180910390f35b6102346004805050610854565b6040518082815260200191505060405180910390f35b610257600480505061085d565b6040518082815260200191505060405180910390f35b61027a6004805050610866565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102b3600480505061088c565b6040518082815260200191505060405180910390f35b6102d660048050506108a1565b6040518082815260200191505060405180910390f35b6102f96004805050610bbc565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61033b6004808035906020019091905050610d55565b60405180821515815260200191505060405180910390f35b610360600480505061040d565b60405180821515815260200191505060405180910390f35b6103856004805050610d7a565b6040518082815260200191505060405180910390f35b6103a86004805050610d83565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103e16004805050610da9565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638b0d0258600460005054604051827c0100000000000000000000000000000000000000000000000000000000028152600401808281526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015010151561056e57610563610dcf565b905061057456610573565b610002565b5b90565b60026000505481565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060006004600050546003600050541080156105d7575060011515600560009054906101000a900460ff16151514155b80156105e7575060016000505442115b801561062257506000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054115b801561066b575060001515600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b156107da576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055503360405161024080610f9f833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f091508150600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490508173ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f19350505050156107d0577fe34dc7a697103fc8f3d1786482f1565dcbc7b31bf558a7f566e3b622ce314d64828233604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a16107d5565b610002565b6107df565b610002565b5b5090565b600660005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076000506020528060005260406000206000915090505481565b600560009054906101000a900460ff1681565b60046000505481565b60036000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600660005080549050905061089e565b90565b6000600460005054600360005054101580156108ec57506000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054115b80156109475750600073ffffffffffffffffffffffffffffffffffffffff16600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b8015610990575060001515600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b15610bb3576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690830217905550600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638b0d0258600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054604051827c0100000000000000000000000000000000000000000000000000000000028152600401808281526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090508050600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb3383604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015015610bae577f135600f965388c224dcf80604b2d2eda0803ab1bad24bb4d16af42f6aec28e308133604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b610bb8565b610002565b5b90565b600060046000505460036000505410158015610beb575060001515600560009054906101000a900460ff161515145b15610d4c576001600560006101000a81548160ff02191690830217905550600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051610240806111df833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f0905080508073ffffffffffffffffffffffffffffffffffffffff166000600360005054604051809050600060405180830381858888f1935050505015610d42577f60a17cb32893b540da8b4a0e5585c27a4cce9a6bbf7886e9e9f8868f52f4190381600360005054600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1610d47565b610002565b610d51565b610002565b5b90565b600860005060205280600052604060002060009150909054906101000a900460ff1681565b60016000505481565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600034118015610def5750600460005054346003600050540111155b8015610e085750600560009054906101000a900460ff16155b15610f95576000600760005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050541415610ed75760066000508054806001018281815481835581811511610e9757818360005260206000209182019101610e969190610e78565b80821115610e925760008181506000905550600101610e78565b5090565b5b5050509190906000526020600020900160005b33909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b34905080600360008282825054019250508190555080600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055506001915081507f5dc1fe5ab986a852c4eda8e8bb94247d13307065c593fb83f1a09be2736793823382600360005054604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a1610f9a565b610002565b5b5090566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
      },
      'StandardTokenCampaignFactory': {
        'interface': [
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
            'constant': false,
            'inputs': [
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
              },
              {
                'name': '_dispersalCalculator',
                'type': 'address'
              },
              {
                'name': '_token',
                'type': 'address'
              }
            ],
            'name': 'createCampaign',
            'outputs': [
              {
                'name': 'campaignAddress',
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
            'name': 'services',
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
                'name': '_service',
                'type': 'address'
              }
            ],
            'name': 'isService',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_service',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_serviceId',
                'type': 'uint256'
              }
            ],
            'name': 'ServiceRegistered',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526119f3806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631847c06b1461005a5780636c84b8da14610086578063c22c4f43146100ec578063e9d8dbfd1461012e57610058565b005b610070600480803590602001909190505061015c565b6040518082815260200191505060405180910390f35b6100c06004808035906020019091908035906020019091908035906020019091908035906020019091908035906020019091905050610177565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101026004808035906020019091905050610215565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101446004808035906020019091905050610257565b60405180821515815260200191505060405180910390f35b60016000506020528060005260406000206000915090505481565b6000858585858560405161156f80610484833901808681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200195505050505050604051809103906000f09050805061020a81610341565b505b95945050505050565b600060005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff166000600050600160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054815481101561000257906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561032d5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561033b576001905061033c565b5b919050565b600061034c82610257565b1561035657610002565b6000600050805480919060010190908154818355818115116103aa578183600052602060002091820191016103a9919061038b565b808211156103a5576000818150600090555060010161038b565b5090565b5b5050509050805081600060005082815481101561000257906000526020600020900160005b6101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600160005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055507f4d1e8f2391b486da617ac19662a2e74b44dbb88223c32ac66162549b45e309728282604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b91905056606060405260405160a08061156f833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b846001600050819055508360046000508190555082600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055504260026000508190555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505050505061141f806101506000396000f3606060405236156100ed576000357c010000000000000000000000000000000000000000000000000000000090048063325a19f1146100ff57806338af3eed14610122578063394ec89d1461015b5780633cb5d1001461019457806342e94c90146101d65780635c76ca2d146102025780637a3a0e84146102275780637b3e5e7b1461024a5780638da5cb5b1461026d5780638f03850b146102a6578063a555d4b5146102c9578063a63c7ba2146102ec578063adea568214610325578063db0251e914610353578063e184c9be14610378578063eeef479d1461039b578063fc0c546a146103d4576100ed565b6100fd5b6100f961040d565b505b565b005b61010c6004805050610577565b6040518082815260200191505060405180910390f35b61012f6004805050610580565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61016860048050506105a6565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101aa60048080359060200190919050506107e4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ec6004808035906020019091905050610826565b6040518082815260200191505060405180910390f35b61020f6004805050610841565b60405180821515815260200191505060405180910390f35b6102346004805050610854565b6040518082815260200191505060405180910390f35b610257600480505061085d565b6040518082815260200191505060405180910390f35b61027a6004805050610866565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102b3600480505061088c565b6040518082815260200191505060405180910390f35b6102d660048050506108a1565b6040518082815260200191505060405180910390f35b6102f96004805050610bbc565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61033b6004808035906020019091905050610d55565b60405180821515815260200191505060405180910390f35b610360600480505061040d565b60405180821515815260200191505060405180910390f35b6103856004805050610d7a565b6040518082815260200191505060405180910390f35b6103a86004805050610d83565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103e16004805050610da9565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638b0d0258600460005054604051827c0100000000000000000000000000000000000000000000000000000000028152600401808281526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015010151561056e57610563610dcf565b905061057456610573565b610002565b5b90565b60026000505481565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060006004600050546003600050541080156105d7575060011515600560009054906101000a900460ff16151514155b80156105e7575060016000505442115b801561062257506000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054115b801561066b575060001515600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b156107da576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055503360405161024080610f9f833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f091508150600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490508173ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f19350505050156107d0577fe34dc7a697103fc8f3d1786482f1565dcbc7b31bf558a7f566e3b622ce314d64828233604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a16107d5565b610002565b6107df565b610002565b5b5090565b600660005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076000506020528060005260406000206000915090505481565b600560009054906101000a900460ff1681565b60046000505481565b60036000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600660005080549050905061089e565b90565b6000600460005054600360005054101580156108ec57506000600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054115b80156109475750600073ffffffffffffffffffffffffffffffffffffffff16600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b8015610990575060001515600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b15610bb3576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690830217905550600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638b0d0258600760005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054604051827c0100000000000000000000000000000000000000000000000000000000028152600401808281526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090508050600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb3383604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015015610bae577f135600f965388c224dcf80604b2d2eda0803ab1bad24bb4d16af42f6aec28e308133604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b610bb8565b610002565b5b90565b600060046000505460036000505410158015610beb575060001515600560009054906101000a900460ff161515145b15610d4c576001600560006101000a81548160ff02191690830217905550600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051610240806111df833901808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f0905080508073ffffffffffffffffffffffffffffffffffffffff166000600360005054604051809050600060405180830381858888f1935050505015610d42577f60a17cb32893b540da8b4a0e5585c27a4cce9a6bbf7886e9e9f8868f52f4190381600360005054600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1610d47565b610002565b610d51565b610002565b5b90565b600860005060205280600052604060002060009150909054906101000a900460ff1681565b60016000505481565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600034118015610def5750600460005054346003600050540111155b8015610e085750600560009054906101000a900460ff16155b15610f95576000600760005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050541415610ed75760066000508054806001018281815481835581811511610e9757818360005260206000209182019101610e969190610e78565b80821115610e925760008181506000905550600101610e78565b5090565b5b5050509190906000526020600020900160005b33909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b34905080600360008282825054019250508190555080600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055506001915081507f5dc1fe5ab986a852c4eda8e8bb94247d13307065c593fb83f1a09be2736793823382600360005054604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a1610f9a565b610002565b5b5090566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681566060604052604051602080610240833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b506101b7806100896000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806330509bca146100445780638da5cb5b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610191565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f193505050501561018d57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
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
      'owned': {
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