module.exports = {
    detailsAbi: [
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
                    "internalType": "address",
                    "name": "pAdr",
                    "type": "address"
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
                        }
                    ],
                    "internalType": "struct IPreF.AdrP",
                    "name": "aP",
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
                            "name": "liqRate",
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
                        }
                    ],
                    "internalType": "struct IPreF.UintP",
                    "name": "uP",
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
                            "name": "audit",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "kyc",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IPreF.StrP",
                    "name": "sP",
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
                            "name": "canceled",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "wlOnly",
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
                    "name": "bP",
                    "type": "tuple"
                }
            ],
            "name": "createPresale",
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
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_earlyToken",
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
                    "internalType": "bool",
                    "name": "isToken",
                    "type": "bool"
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
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isEth",
                    "type": "bool"
                }
            ],
            "name": "getTokenOwner",
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
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_audit",
                    "type": "string"
                }
            ],
            "name": "setAudit",
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
                    "name": "cancelReason",
                    "type": "uint256"
                }
            ],
            "name": "setCancelReason",
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
                    "name": "_startDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_endDate",
                    "type": "uint256"
                }
            ],
            "name": "setDates",
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
                    "internalType": "string",
                    "name": "_kyc",
                    "type": "string"
                }
            ],
            "name": "setKyc",
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
                    "internalType": "bool",
                    "name": "wlOnly",
                    "type": "bool"
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
                            "name": "audit",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "kyc",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IPreF.StrP",
                    "name": "sP",
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
                    "name": "pAdr",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "_users",
                    "type": "address[]"
                },
                {
                    "internalType": "bool[]",
                    "name": "_adds",
                    "type": "bool[]"
                }
            ],
            "name": "setWhitelist",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
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
                    "internalType": "bool",
                    "name": "isToken",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "emer",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "extra",
                    "type": "bool"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
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
                    "name": "canceled",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "wlOnly",
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
                    "name": "bRes",
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
            "name": "getWhitelist",
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
                    "name": "bResTot",
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
                    "name": "audit",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "kyc",
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
                    "name": "liqRate",
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
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}