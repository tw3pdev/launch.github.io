module.exports = {
    antibot: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "beforeTransfer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                }
            ],
            "name": "changeTokenOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "distribute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "distributeSame",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "name": "setBls",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
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
                            "internalType": "address",
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
                        }
                    ],
                    "internalType": "struct IPreS.gAdrs",
                    "name": "gAdrs",
                    "type": "tuple"
                },
                {
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gUints",
                    "name": "gUints",
                    "type": "tuple"
                }
            ],
            "name": "setGenerals",
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
                }
            ],
            "name": "setPresaleSettings",
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
                }
            ],
            "name": "setTokenOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
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
                    "name": "ap",
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
                            "name": "lastTrade",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastBuy",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastSell",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tradeDelay",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ITools.UintP",
                    "name": "up",
                    "type": "tuple"
                }
            ],
            "name": "setValues",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "name": "setWls",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
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
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "AP",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "BP",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
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
                    "internalType": "address",
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
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getBls",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getWls",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                }
            ],
            "stateMutability": "view",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "UP",
            "outputs": [
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
                    "name": "lastTrade",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastBuy",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastSell",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tradeDelay",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    presaleSetting: [
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "_BurnAddressList",
                    "type": "address[]"
                }
            ],
            "name": "setBurnAddressList",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_holdAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "_allow",
                    "type": "bool"
                }
            ],
            "name": "setEas",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "adr_params",
                    "type": "address[]"
                }
            ],
            "name": "setGeneralAdrs",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[]",
                    "name": "uint_params",
                    "type": "uint256[]"
                }
            ],
            "name": "setGeneralUints",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "_allow",
                    "type": "bool"
                }
            ],
            "name": "setWls",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "BURN_ADDRESS_LIST",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "EAM",
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
            "name": "GADRS",
            "outputs": [
                {
                    "internalType": "contract IWETH",
                    "name": "WETH",
                    "type": "address"
                },
                {
                    "internalType": "contract IPcsF",
                    "name": "PCS_F",
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
                    "internalType": "contract IAudS",
                    "name": "AUD_S",
                    "type": "address"
                },
                {
                    "internalType": "contract IAudF",
                    "name": "AUD_F",
                    "type": "address"
                },
                {
                    "internalType": "contract ITokF",
                    "name": "TOK_F",
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
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getEas",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getWls",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "isEa",
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
            "inputs": [],
            "name": "SETTINGS",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "contract IWETH",
                            "name": "WETH",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IPcsF",
                            "name": "PCS_F",
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
                            "internalType": "contract IAudS",
                            "name": "AUD_S",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IAudF",
                            "name": "AUD_F",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITokF",
                            "name": "TOK_F",
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
                        }
                    ],
                    "internalType": "struct IPreS.gAdrs",
                    "name": "",
                    "type": "tuple"
                },
                {
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gUints",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    presaleAdmin: [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "PresaleCreated",
            "type": "event"
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
            "name": "INIT_HASH",
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
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "PADRS",
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
                },
                {
                    "internalType": "bool",
                    "name": "doRefund",
                    "type": "bool"
                }
            ],
            "name": "cancelPresale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
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
                            "internalType": "string",
                            "name": "website",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "telegram",
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
                            "name": "premiumBanner",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IPreF.StrP",
                    "name": "sp",
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
                    "internalType": "uint256",
                    "name": "genIdx",
                    "type": "uint256"
                }
            ],
            "name": "createPresale",
            "outputs": [],
            "stateMutability": "payable",
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
                    "internalType": "uint256",
                    "name": "dhc",
                    "type": "uint256"
                }
            ],
            "name": "extendHc",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "finalizeInsur",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "bool",
                    "name": "doAirdrop",
                    "type": "bool"
                }
            ],
            "name": "finishPresale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "fAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "bAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                }
            ],
            "name": "getPair",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
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
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getPresales",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getWls",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
            "name": "isWl",
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
                    "components": [
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
                    "internalType": "struct IPreS.gAdrs",
                    "name": "gAdrs",
                    "type": "tuple"
                },
                {
                    "components": [
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
                    "internalType": "struct IPreS.gUints",
                    "name": "gUints",
                    "type": "tuple"
                }
            ],
            "name": "setGenerals",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "uint256",
                    "name": "sTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "eTime",
                    "type": "uint256"
                }
            ],
            "name": "setPresaleDates",
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
                }
            ],
            "name": "setPresaleSettings",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "uint256",
                    "name": "wlTime",
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
                    "components": [
                        {
                            "internalType": "string",
                            "name": "website",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "telegram",
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
                            "name": "premiumBanner",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IPreF.StrP",
                    "name": "sp",
                    "type": "tuple"
                }
            ],
            "name": "setPresaleValues",
            "outputs": [],
            "stateMutability": "payable",
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
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "name": "setPresaleWls",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
    tokenFactoryAbi : [
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenType",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name_",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol_",
                    "type": "string"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "uints",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bool[]",
                    "name": "bools",
                    "type": "bool[]"
                }
            ],
            "name": "makeToken",
            "outputs": [],
            "stateMutability": "payable",
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
            "name": "sendTokenOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenType",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "makeFee",
                    "type": "uint256"
                }
            ],
            "name": "setTokF",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "uptest_",
                    "type": "uint256"
                }
            ],
            "name": "setUptest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "uptest_",
                    "type": "uint256"
                }
            ],
            "name": "setUptestOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "length",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenType",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "name": "TokenCreated",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "_makeFees",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "_tokFs",
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
            "name": "_uptest",
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
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getTokens",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
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
        }
    ],
    presaleLockerAbi : [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "lOwner_",
                    "type": "address"
                }
            ],
            "name": "changeLockOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
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
                }
            ],
            "name": "createLock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "uTime",
                    "type": "uint256"
                }
            ],
            "name": "extendLock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "incLock",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "sendTokenOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gAdrs",
                    "name": "gAdrs",
                    "type": "tuple"
                },
                {
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gUints",
                    "name": "gUints",
                    "type": "tuple"
                }
            ],
            "name": "setGenerals",
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
                }
            ],
            "name": "setPresaleSettings",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "splitLock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "lOwner",
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
                    "name": "lTime",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "uTime",
                    "type": "uint256"
                }
            ],
            "name": "tokenLocked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "lOwner",
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
                    "name": "uTime",
                    "type": "uint256"
                }
            ],
            "name": "tokenUnlocked",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                }
            ],
            "name": "unlock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
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
                }
            ],
            "name": "getLids",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
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
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getLt",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[]",
                    "name": "idxs",
                    "type": "uint256[]"
                }
            ],
            "name": "getTls",
            "outputs": [
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
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getUlt",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                }
            ],
            "stateMutability": "view",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "TL",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
        }
    ],
    multiSenderAbi : [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "to",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "value",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bool",
                    "name": "isEth",
                    "type": "bool"
                }
            ],
            "name": "SendMultiETH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ],
    IERC20: [
        {
            constant: true,
            inputs: [],
            name: "name",
            outputs: [
                {
                    name: "",
                    type: "string",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "_spender",
                    type: "address",
                },
                {
                    name: "_value",
                    type: "uint256",
                },
            ],
            name: "approve",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [
                {
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "_from",
                    type: "address",
                },
                {
                    name: "_to",
                    type: "address",
                },
                {
                    name: "_value",
                    type: "uint256",
                },
            ],
            name: "transferFrom",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [
                {
                    name: "",
                    type: "uint8",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "_owner",
                    type: "address",
                },
            ],
            name: "balanceOf",
            outputs: [
                {
                    name: "balance",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [
                {
                    name: "",
                    type: "string",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "_to",
                    type: "address",
                },
                {
                    name: "_value",
                    type: "uint256",
                },
            ],
            name: "transfer",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "_owner",
                    type: "address",
                },
                {
                    name: "_spender",
                    type: "address",
                },
            ],
            name: "allowance",
            outputs: [
                {
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            payable: true,
            stateMutability: "payable",
            type: "fallback",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "spender",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "from",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [],
            name: "poolDetails",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "user_", type: "address" }],
            name: "getContributionAmount",
            outputs: [
                { internalType: "uint256", name: "", type: "uint256" },
                { internalType: "uint256", name: "", type: "uint256" },
            ],
            stateMutability: "view",
            type: "function",
        },
    ],
    Tools : [
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "AP",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "BP",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
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
                    "internalType": "address",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "UP",
            "outputs": [
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
                    "name": "lastTrade",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastBuy",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastSell",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tradeDelay",
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "beforeTransfer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                }
            ],
            "name": "changeTokenOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "disperse",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "disperseSame",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getBls",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                },
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getWls",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
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
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "name": "setBls",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
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
                            "internalType": "address",
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
                        }
                    ],
                    "internalType": "struct IPreS.gAdrs",
                    "name": "gAdrs",
                    "type": "tuple"
                },
                {
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gUints",
                    "name": "gUints",
                    "type": "tuple"
                }
            ],
            "name": "setGenerals",
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
                }
            ],
            "name": "setPresaleSettings",
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
                }
            ],
            "name": "setTokenOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
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
                    "name": "ap",
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
                            "name": "lastTrade",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastBuy",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastSell",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tradeDelay",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ITools.UintP",
                    "name": "up",
                    "type": "tuple"
                }
            ],
            "name": "setValues",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "adrs",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "name": "setWls",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
    presaleFactory : [
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "AP",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "BP",
            "outputs": [
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
                    "name": "finished",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "isEth",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
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
                    "internalType": "address",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "PS",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "SP",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "website",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "telegram",
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
                    "name": "kyc",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "color",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "premiumBanner",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "UP",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "UUP",
            "outputs": [
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
                    "name": "SC",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "AMOUNT",
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
                    "internalType": "uint256",
                    "name": "bAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tAlloc",
                    "type": "uint256"
                }
            ],
            "name": "adjustValue",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "bool",
                    "name": "doRefund",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "cancelReason",
                    "type": "uint256"
                }
            ],
            "name": "cancelPresale",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tAlloc",
                    "type": "uint256"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "finalizeInsur",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "bool",
                    "name": "doAirdrop",
                    "type": "bool"
                }
            ],
            "name": "finishPresale",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "getPreStat",
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
            "name": "getRaised",
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
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "adr",
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
            "name": "sendToken",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "sendTokenOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
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
                            "internalType": "address",
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
                        }
                    ],
                    "internalType": "struct IPreS.gAdrs",
                    "name": "gAdrs",
                    "type": "tuple"
                },
                {
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gUints",
                    "name": "gUints",
                    "type": "tuple"
                }
            ],
            "name": "setGenerals",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "bool[5]",
                    "name": "flags",
                    "type": "bool[5]"
                },
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
                            "name": "SC",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "AMOUNT",
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
                            "internalType": "string",
                            "name": "website",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "telegram",
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
                            "name": "kyc",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "color",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "premiumBanner",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IPreF.StrP",
                    "name": "sp",
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
                            "name": "finished",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "isEth",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct IPreF.BoolP",
                    "name": "bp",
                    "type": "tuple"
                }
            ],
            "name": "setParams",
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
                }
            ],
            "name": "setPresaleSettings",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tAlloc",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
    presaleUser : [
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "BI",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "BUYERS",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
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
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "PI",
            "outputs": [
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
                },
                {
                    "internalType": "bool",
                    "name": "doRefund",
                    "type": "bool"
                }
            ],
            "name": "concludeScam",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                }
            ],
            "name": "covered",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "uint256",
                    "name": "bAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "endoAdr",
                    "type": "address"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
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
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "distribute",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getBiIdxs",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                },
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getBuyerAdrs",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getPiIdxs",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gAdrs",
                    "name": "gAdrs",
                    "type": "tuple"
                },
                {
                    "components": [
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
                        }
                    ],
                    "internalType": "struct IPreS.gUints",
                    "name": "gUints",
                    "type": "tuple"
                }
            ],
            "name": "setGenerals",
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
                }
            ],
            "name": "setPresaleSettings",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
    aggr : [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_mode",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
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
                    "name": "buyer",
                    "type": "address"
                }
            ],
            "name": "dxGetContribution",
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
            "name": "dxGetWhitelist",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "idx",
                    "type": "uint256"
                }
            ],
            "name": "getDxSale",
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
                                    "name": "refundType",
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
                                    "name": "saleId",
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
                                    "internalType": "string",
                                    "name": "poolDetails",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "kycDetails",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.String",
                            "name": "strings",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "bool",
                                    "name": "isWhitelist",
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
                                    "name": "tokenName",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "discord",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "youtube",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "BannerandLogo",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "website",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "github",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "twitter",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "reddit",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tele",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "desc",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "empty",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.Social",
                            "name": "social",
                            "type": "tuple"
                        },
                        {
                            "internalType": "string",
                            "name": "ex",
                            "type": "string"
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
                    "internalType": "uint256",
                    "name": "from",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "to",
                    "type": "uint256"
                }
            ],
            "name": "getDxSalePools",
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
                                    "name": "refundType",
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
                                    "name": "saleId",
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
                                    "internalType": "string",
                                    "name": "poolDetails",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "kycDetails",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.String",
                            "name": "strings",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "bool",
                                    "name": "isWhitelist",
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
                                    "name": "tokenName",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "discord",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "youtube",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "BannerandLogo",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "website",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "github",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "twitter",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "reddit",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tele",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "desc",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "empty",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.Social",
                            "name": "social",
                            "type": "tuple"
                        },
                        {
                            "internalType": "string",
                            "name": "ex",
                            "type": "string"
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
                    "internalType": "struct combine.details[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getDxSaleTotalNumberOfPools",
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
                    "internalType": "bool",
                    "name": "isEnded",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "_totalRaised",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "softCap",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_startTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_endTime",
                    "type": "uint256"
                }
            ],
            "name": "getDXStatus",
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
                    "internalType": "uint256",
                    "name": "from",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "to",
                    "type": "uint256"
                }
            ],
            "name": "getPinksalePools",
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
                                    "name": "refundType",
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
                                    "name": "saleId",
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
                                    "internalType": "string",
                                    "name": "poolDetails",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "kycDetails",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.String",
                            "name": "strings",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "bool",
                                    "name": "isWhitelist",
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
                                    "name": "tokenName",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "discord",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "youtube",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "BannerandLogo",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "website",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "github",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "twitter",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "reddit",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tele",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "desc",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "empty",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.Social",
                            "name": "social",
                            "type": "tuple"
                        },
                        {
                            "internalType": "string",
                            "name": "ex",
                            "type": "string"
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
                    "internalType": "struct combine.details[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPinksaleTotalNumberOfPools",
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
            "name": "getPoolInfo",
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
                                    "name": "refundType",
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
                                    "name": "saleId",
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
                                    "internalType": "string",
                                    "name": "poolDetails",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "kycDetails",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.String",
                            "name": "strings",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "bool",
                                    "name": "isWhitelist",
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
                                    "name": "tokenName",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "discord",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "youtube",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "BannerandLogo",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "website",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "github",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "twitter",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "reddit",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tele",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "desc",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "empty",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct combine.Social",
                            "name": "social",
                            "type": "tuple"
                        },
                        {
                            "internalType": "string",
                            "name": "ex",
                            "type": "string"
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
                    "internalType": "contract IERC20",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
                }
            ],
            "name": "getTotalValues",
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
                    "name": "pAdr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                }
            ],
            "name": "pinksaleGetContribution",
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
            "name": "pinksaleGetWhitelist",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}