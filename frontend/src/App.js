import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "./components/HomePage.css";
import background from "./assets/background.png";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import { useRoundInputBaseStyles } from "@mui-treasury/styles/inputBase/round";
import { Button as ReactBtn } from "reactstrap";
import { useGradientBtnStyles } from "@mui-treasury/styles/button/gradient";
import { Spinner } from "reactstrap";
import { useStateValue } from "./contextApi/userContext";
import Login from "./components/Login";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import AudioOnly from "./components/AudioOnly";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require("dotenv").config();
const App = () => {
  const [{ user, signOut }, dispatch] = useStateValue();
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState();
  const [disabled, setDisabled] = useState(true);
  const styles = useRoundInputBaseStyles();

  const chubbyStyles = useGradientBtnStyles({ chubby: true });

  if (signOut) {
    console.log(signOut);
    localStorage.setItem("localuser", null);
  }

  if (user) {
    console.log(user);
    localStorage.setItem("localuser", user);
  }

  const fetchData = async () => {
    if (url !== "") {
      setLoading(true);
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/api/get"
          : "/api/get";
      const { data } = await axios.post(baseUrl, {
        url: url,
      });
      setData(data);
      setDisabled(false);
      setLoading(false);
    } else
      return toast("Enter a video URL", {
        type: "error",
        position: "bottom-right",
      });
  };

  useEffect(() => {
    let localUser = localStorage.getItem("localuser");
    setLocal(localUser);
  }, [user, signOut]);

  return (
    <Router>
      <div>
        <ToastContainer />
        <Switch>
          <Route path="/" exact>
            <div className="app">
              <div className="logo_text">
                <Link to="/" className="logo_text_h3">
                  <div className="logo_text_one">
                    <img src={background} alt="" className="logo" />
                    <h3 className="logo_text_h3">Youtube NLD</h3>
                  </div>
                </Link>
                <Link to="/audio">
                  <ReactBtn color="warning" type="button" className="reactBtn">
                    Download audio only
                  </ReactBtn>
                </Link>
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
                {loading && (
                  <Spinner style={{ width: "3rem", height: "3rem" }} />
                )}
              </div>
              <div className="download">
                <HomePage data={data} disabled={disabled} />
                {data[0]?.title && (
                  <p style={{ textAlign: "center" }}>{data[0]?.title}</p>
                )}
                {data[0]?.thumbnail && (
                  <img src={data[0]?.thumbnail} alt="" className="thumbnail" />
                )}
                <img src={background} alt="" className="home_img" />
              </div>
            </div>
          </Route>
        </Switch>
        <Switch>
          <Route path="/audio">
            <div className="app">
              <div className="logo_text">
                <Link to="/" className="logo_text_h3">
                  <div className="logo_text_one">
                    <img src={background} alt="" className="logo" />
                    <h3 className="logo_text_h3">Youtube NLD</h3>
                  </div>
                </Link>
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
                {loading && (
                  <Spinner style={{ width: "3rem", height: "3rem" }} />
                )}
              </div>
              <div className="download">
                <AudioOnly data={data} disabled={disabled} />
                {data[0]?.title && (
                  <p style={{ textAlign: "center" }}>{data[0]?.title}</p>
                )}
                {data[0]?.thumbnail && (
                  <img src={data[0]?.thumbnail} alt="" className="thumbnail" />
                )}
                <img src={background} alt="" className="home_img" />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
