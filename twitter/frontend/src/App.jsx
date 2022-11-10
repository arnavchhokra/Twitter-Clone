import reactLogo from "./assets/react.svg";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import "./Style.css";

function App() {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [text, settext] = useState();
  const [correctNetwork, setCorrectNetwork] = useState(true);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }

    if (account !== null) {
      settext(account.slice(0, 4) + "...");
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log(chainId);
    }
  };

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };

  return (
    <div className="App">
      {account === null ? (
        <button onClick={connectHandler} class="connector-meta">
          Connect account
        </button>
      ) : correctNetwork ? (
        <div className="App-Container">
          <Sidebar />
          <Feed />
          <button onClick={connectHandler} class="connector-meta">
            {" "}
            {account.slice(0,4)}{" "}
          </button>
        </div>
      ) : (
        console.log("Connettttt")
      )}
    </div>
  );
}

export default App;
