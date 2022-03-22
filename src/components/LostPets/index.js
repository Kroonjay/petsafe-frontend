import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ethers } from 'ethers';
import petSafeContract from "../../contracts/PetSafe.json";
import registryContract from "../../contracts/Registry.json"
import { Typography, Container } from '@mui/material';

const petSafeAddress = "0x7a05560b70Ff33A778efbbc1Fe1960Fe1C810549"; //TODO Need to get this dynamically
class LostPets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      registryAddress: '',
      lostPets: []
    };

    this.getRegistryAddress = this.getRegistryAddress.bind(this);
    this.getLostPets = this.getLostPets.bind(this);
  }
  async getRegistryAddress() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
        console.log("Found an Account! Address: ", accounts[0]);
        this.setState({ account: accounts[0] });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(petSafeAddress, petSafeContract.abi, signer);
        var _registryAddress = await contract.registry();
        this.setState({ registryAddress: _registryAddress})
        console.log(`Retrieved Registry Address: ${this.state.registryAddress}`);
      } else {
        console.log("Ethereum Object does not Exist!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getLostPets() {
    await this.getRegistryAddress();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.state.registryAddress, registryContract.abi, signer);
        const _lostPets = await contract.lostPets();
        this.setState({
          lostPets: _lostPets
        }); //TODO Fix this to not assign the array directly
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getMyPets() {
    await this.getRegistryAddress();
    console.log("Getting My Pets!");
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.state.registryAddress, registryContract.abi, signer);
        contract.queryFilter("PetCreated", 10004325,'latest').then(events => console.log(events)).catch((err) => console.error(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getMyPets();
    this.getLostPets();
  }


  render() {
    return (
      <Container>
        <Container align="right">
          <Typography variant="h6">
            {this.state.registryAddress}
          </Typography>
          </Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.lostPets.map((pet) => (
                 <TableRow>
                   <TableCell align="right">
                      <Link color="inherit" href={`pets/${pet}`} variant="h6">
                      {pet}
                      </Link>
                    </TableCell> 
                 </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  }
}

export default LostPets;