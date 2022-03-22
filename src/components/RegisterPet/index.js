import * as React from 'react';

import petContract from "../../contracts/Pet.json";
import { ethers } from 'ethers';
import { create } from '@mui/material/styles/createTransitions';
import { TextField, FormControl, Select, Stepper, Box, Button, MenuItem } from '@mui/material';
import PetSafeContract from '../../contracts/PetSafe.json';
const petSafeAddress = "0x7a05560b70Ff33A778efbbc1Fe1960Fe1C810549";
const Web3Utils = require('web3-utils');


const selectOptions = ["Cat", "Dog"];

const steps = [
  {
    label: 'Choose a Secret Number',
    description: `The Number must be less than 10 digits`
  },
  {
    label: 'Create a Pet Contract',
    description: `Your secret number will be hashed...`
  },
  {
    label: 'Enter Basic Information',
    description: `These details are permanent and can never be changed!`
  },
  {
    label: 'What does this Pet look like?',
    description: `This info can be changed later on`
  },
  {
    label: 'Where does this Pet Live?',
    description: `This can be changed later on`
  },
  {
    label: 'Am I Friendly?',
    description: `This is very important in case your pet gets lost...`
  },
  {
    label: 'Everything Look Good?',
    description: `Take a second to confirm before submitting`
  }
]



class RegisterPet extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      secretNumber: '',
      secretHash: '',
      petAddress: '',
      name: '',
      petType: '',
      dateOfBirth: new Date()
    };
     
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setSecret = this.setSecret.bind(this);
    this.createPetForm = this.createPetForm.bind(this);
    this.petBasicInfoForm = this.petBasicInfoForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSecretHash() {
    if (this.state.secretNumber) {
      const secretBytes = Web3Utils.utf8ToHex(this.state.secretNumber);
      const _secretHash = ethers.utils.keccak256(secretBytes);
      console.log(`Set Secret Hash: ${this.state.secretHash}`)
      return _secretHash;
    }
  }


  setSecret(event) {
    const value = event.target.value;
    this.setState({secretNumber: value});
    const hash = this.getSecretHash();
    this.setState({secretHash: hash});
    console.log(`Secret Set - Secret Number: ${this.state.secretNumber} - SecretHash: ${hash}`);
  }

  async createPetTx() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.props.petSafeAddress, PetSafeContract.abi, signer);
        const createPetTx = contract.registerPet(this.state.secretHash);
        const _petAddress = await createPetTx.wait();
        console.log(`Set Pet Address: ${_petAddress}`);
        this.setState({petAddress : _petAddress});
        this.setState({activeStep: 1});
        return _petAddress;
      } else {
        console.log("Ethereum Object does not Exist!");
      }
    } catch (err) {
      console.log(err);
    }
  }


  

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  createPetForm() {
    return (
      <Box sx= {{ minWidth: 80 }}>
        <TextField
          required
          id="outlined-required"
          label="Secret Number"
          value={this.state.secretNumber}
          onChange={this.setSecret}/>
        <Button
          variant="contained"
          label="submit"
          onClick={this.createPetTx}>
            Submit
        </Button>
      </Box>
    )
  }

  petBasicInfoForm() {
    return (
      <Box sx= {{ minWidth: 80 }}>
        <TextField
          required
          id="outlined-requred"
          label="Pet Name"
          value={this.name}
          onChange={this.handleInputChange}/>
        <Select
          required
          value={this.state.petType}
          onChange={this.handleInputChange}
          label="Pet Type"/>
        <TextField
          required
          id="outlined-required"
          label="Date of Birth"
          value={this.state.dateOfBirth}
          onChange={this.handleInputChange}/>
        <Button
          variant="contained"
          label="submit"
          onClick={this.setBasicInfoTx}>
        Submit
      </Button>
      </Box>
    )
  }

  renderActiveStep() {
    switch (this.state.activeStep) {
      case 0:
        return this.createPetForm();
      case 1:
        return this.petBasicInfoForm();
      default:
        console.log(`Render Active Step Error - Active Step Unsupported: ${this.state.activeStep}`);
    }
  }

  async handleBlockchainSubmit() {
    console.log("Submitting Create Pet Tx...");
    const _petAddress = await this.createPetTx();
    console.log(`Pet Created Successfully - Address: ${_petAddress}`);
    console.log("Submitting Pet Basic Info Tx...");
    this.setBasicInfoTx();
    console.log("Pet Basic Info Submited Successfully!");
    console.log("Done!");
  }

  handleSubmit() {
    
    console.log('Submitting to Blockchain...');
    this.handleBlockchainSubmit();
  }

  submitTxButton() {
    return (
      <Button
        variant="contained"
        label="submit" 
        onClick={this.handleSubmit}>
          Submit
      </Button>
    )
  }

  

  async setBasicInfoTx() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.state.petAddress, petContract.abi, signer);
        let txn = contract.setPermDetails(this.state.petType, this.state.name, this.state.dateOfBirth.valueOf());
        await txn.wait();
      } else {
        console.log("Ethereum Object does Not Exist");
      }
    } catch (err) {
      console.log(err);
      }
  }

  




  render() {
    return (
      <Box sx= {{ minWidth: 80 }}>
        <TextField
          required
          id="outlined-required"
          label="Secret Number"
          value={this.state.secretNumber}
          onChange={this.setSecret}/>
        <TextField
            required
            id="outlined-requred"
            label="Pet Name"
            value={this.name}
            onChange={this.handleInputChange}/>
        <Select
          required
          value={this.state.petType}
          onChange={this.handleInputChange}
          label="Pet Type">
          <MenuItem value={"1"}>Cat</MenuItem>
          <MenuItem value={2}>Dog</MenuItem>
        </Select>
        <TextField
          required
          id="outlined-required"
          label="Date of Birth"
          value={this.state.dateOfBirth}
          onChange={this.handleInputChange}/>
        <Button
          variant="contained"
          label="submit"
          onClick={this.handleSubmit}>
        Submit
      </Button>
      </Box>
    )
  }
}

export default RegisterPet;