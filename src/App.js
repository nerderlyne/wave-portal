import React, {useEffect, useState } from "react";
import { ethers } from "ethers";
import waveportal from './utils/WavePortal.json';
import './App.css';

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  // smart contract data
  const contractAddress = "0x1376a6Cef414704C98441C8d60E94d47c10C35f3";
  const contractABI = waveportal.abi;

  const checkWalletConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({method: 'eth_accounts'});

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorised account: ", account);
      } else {
        console.log("No authorized account found")
      }
    }  catch (error) {
        console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    checkWalletConnected();
  }, [])
  
  return (<>
    <header>
      <h1>WavePortal &#x1F44B;</h1>
      <button className="connectWallet" onClick={connectWallet}>Connect Wallet</button>
    </header>
  </>)
}

export default App;

