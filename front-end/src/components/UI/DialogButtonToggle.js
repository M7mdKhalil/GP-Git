import React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import classes from "../UI/DialogButtonToggle.module.css";

export function DialogButtonToggle(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // const actions = [{ icon: props.icons, name: "Add Offer" }];
  const actions = [];
  return (
    <Box
      sx={{ height: 60, transform: "translateZ(0px)", flexGrow: 1 }}
      className={classes.box}
    > 
      {/* <Backdrop open={open} className={classes.backdrop} /> */}
      <SpeedDial
        className={classes.menuButton}
        ariaLabel="action buttons"
        sx={{ position: "absolute", bottom: 0, left: 16 }}
        icon={<SpeedDialIcon />}  
        onClose={handleClose}
        onOpen={handleOpen}
        onClick={props.onClick}
        open={open}
        direction="right"
      >
        {actions.map((action) => (
          <SpeedDialAction
            className={classes.subButtons}
            key={action.name}
            icon={action.icon}
            onClick={handleClose}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
