import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { useFetch } from "use-http";
import { useState } from "react";
import { useEffect } from "react";
import { InputAdornment } from "@mui/material";

const SearchCompany = () => {
  const { get, post } = useFetch("http://localhost:5000");
  const [state, setState] = useState("");
  const [value, setValue] = useState("");
  const [companies, setcompanies] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const comp = await get(`/user/allcompanies`);
      console.log(comp);
      setcompanies(comp);
    };
    fetchData();
  }, [get, state]);

  const show = async (state) => {
    const comp = await post("/user/getcompanyid", { state });
    if (comp.id) {
      window.location = `/intro/${comp.id}`;
    }
  };

  let comps = [];

  companies?.map((comp) => {
    comps.push({ title: comp.username });
  });
  return (
    <Stack spacing={2}>
      <Autocomplete
        autoHighlight
        onInputChange={(e, v) => {
          setState(v);
          show(v);
        }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={comps.map((option) => option.title)}
        renderInput={(params) => (
          <div>
            <TextField
              {...params}
              label="Search Company"
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon></SearchIcon>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
      />
    </Stack>
  );
};

export default SearchCompany;
