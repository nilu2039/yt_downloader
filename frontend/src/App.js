import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "./components/HomePage.css";
import background from "./assets/background.png";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";
import Button from "@material-ui/core/Button";
import { useGradientBtnStyles } from "@mui-treasury/styles/button/gradient";
import { Spinner } from "reactstrap";
require("dotenv").config();
const App = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const styles = useRoundInputBaseStyles();

  const chubbyStyles = useGradientBtnStyles({ chubby: true });

  const fetchData = async () => {
    if (url !== "") {
      setLoading(true);
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/api/get"
          : "/get";
      const { data } = await axios.post(baseUrl, {
        url: url,
      });
      setData(data);
      setLoading(false);
    } else alert("Enter a video URL");
  };

  return (
    <div>
      <div className="app">
        <div className="logo_text">
          <img src={background} alt="" className="logo" />
          <h3>Youtube NMD</h3>
        </div>
        <div className="app_url_input">
          <InputBase
            className="app_input"
            error
            classes={styles}
            placeholder={"Enter video URL"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Box pb={1} />
          <Button
            classes={chubbyStyles}
            onClick={fetchData}
            className="app_btn"
          >
            Get Details
          </Button>
          {loading && <Spinner style={{ width: "3rem", height: "3rem" }} />}
        </div>
        <HomePage data={data} />
        <img src={background} alt="" className="home_img" />
      </div>
    </div>
  );
};

export default App;
