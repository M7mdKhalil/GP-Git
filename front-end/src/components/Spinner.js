import React from "react";
import "../stylesheets/Spinner.css";

const Spinner = (props) => {
  return (
    <div class="lds-ellipsis">
    Loading .
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
