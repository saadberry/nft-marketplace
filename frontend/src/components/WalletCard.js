import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import Button from '@material-ui/core/Button';
import cat from '../cat.jpeg'

function Admin() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [rollnumber, setRollnumber] = useState('');
//   const [alert_user,setAlert] = useState(0)

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const account = await provider.listAccounts();
      setProvider(provider);
      setAccount(account);
      
    //   alert("Successfully Authenticated with Metamask")
    } else {
    //   console.log();
    alert("Please install MetaMask!")
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  //pool address
  var usdt_pool_address = '0x8a3971b14fb6b360f058f160f634c4e4afad72db'
  var matic_pool_address = '0xeDD1450147a90B69CEE0d04A2d585e1068f63902'
  
  var referrer = '0x4E3908F7109f57E4A31c2986a8aab5C3D0b5B592'
  
  //deployed address of token sale contract
  var token_sale_contract = '0x6549b3095B77DB09367AA5f7982be10dfB965bF3'

  //creating contract instances
  const tokenSale = new ethers.Contract(token_sale_contract);

  async function buyTokens() {

   var tokenAmount = 2;
    // Buy tokens
    const buyTokensTx = await tokenSale.buyTokens(referrer, tokenAmount, matic_pool_address, { value: 0 }); // Use { value: 0 } for non-ETH purchases
    await buyTokensTx.wait();
  
    console.log("Tokens purchased successfully!");
  }
  
  return (
    <>
      <div className="card">
        <h1>Cat NFT</h1>
        <img src={cat}></img>
        <h2>0.5 ETH</h2>
        <p>View NFT on IPFS: https://bafybeidgzxocqhkonqtnydydy5kaevkoz3graniuhvldk2dj3ljyuanvzq.ipfs.dweb.link/</p>
        <button className={Button} id='usdt' onClick={buyTokens}></button>
        <Button variant="contained" color="primary" >
        Buy using USDT
            </Button>

            <Button variant="contained" color="primary" id='matic' onClick={buyTokens} >
            Buy using MATIC
            </Button>
        
      </div>
    </>
  );
}

export default Admin;