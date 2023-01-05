import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Input, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import "../../stylesheets/login&register.css";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function AddChip(props) {
  const [newSkill, setNewSkill] = React.useState("");
  const [chipData, setChipData] = React.useState(props.defaultSkills);

  const addSkillHandler = () => {
    const i = chipData.length + 1;
    setChipData((chips) => [...chips, { key: i, label: newSkill }]);
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  React.useEffect(() => {
    props.skills(chipData);
  }, [chipData]);
  let i = 0;
  return (
    <div className="addChip">
      <TextField
        sx={{ width: 900 }}
        label={props.label}
        onChange={(e) => {
          setNewSkill(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment onClick={addSkillHandler} position="end">
              <AddIcon></AddIcon>
            </InputAdornment>
          ),
        }}
      ></TextField>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chipData.map((data) => {
          let icon;

          //   if (data.label === "React") {
          //     icon = <TagFacesIcon />;
          //   }

          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                color="primary"
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
}
