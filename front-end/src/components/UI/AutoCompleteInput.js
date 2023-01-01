import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function AutoCompleteInput(props) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props.options}
      sx={{ width: 400 }}
      value={props.value}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      isOptionEqualToValue={props.isOptionEqualToValue}
      getOptionLabel={props.getOptionLabel}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}
