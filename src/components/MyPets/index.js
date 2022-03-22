import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ethers } from 'ethers';
import petSafeContract from "../../contracts/PetSafe.json";
import registryContract from "../../contracts/Registry.json"
import { Typography, Container, Link } from '@mui/material';
import  Pet  from "../Pet";


const petSafeAddress = "0x7a05560b70Ff33A778efbbc1Fe1960Fe1C810549"; //TODO Need to get this dynamically
class MyPets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      registryAddress: '',
      lostPets: [],
      createdEvents: [],
    };

    this.getRegistryAddress = this.getRegistryAddress.bind(this);
    this.getMyPets = this.getMyPets.bind(this);
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

  async getMyPets() {
    await this.getRegistryAddress();
    console.log("Getting My Pets!");
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.state.registryAddress, registryContract.abi, signer);
        contract.queryFilter("PetCreated", 10004325,'latest').then(events => this.setState({createdEvents: events})).catch((err) => console.error(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getMyPets();
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
                <TableCell align="right">Pet Address</TableCell>
                <TableCell align="right">Owner Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.createdEvents.map((pet) => (
                 <TableRow key={pet.args[0]}>
                    <TableCell align="right">
                        <Link href={`pets/${pet.args[0]}`}>
                          {pet.args[0]}
                        </Link>
                    </TableCell> 
                   <TableCell align="right">
                    <Pet petAddress={pet.args[0]}/>
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

export default MyPets;