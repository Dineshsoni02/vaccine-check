import React, { useState } from "react";
import { Grid, Button, Backdrop, Box, Paper } from "@material-ui/core";
import Centers from "./components/Centers";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
// import { flexbox } from "@material-ui/system";

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
      // alert("Invalid PIN");
      return;
    }
    setErrorMsg("");

    console.log(date);
    fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinValue}&date=${date}`
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        setCenters(data.centers);
      })

      .catch((err) => {
        setErrorMsg("Error Connecting Server. Please refresh");
      });
  };

  return (
    <div className="App" 
    >
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: "40%"}}
      >
        <Paper elevation={3} >
          <Grid item xs={12} 
          style={{ background: "blue" }}
          >
            <h1>VACCINATION APP</h1>
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              marginLeft="-2rem"
              // style={{ background: "aquamarine" }}
            >
              {/* Demo */}

              <h3>Select date : </h3>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleToggle}
                style={{ border: "none", marginLeft: "1rem" }}
              >
                {`${dateValue.getDate()}-${
                  dateValue.getMonth() + 1
                }-${dateValue.getFullYear()}`}
              </Button>
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

              {/* sasdasd */}
            </Box>
          </Grid>

          <Grid item xs={12} 
          // style={{ background: "grey" }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <h3>Enter Pin:</h3>
              
              <input
                style={{ border: "none", marginLeft: "1rem",outlineColor:"rgba(10,10,10,0.5)",lineHeight:"1.5rem"}}
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
              ></input>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
            <small className="field-error-msg">{errorMsg}</small>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" onClick={searchHandler}>
              Search
            </Button>
          </Grid>
        </Paper>
      </Grid>
      <Grid
            container
            // spacing={1}
            style={{
              // width: "100%",
              maxWidth: "700px",
              // margin: "auto",
              // padding: "5px",
            }}
            justify="center"
          >
            {centers ? (
              centers.length === 0 ? (
                <h2>No Centers found at this PIN code and Date.</h2>
              ) : (
                centers.map((item, i) => (
                  <Centers key={i} data={item} sessions={item.sessions} />
                ))
              )
            ) : (
              ""
            )}
          </Grid>
    </div>
  );
}

export default App;
