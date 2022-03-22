import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../../assets/logo.svg";

export default function NavBar() {
  
  const [currentAccount, setCurrentAccount] = React.useState(null);

  const checkWalletIsConnected = async () => {

    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask Installed!");
    } else {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      console.log("Wallet Exists, Good to Go!");
    }
  }

  const connectWalletButton = () => {
    return (
      <Button color="inherit" onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </Button>
    )
  }

  const walletConnectedIcon = () => {
    return (
      <CheckCircleOutlineIcon>Connected</CheckCircleOutlineIcon>
    )
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please Install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      console.log("Found an Account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }
  
  React.useEffect(() => {
    checkWalletIsConnected();
  }, [])
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuItem sx={{mx: "auto"}}>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            href=""
          >
            <PetsIcon />
          </IconButton>
          </MenuItem>
          <MenuItem sx={{ mx: "auto"}}>
          <Link href="about" color="inherit" variant="h6">
            About
          </Link>
          </MenuItem>
          <MenuItem sx={{ mx: "auto"}}>
          <Link color="inherit" href="lost-pets" variant="h6">
            Lost Pets
          </Link>
          </MenuItem>
          <MenuItem sx={{ mx: "auto"}}>
          <Link color="inherit" href="register" variant="h6">
            Register
          </Link>
          </MenuItem>
          <MenuItem sx={{ mx: "auto"}} >
          <div>
            {currentAccount ? walletConnectedIcon() : connectWalletButton()}
          </div>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}