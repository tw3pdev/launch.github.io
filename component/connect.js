import Web3 from "web3";

export const connectAccount = async (wallet, network, router) => {
  const setProvider = async (wallet, network) => {
    if (network) {
  
      if (wallet == "metamask") {
        await ethereum.request({ method: "eth_requestAccounts" });
        return ethereum
        //   if(router.pathname != "/pool/[id]"){
        //     router.push({ path: '', query: { chain : 'BSC' }})
        //   }else{
        //     // router.push({ path: '', query: {id: router.query.id, chain : 'BSC' }})
        //   }
      }else if (wallet == "walletconnect") {
        const { default: WalletConnectProvider } = await import(
          "@walletconnect/web3-provider"
        );
        const walletConnectProvider = new WalletConnectProvider({
          chainId: 56,
          rpc: {
            56: "https://bsc-dataseed.binance.org",
          },
        });
        await walletConnectProvider.enable();
        return walletConnectProvider;
      }
    } 
  };

  
  try {
    const web3 = new Web3(await setProvider(wallet, network));
    const addresses = await web3.eth.getAccounts();
    const address = addresses[0];
    const chainId = web3.utils.toHex(await web3.eth.getChainId());
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address),
      "ether"
    );
    return { status: true, data: { web3, address, chainId, balance } };
  } catch (_) {
      return { status: false };

  }
};

 const changeChains = async (wallet, network) => {
  if(wallet == 'metamask') {
    if (network == "ETH") {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
        return ethereum;
      } catch (e) {
        if (e.code === 4902) {
          const CN = "ETH Mainnet";
          const SY = "ETH";
          const RPC = "https://mainnet.infura.io/v3/";
          const CM = "Ethereum";
          const BE = "https://etherscan.io";
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: CN,
                chainId: "0x1",
                nativeCurrency: { name: CM, decimals: 18, symbol: SY },
                rpcUrls: [RPC],
                blockExplorerUrls: [BE],
              },
            ],
          });
          return ethereum;
        } else {
          return ethereum;
        }
      }
    } else if (network == "OKC") {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x42" }],
        });
        return ethereum;
      } catch (e) {
        if (e.code === 4902) {
          const CN = "OKC Mainnet";
          const SY = "OKT";
          const RPC = "https://exchainrpc.okex.org";
          const CM = "OKC";
          const BE = "https://www.oklink.com/okexchain/";
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: CN,
                chainId: "0x42",
                nativeCurrency: { name: CM, decimals: 18, symbol: SY },
                rpcUrls: [RPC],
                blockExplorerUrls: [BE],
              },
            ],
          });
          return ethereum;
        } else {
          return ethereum;
        }
      }
    } else if (network == "BSC-tsnt") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
      return ethereum;
    } else {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
        return ethereum; 
      } catch (e) {
        if (e.code === 4902) {
          const CN = "BSC Mainnet";
          const SY = "BNB";
          const RPC = "https://bsc-dataseed1.ninicoin.io";
          const CM = "Binance Smart Chain";
          const BE = "https://bscscan.com/";
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: CN,
                chainId: "0x38",
                nativeCurrency: { name: CM, decimals: 18, symbol: SY },
                rpcUrls: [RPC],
                blockExplorerUrls: [BE],
              },
            ],
          });
          return ethereum;
        } else {
          return ethereum;
        }
      }
    }
  }
}

export const changeChain = async (wallet, network, router) => {
  try {
    const web3 = new Web3(await changeChains(wallet, network));
    const addresses = await web3.eth.getAccounts();
    const address = addresses[0];
    const chainId = web3.utils.toHex(await web3.eth.getChainId());
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address),
      "ether"
    );
    return { status: true, data: { web3, address, chainId, balance } };
  } catch (_) {
      return { status: false };

  }
}
export const checkLogin = async () => {
  try {
    const Metamask = await ethereum.request({ method: "eth_accounts" });
    if (Metamask.length === 0) {
      const { default: WalletConnectProvider } = await import(
        "@walletconnect/web3-provider"
      );
      const walletConnectProvider = new WalletConnectProvider({
        chainId: 1,
        rpc: {
          1: "https://ethereum.infura.io/v3/",
        },
      });
      if (walletConnectProvider.wc._accounts.length === 0) {
        return { status: false };
      } else {
        return { status: true, provider: "walletconnect" };
      }
    } else {
      return { status: true, provider: "metamask" };
    }
  } catch (_) {}
  return { status: false };
};
