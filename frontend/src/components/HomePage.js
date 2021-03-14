import React, { useState } from "react";
import "./HomePage.css";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { Spinner } from "reactstrap";
import Button from "@material-ui/core/Button";
import { useGradientBtnStyles } from "@mui-treasury/styles/button/gradient";
import background from "../assets/background.png";
require("dotenv").config();
const HomePage = ({ data }) => {
  const [onId, setOnId] = useState(`Quality`);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [extension, setExtension] = useState("");
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const setid = async (id, extension) => {
    setId(id);
    setExtension(extension);
    console.log(id);
  };
  const download = async () => {
    if (id) {
      setLoading(true);

      /*await axios.post("http://localhost:5000/test/download", data_one, {
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percentCompleted = Math.round((loaded * 100) / total);
          console.log(percentCompleted);
          //setDownloadProgress(percentCompleted);
        },
      });
      */
      //await axios.get(`http://localhost:5000/test/download?code=${id}`);
      const url =
        process.env.NODE_ENV === "development"
          ? `http://localhost:5000/get/download?code=${id}&extension=${extension}`
          : `/get/download?code=${id}&extension=${extension}`;
      window.location.href = url;
      setLoading(false);
    } else alert("Select a valid format");
  };

  const minimalSelectClasses = useMinimalSelectStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  return (
    <div>
      <FormControl>
        <Select
          value={onId}
          onChange={(e) => setOnId(e.target.value)}
          disableUnderline
          classes={{ root: minimalSelectClasses.select }}
          MenuProps={menuProps}
          IconComponent={iconComponent}
          className="menu"
        >
          <MenuItem value="Quality"> Quality </MenuItem>
          {data?.map((val) => (
            <MenuItem
              value={`${val.format ? val.format : `No video`} ${
                val.extension
              } ${val.audio ? val.audio : `No audio`}`}
              key={val.id}
              onClick={() => setid(val.code, val.extension)}
            >
              {`${val.format ? val.format : `No video`} ${val.extension} ${
                val.audio ? val.audio : `No audio`
              }`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading && <Spinner color="secondary" />}
      <Button classes={chubbyStyles} onClick={download}>
        Download
      </Button>
    </div>
  );
};

export default HomePage;
