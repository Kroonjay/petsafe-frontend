import {
  Typography,
  Paper,
  Box,
  Card,
  CardHeader,
  Avatar,
  TextField,
  CardContent,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ethers } from "ethers";
import * as React from "react";
import PetContract from "../../contracts/Pet.json";
import { useParams } from "react-router-dom";
import { PetStatus, getPetStatus } from "../../constants/PetStatus";
import { PetType, getPetType } from "../../constants/PetType";
import { PetColor, getPetColor } from "../../constants/PetColor";
import { PetMarkings, getPetMarkings } from "../../constants/PetMarkings";
import PetsIcon from "@mui/icons-material/PetsOutlined";
import CheckCircle from "@mui/icons-material/CheckCircleOutlined";
import { SettingsInputHdmiOutlined } from "@mui/icons-material";
 
export default function PetSingle(props) {
  let { petAddress } = useParams();
  const [petStatus, setPetStatus] = React.useState(0);
  const [ownerAddress, setOwnerAddress] = React.useState(null);
  const [keeperAddress, setKeeperAddress] = React.useState(null);
  const [petName, setPetName] = React.useState(null);
  const [petType, setPetType] = React.useState(0);
  const [primaryColor, setPrimaryColor] = React.useState(0);
  const [secondaryColor, setSecondaryColor] = React.useState(0);
  const [markings, setMarkings] = React.useState(0);
  const [petStatusColor, setPetStatusColor] = React.useState(null);
  const [petIsMine, setPetIsMine] = React.useState(false);


  const getProvider = () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        return provider;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const getSigner = () => {
    const provider = getProvider();
    const signer = provider.getSigner();
    return signer;
  };

  const getPetStatusColor = (petStatus) => {
    switch (petStatus) {
      case PetStatus.Unregistered:
        return "warning.main";
      case PetStatus.Lost:
        return "error.main";
      default:
        return "primary.main";
    }
  };

  const getPetDetails = async () => {
    if (petAddress != null) {
      const provider = getProvider();
      const signer = getSigner();
      const petContract = new ethers.Contract(
        petAddress,
        PetContract.abi,
        signer
      );
      let _petName = await petContract.name();
      setPetName(_petName);
      let _petStatusValue = await petContract.status();
      const _petStatus = getPetStatus(_petStatusValue);
      setPetStatus(_petStatus);
      const _petStatusColor = getPetStatusColor(petStatus);
      setPetStatusColor(_petStatusColor);
      let _ownerAddress = await petContract.owner();
      setOwnerAddress(_ownerAddress);
      let _keeperAddress = await petContract.keeper();
      setKeeperAddress(_keeperAddress);
      let _petTypeValue = await petContract.petType();
      const _petType = getPetType(_petTypeValue);
      setPetType(_petType);
      let _primaryColorValue = await petContract.primaryColor();
      const _primaryColor = getPetColor(_primaryColorValue);
      setPrimaryColor(_primaryColor);
      let _secondaryColorValue = await petContract.secondaryColor();
      const _secondaryColor = getPetColor(_secondaryColorValue);
      setSecondaryColor(_secondaryColor);
      let _markingsValue = await petContract.markings();
      const _markings = getPetMarkings(_markingsValue);
      setMarkings(_markings);
    } else {
      console.log("Pet Address is Null!");
    }
  };

  const checkIfMyPet = () => {
    if (ownerAddress.toUpperCase() === props.currentAccount.toUpperCase()) {
      setPetIsMine(true);
    } else {
      setPetIsMine(false);
    }
    console.log(`Set Pet is Mine | ${petIsMine} | Current Account: ${props.currentAccount}`);
  }

  const handleNameChange = (event) => {
    setPetName(event.target.value);
    console.log(`Set Pet Name | Name: ${petName}`);
  };

  const handlePrimaryColorChange = (event) => {
    setPrimaryColor(event.target.value);
    console.log(`Set Primary Color | Primary Color: ${primaryColor}`);
  };

  React.useEffect(() => {
    console.log(`Pet Address: ${petAddress}`);
    getPetDetails();
    //checkIfMyPet();
  });

  return (
    <Paper elevation={0} variant="outlined" sx={{ margin: 4 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="petIcon">
              {petIsMine ? (
                <CheckCircle/>
              ) : (
                <PetsIcon />
              )}
            </Avatar>
          }
          title={petName}
          subheader={petStatus.name}
          titleTypographyProps={{ variant: "h4" }}
          subheaderTypographyProps={{ color: petStatusColor, variant: "h4" }}
          sx={{ bgcolor: grey[300] }}
        />
        <CardContent>
          <Divider />
          <Typography variant="h6">
            Primary Color: {primaryColor.name}
          </Typography>
          <Typography variant="h6">
            Secondary Color: {secondaryColor.name}
          </Typography>
          <Typography variant="h6">Markings: {markings.name}</Typography>
          <Typography variant="h6">Owner: {ownerAddress}</Typography>
          <Divider />
          <Typography variant="h6">Keeper: {keeperAddress}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
