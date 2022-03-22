import * as React from 'react';
import { ethers } from 'ethers';
import petContract from "../../../contracts/Pet.json";
import { Box } from '@mui/system';
import { Select, TextField, FormControl, Button } from '@mui/material';

class PetBasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      petType: 0,
      dateOfBirth: new Date()
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    
    this.setState({
      [target.name]: target.value
    });
  }

  async postBasicInfo() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.props.petAddress, petContract.abi, signer);
        let txn = contract.setPermDetails(this.state.petType, this.state.name, this.state.dateOfBirth);
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
      <FormControl sx={{ minWidth: 80 }}>
        <TextField
          required
          id="outlined-required"
          label="Pet Name"
          defaultValue=""
          onChange={this.handleInputChange}/>
        <Select
          required
          value={this.state.petType}
          onChange={this.handleInputChange}
          autoWidth
          label="Pet Type"/>
        <TextField
          id="petBirthday"
          label="Date of Birth"
          type="date"
          defaultValue="2000-01-01"
          sx={{ width: 220 }}/>
        <Button variant="contained">Submit</Button>
      </FormControl>
    )
  }
}

export default PetBasicInfo;