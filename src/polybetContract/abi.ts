export default [
  {
    "inputs": [],
    "name": "AccessControlBadConfirmation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "neededRole",
        "type": "bytes32"
      }
    ],
    "name": "AccessControlUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      }
    ],
    "name": "AddressEmptyCode",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "AddressInsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FailedInnerCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotInitializing",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votingStart",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "round1Duration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "round2Duration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "disputeDuration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32[]",
        "name": "options",
        "type": "bytes32[]"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfs",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "bettingDeadline",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "feePolicyId",
        "type": "uint16"
      }
    ],
    "name": "BetCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "option",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "coefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "BetProvided",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "orderBook",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fromOption",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "toOption",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fromCoefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "toCoefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "BetSwapped",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "option",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "orderBook",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "coefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "BetWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "merkleRoot",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Claimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DeclinedBetWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "version",
        "type": "uint64"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "option",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "coefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "LiquidityProvided",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "orderBook",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fromOption",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "toOption",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fromCoefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "toCoefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "LiquiditySwapped",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "option",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "orderBook",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "coefficient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "LiquidityWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "policyId",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "totalFeeBps",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "minTreasuryFeeBps",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "referralFeeLimitBps",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "stakingFeeBps",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "votingFeeBps",
        "type": "uint16"
      }
    ],
    "name": "NewFeePolicy",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "keeper",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "topic",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "merkleRoot",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "merkleIpfs",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalProfit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "referralRewards",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "treasuryRewards",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votingRewards",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "farmingRewards",
        "type": "uint256"
      }
    ],
    "name": "RewardsAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BASIS_POINTS_DIVISOR",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "HANDLER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "KEEPER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_COEFICIENT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_TOTAL_FEE_BPS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_COEFICIENT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_EVENT_LIVE_DURATION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_INITIAL_LIQUIDITY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ORDER_BOOK_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_merkleRoot",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_merkleIpfs",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_totalProfit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_referralRewards",
        "type": "uint256"
      }
    ],
    "name": "assignRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "betEvents",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "bettingDeadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalLiquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalBet",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "merkleClaimRoot",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "merkleIpfs",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "ipfs",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalClaim",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "feePolicyId",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "betToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_totalProfit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_referralRewards",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "_feePolicyId",
        "type": "uint16"
      }
    ],
    "name": "calculateFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_merkleRoot",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32[]",
        "name": "_proof",
        "type": "bytes32[]"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "topicName",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "votingStart",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "round1Duration",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "round2Duration",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "disputeDuration",
            "type": "uint256"
          },
          {
            "internalType": "bytes32[]",
            "name": "options",
            "type": "bytes32[]"
          },
          {
            "internalType": "string",
            "name": "ipfs",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "bettingDeadline",
            "type": "uint256"
          },
          {
            "internalType": "bytes32[]",
            "name": "provideLiquidityOptions",
            "type": "bytes32[]"
          },
          {
            "internalType": "uint256[]",
            "name": "coeficients",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "liquiditiesAmount",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct BetManager.CreateBetEventParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "createBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "name": "feePolicies",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "totalFeeBps",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "referralFeeLimitBps",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "minTreasuryFeeBps",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "stakingFeeBps",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "votingFeeBps",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      }
    ],
    "name": "getNonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      }
    ],
    "name": "getTotalLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_betToken",
        "type": "address"
      },
      {
        "internalType": "contract ExclusiveVotingHandler",
        "name": "_votingHandler",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_projectTreasury",
        "type": "address"
      },
      {
        "internalType": "contract ReferralDistributor",
        "name": "_referralRewardsDistributor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_stakingRewardsAccumulator",
        "type": "address"
      },
      {
        "internalType": "contract IReferralStorage",
        "name": "_referralStorage",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastFeePolicyId",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "merkleRootToTopic",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "optionExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "participants",
    "outputs": [
      {
        "internalType": "bool",
        "name": "hasWithdrawnBalance",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "providedLiquidityAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "providedBetAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "projectTreasury",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "_options",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_coeficients",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_betAmounts",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "_referrer",
        "type": "address"
      }
    ],
    "name": "provideBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "_options",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_coeficients",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_liquiditiesAmount",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "_referrer",
        "type": "address"
      }
    ],
    "name": "provideLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "referralRewardsDistributor",
    "outputs": [
      {
        "internalType": "contract ReferralDistributor",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "referralStorage",
    "outputs": [
      {
        "internalType": "contract IReferralStorage",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "callerConfirmation",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "totalFeeBps",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "referralFeeLimitBps",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "minTreasuryFeeBps",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "stakingFeeBps",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "votingFeeBps",
            "type": "uint16"
          }
        ],
        "internalType": "struct BetManager.FeePolicy",
        "name": "_feePolicy",
        "type": "tuple"
      }
    ],
    "name": "setFeePolicy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stakingRewardsAccumulator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "topicName",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "fromOption",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "toOption",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "fromCoefficient",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "toCoefficient",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct BetManager.SwapParams",
        "name": "_params",
        "type": "tuple"
      }
    ],
    "name": "swapBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "topicName",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "fromOption",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "toOption",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "fromCoefficient",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "toCoefficient",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct BetManager.SwapParams",
        "name": "_params",
        "type": "tuple"
      }
    ],
    "name": "swapLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_root",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "_proof",
        "type": "bytes32[]"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "verify",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingHandler",
    "outputs": [
      {
        "internalType": "contract ExclusiveVotingHandler",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_option",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_coefficient",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      }
    ],
    "name": "withdrawDeclinedBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_topicName",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_option",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_coefficient",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]