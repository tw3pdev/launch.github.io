module.exports = {
    presaleView : [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "inputs": [],
            "name": "GADRS",
            "outputs": [
                {
                    "internalType": "contract IWETH",
                    "name": "WETH",
                    "type": "address"
                },
                {
                    "internalType": "contract IPreF",
                    "name": "PRE_F",
                    "type": "address"
                },
                {
                    "internalType": "contract IPreL",
                    "name": "PRE_L",
                    "type": "address"
                },
                {
                    "internalType": "contract IPreA",
                    "name": "PRE_A",
                    "type": "address"
                },
                {
                    "internalType": "contract IPreU",
                    "name": "PRE_U",
                    "type": "address"
                },
                {
                    "internalType": "contract IPreV",
                    "name": "PRE_V",
                    "type": "address"
                },
                {
                    "internalType": "contract ITools",
                    "name": "TOOLS",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "L_ADR",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "TWEP",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "a09",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "a10",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "a11",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "GUINTS",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "B_FEE_R",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "T_FEE_R",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "R_FEE_R",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ETH_GEN_FEE",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ETH_EP_FEE",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ETH_AUDIT_FEE",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ROUND1_LENGTH",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "MIN_PRESALE_TIME_LEFT",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "MIN_PRESALE_LENGTH",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "MAX_PRESALE_LENGTH",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "u10",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "u11",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "PRESET",
            "outputs": [
                {
                    "internalType": "contract IPreS",
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
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "_getTotalValues",
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
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "_tAdr",
                    "type": "address"
                }
            ],
            "name": "checkPresale",
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
            "inputs": [],
            "name": "factory",
            "outputs": [
                {
                    "internalType": "contract gadr",
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
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                }
            ],
            "name": "getBaseTokenStats",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "deci",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tSup",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "getPresale",
            "outputs": [
                {
                    "components": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "totalRaised",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "publicSaleStartTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "startTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "endTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "softCap",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "hardCap",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalContributor",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lockUp",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "liq",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "min",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "max",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "presaleType",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "status",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "presaleRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "listingRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "endoRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "cancelReason",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct combine.Uuint",
                            "name": "uints",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "pAdr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "router",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "token",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "currency",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                }
                            ],
                            "internalType": "struct combine.Adr",
                            "name": "adrs",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "bool",
                                    "name": "isWhitelist",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "isEP",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "canceled",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "finished",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "isRefund",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "insured",
                                    "type": "bool"
                                }
                            ],
                            "internalType": "struct combine.Bools",
                            "name": "bools",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "website",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tele",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "twitter",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "discord",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "medium",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "reddit",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "logo",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "banner",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "detail",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "color",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "premBanner",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.Social",
                            "name": "social",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "decimal",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalSupply",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct combine.Token",
                            "name": "tokenInfo",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct combine.details",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "genIdx",
                    "type": "uint256"
                }
            ],
            "name": "getPresaleAdr",
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
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "getPresaleFactory",
            "outputs": [
                {
                    "components": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "pOwner",
                                    "type": "address"
                                },
                                {
                                    "internalType": "contract IERC20",
                                    "name": "bAdr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "contract IERC20",
                                    "name": "tAdr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "refAdr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "contract IPcsR",
                                    "name": "routerAdr",
                                    "type": "address"
                                }
                            ],
                            "internalType": "struct IPreF.AdrP",
                            "name": "ap",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "preRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "listMulti",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "minSpend",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "maxSpend",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "sc",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "hc",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "sTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "eTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lockDur",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "mode",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "wlTime",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct IPreF.UintP",
                            "name": "up",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "liqRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "ownerRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "boostRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "liqInsurRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "ownerInsurRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "endoRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "liqAmount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "cancelReason",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct IPreF.UUintP",
                            "name": "uup",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "bool",
                                    "name": "insured",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "returnLeft",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "canceled",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "ended",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "finishable",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "finished",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "finalized",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "isEth",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "isEp",
                                    "type": "bool"
                                }
                            ],
                            "internalType": "struct IPreF.BoolP",
                            "name": "bp",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "bDepoTot",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "bWithTot",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tAllocTot",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "bResTot",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct IPreF.PreS",
                            "name": "ps",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "pAdr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "iAmountTot",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "bAmount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tAmount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "bAmount_",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "status",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "reportTime",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct IPreU.PreI",
                            "name": "pi",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct PresaleFront.sPF",
                    "name": "pf",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "idxs",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "idys",
                    "type": "uint256[]"
                }
            ],
            "name": "getPresaleLock",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256[]",
                            "name": "lids",
                            "type": "uint256[]"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "lockId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "tAdr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "lOwner",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "uTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "uRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "vPeriod",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "vRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "vCount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "invalid",
                                    "type": "bool"
                                }
                            ],
                            "internalType": "struct IPreL.TokL[]",
                            "name": "tls",
                            "type": "tuple[]"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "lockId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "tAdr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "lOwner",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "uTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "uRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "vPeriod",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "vRate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "vCount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "invalid",
                                    "type": "bool"
                                }
                            ],
                            "internalType": "struct IPreL.TokL[]",
                            "name": "tls_",
                            "type": "tuple[]"
                        }
                    ],
                    "internalType": "struct PresaleFront.sPresaleLock",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "isContributed",
                    "type": "bool"
                }
            ],
            "name": "getPresaleOwnerByAddress",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address[]",
                            "name": "addresses",
                            "type": "address[]"
                        },
                        {
                            "internalType": "string",
                            "name": "tokenName",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "uuint",
                            "type": "uint256[]"
                        }
                    ],
                    "internalType": "struct PresaleFront.Profile[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "getPresaleRate",
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
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "getPresaleStatus",
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
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                }
            ],
            "name": "getPresaleTool",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "tOwner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "bAdr",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "fAdr",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "pair",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct ITools.AdrP",
                    "name": "",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "sBlock",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockDur",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "incAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tradeDelay",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ITools.UintP",
                    "name": "",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "bool",
                            "name": "ready",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "started_",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct ITools.BoolP",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                }
            ],
            "name": "getPresaleUser",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "pAdr",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "buyerAdr",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "iAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "status",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totals",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IPreU.BuyI",
                    "name": "",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "endoAdr",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endoAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bDepo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bWith",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tAlloc",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bRes",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IPreU.Buyers",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner_",
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
            "name": "owner",
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
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "preStats",
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
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isEth",
                    "type": "bool"
                }
            ],
            "name": "rescueToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "Fadr",
                    "type": "address"
                }
            ],
            "name": "setPresaleSettings",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
    }