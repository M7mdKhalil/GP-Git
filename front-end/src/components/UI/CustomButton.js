import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import classes from "../UI/Buttons.module.css";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[900],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export function PrimaryButton(props) {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        variant="contained"
        type={props.type}
        onClick={props.onClick}
        endIcon={props.endIcon}
        startIcon={props.startIcon}
        sx={props.sx}

      >
        {props.children}
      </ColorButton>
    </Stack>
  );
}

export function LoadButton(props) {
  return (
    <Stack direction="row" spacing={2}>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        {props.children}
      </LoadingButton>
    </Stack>
  );
}

export function TextButton(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        style={{ color: "var(--dark)" }}
        onClick={props.onClick}
        type={props.type}
        endIcon={props.endIcon}
        startIcon={props.startIcon}
        sx={props.sx}
      >
        {props.children}
      </Button>
    </Stack>
  );
}
