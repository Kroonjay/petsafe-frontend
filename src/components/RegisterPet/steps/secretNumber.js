import { ethers } from 'ethers';
import * as React from 'react';


class SecretNumberStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secretNumber: 0,
      secretHash: ''
    };

  }

  async createPetTx() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.props.petSafeAddress, PetSafeContract.abi, signer);
        const createPetTx = await contract.registerPet(this.state.secretHash);
        const _petAddress = createPetTx.wait();
        this.setState({petAddress : _petAddress});
        this.setState({activeStep: 1});
      } else {
        console.log("Ethereum Object does not Exist!");
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
        <Button
          variant="contained"
          label="submit"
          onClick={this.createPetTx}>
            Submit
        </Button>
      </Box>
    )
  }
}