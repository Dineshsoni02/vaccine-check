import React, { useState } from "react";
import { Grid, Button, Backdrop } from "@material-ui/core";
import Center from "./components/Center";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000",
  },
}));
function App() {
  const [dateValue, setDateValue] = useState(new Date());
  const [pinValue, setPinValue] = useState("");
  const [centers, setCenters] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const searchHandler = () => {
    const date = `${dateValue.getDate()}-${
      dateValue.getMonth() + 1
    }-${dateValue.getFullYear()}`;

    if (pinValue.length < 6) {
      setErrorMsg("Invalid PIN");
      return;
    }
    setErrorMsg("");

    fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinValue}&date=${date}`
    )
      .then(async (res) => {
        const data = await res.json();
        setCenters(data.centers);
      })

      .catch((err) => {
        setErrorMsg("Error Connecting Server. Please refresh");
      });
  };

  return (
    <div className="App">
      <Grid
        container
        item
        direction="column"
        justify="space-evenly"
        alignItems="center"
        xs={12}
        sm={6}
        lg={6}
        style={{
          flexWrap: "nowrap",
        }}
        className="hero"
      >
        <Grid
          container
          item
          xs={7}
          lg={6}
          sm={6}
          spacing={2}
          direction="column"
          justify="space-evenly"
          style={{
            flexWrap: "nowrap",
          }}
        >
          <Grid
            item
            xs={12}
            lg={12}
            sm={12}
          >
            <h3 className="date_info">Select date</h3>
            <p
              variant="outlined"
              color="primary"
              onClick={handleToggle}
              style={{
                width: "100%",
                cursor: "pointer",
                color: "#2f2061",
                padding: "10px",
                fontSize: "1.1rem",
                margin: "0",
                fontWeight: "500",
                textAlign: "center",
              }}
              className="calender_style"
            >
              {`${dateValue.getDate()}-${
                dateValue.getMonth() + 1
              }-${dateValue.getFullYear()}`}
            </p>
            <Backdrop
              className={classes.backdrop}
              open={open}
              onClick={handleClose}
            >
              <Calendar
                value={dateValue}
                defaultView="month"
                minDate={new Date()}
                onClickDay={(value) => {
                  setDateValue(value);
                }}
              />
            </Backdrop>
          </Grid>
          <Grid item xs={12} lg={12} sm={12}>
            <h3 className="pin_info">Enter Pin</h3>

            <input
              className="input_style"
              style={{
                border: "none",
                color: "#2f2061",
                padding: "10px",
                fontSize: "1.1rem",
                margin: "0",
                fontWeight: "500",
                width: "100%",
                textAlign: "center",
                outline: "none",
              }}
              type="tel"
              placeholder="Enter PIN"
              value={pinValue}
              maxLength="6"
              onChange={(e) => {
                const value = e.target.value;
                const char = value.slice(-1);
                if ((char >= "0" && char <= "9") || value === "") {
                  setPinValue(value);
                }
              }}
              onKeyUp={(e) => (e.keyCode === 13 ? searchHandler() : "")}
            ></input>
            <div style={{ textAlign: "center", marginTop: "5px" }}>
              <h4 className="field-error-msg">{errorMsg}</h4>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            lg={12}
            sm={12}
            style={{
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className="pin_info"
              onClick={searchHandler}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <div className="centers">
        <Grid container item xs={12} lg={12} sm={12} className="center_box">
          {centers ? (
            centers.length === 0 ? (
              <h2>No Centers found at this PIN code and Date.</h2>
            ) : (
              centers.map((item, i) => (
                <Center key={i} data={item} sessions={item.sessions} />
              ))
            )
          ) : (
            ""
          )}
        </Grid>
      </div>
    </div>
  );
}

export default App;

