import React, { useState } from "react";
import "./HomePage.css";
import { Spinner } from "reactstrap";
import Button from "@material-ui/core/Button";
import { useGradientBtnStyles } from "@mui-treasury/styles/button/gradient";
import { auth, provider } from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../contextApi/userContext";
import { actionTypes } from "../contextApi/reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
require("dotenv").config();
const HomePage = ({ data, disabled }) => {
  const [{}, dispatch] = useStateValue();
  const [selectedOption, setSelectedOption] = useState(`Select quality`);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [extension, setExtension] = useState("");
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const setid = async (id, extension, quality) => {
    setId(id);
    setExtension(extension);
    setSelectedOption(quality);
    console.log(id);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(
          {
            type: actionTypes.SIGN_OUT,
            signOut: true,
          },
          {
            type: actionTypes.SET_USER,
            user: null,
          }
        );
      });
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
          ? `http://localhost:5000/api/get/download?code=${id}&extension=${extension}`
          : `/api/get/download?code=${id}&extension=${extension}`;
      window.location.href = url;
      setLoading(false);
    } else
      return toast("Select a valid format", {
        type: "error",
        position: "bottom-right",
      });
  };

  return (
    <div>
      <div className="menu_quality">
        <UncontrolledDropdown className="menu">
          {disabled ? (
            <DropdownToggle
              className="dropdownToggle"
              caret
              color="warning"
              id="navbarDropdownMenuLink2"
              type="button"
              disabled
            >
              Select video quality
            </DropdownToggle>
          ) : (
            <div>
              <DropdownToggle
                className="dropdownToggle"
                caret
                color="warning"
                id="navbarDropdownMenuLink2"
                type="button"
              >
                {selectedOption}
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbarDropdownMenuLink2"
                className="dropdown_scroll"
              >
                {data?.map((val) => (
                  <li key={val.id} className="dropdown">
                    <DropdownItem
                      onClick={() =>
                        setid(
                          val.code,
                          val.extension,
                          `${val.format ? val.format : `No video`} ${
                            val.extension
                          } ${val.audio ? val.audio : `No audio`} `
                        )
                      }
                    >
                      {`${val.format ? val.format : `No video`} ${
                        val.extension
                      } ${val.audio ? val.audio : `No audio`} `}
                    </DropdownItem>
                  </li>
                ))}
              </DropdownMenu>
            </div>
          )}
        </UncontrolledDropdown>
        {loading && <Spinner color="secondary" />}
        <Button classes={chubbyStyles} onClick={download}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
