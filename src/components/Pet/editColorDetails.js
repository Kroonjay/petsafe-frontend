import {Paper, Select, MenuItem } from "@mui/material";
import { PetMarkings } from "../../constants/PetMarkings";


export default function EditColorDetails() {



  return (
    <Paper>
      <Select value={this.props.primaryColor} onChange={this.props.setPrimaryColor}>
        {Object.entries(PetColor).map(([name, value]) => (
          <MenuItem value={value} key={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Select value={this.props.secondaryColor} onChange={this.props.setSecondaryColor}>
            {Object.entries(PetColor).map(([name, value]) => (
              <MenuItem value={value} key={value}>
                {name}
              </MenuItem>
            ))}
      </Select>
      <Select value={this.props.markings} onChange={this.props.setMarkings}>
        {Object.entries(PetMarkings).map(([name, value]) => (
          <MenuItem value={value} key={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  )
}