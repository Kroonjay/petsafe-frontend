import * as React from 'react';
import { ethers } from 'ethers';
import './App.css';
import petSafeContract from "./contracts/PetSafe.json";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import LostPets from './components/LostPets';
import RegisterPet from './components/RegisterPet';
import MyPets from './components/MyPets';
import PetSingle from './components/Pet';
import PetBasicInfo from './components/RegisterPet/steps/basicInfo';
const contractAddress = "0xc2569b0679c09a0D83408977Bf34c1B076Ba7C46"; //TODO Define this
const petSafeAddress = "0x7a05560b70Ff33A778efbbc1Fe1960Fe1C810549"; //TODO Need to get this dynamically
const abi = petSafeContract.abi;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registryAddress: '',
      currentAccount: ''
    };
  }

  checkWalletIsConnected() {

    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask Installed!");
      return;
    } else {
      console.log("Wallet Exists, Good to Go!");
    }
  }


  setCurrentAccount(account) {
    console.log(`Set Current Account: ${account}`);
    this.setState({currentAccount : account});
  }

  async connectWalletHandler() {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please Install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      console.log("Found an Account! Address: ", accounts[0]);
      this.setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }


  }

  async getRegistryAddress() {

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
        console.log("Found an Account! Address: ", accounts[0]);
        this.setCurrentAccount(accounts[0]);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(petSafeAddress, petSafeContract.abi, signer);
        var _registryAddress = await contract.registry();
        this.setState({registryAddress : _registryAddress});
        console.log(`Retrieved Registry Address: ${this.state.registryAddress}`);
      } else {
        console.log("Ethereum Object does not Exist!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.checkWalletIsConnected();
    this.getRegistryAddress();
  }

  render() {
    return (
      <div className='main-app'>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/lost-pets' element={<LostPets/>} />
            <Route path='/register' element={<MyPets/>}/>
            <Route path='/pets/:petAddress' element={<PetSingle currentAccount={this.state.currentAccount}/>}/>
          </Routes>
        </Router>
    </div>
    )
  }

}

export default App;
