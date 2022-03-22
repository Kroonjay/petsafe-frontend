import { TextField, Select, MenuItem, Paper } from "@mui/material"
import { PetType } from "../../constants/PetType"


export default function EditBasicDetails() {


  return (
    <Paper>
      <TextField value={this.props.petName} onChange={this.props.handleNameChange}>
        {this.props.petName}
      </TextField>
      <Select value={this.props.petType} onChange={this.props.setPetType}>
      {Object.entries(PetType).map(([name, value]) => (
        <MenuItem value={value} key={value}>
          {name}
        </MenuItem>
      ))}
    </Select>
    <TextField value={this.props.dateOfBirth} onChange={this.props.handleDoBChange}>
      {this.props.dateOfBirth}
    </TextField>
  </Paper>
  )
}