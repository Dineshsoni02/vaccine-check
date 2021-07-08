import React, { useState } from "react";
import { Grid, Button, Backdrop, Container, Paper } from "@material-ui/core";
import Centers from "./components/Centers";
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
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // <div className="App">
    //   <Grid container
    //     // style={{
    //     //   height: "90vh",
    //     //   width: "90% ",
    //     //   padding: "0",
    //     //   boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 20%)",
    //     // }}
    //     // className="hero"
    //   >
    //     <div
    //       style={{
    //         width: "50%",
    //         height: "100%",
    //         bottom: "-3rem",
    //         position: "relative",
    //         boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 20%)",

    //       }}
    //       className="left_portion"
    //     >
    //       <div className="outer">
    //         <div
    //           display="flex"
    //           alignItems="center"
    //           justifyContent="center"
    //           style={{
    //             width: "100%",
    //             boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 20%)",
    //           }}
    //         >
    //           {/* Demo */}

    //           <h3
    //             style={{
    //               width: "100%",
    //               background: "#2f2061",
    //               textAlign: "center",
    //               fontWeight: "600",
    //               padding: "8px",
    //               color: "#f7f7f7",
    //               fontSize: "1.1rem",
    //             }}
    //           >
    //             Select date
    //           </h3>
    //           <p
    //             variant="outlined"
    //             color="primary"
    //             onClick={handleToggle}
    //             style={{
    //               width: "100%",
    //               cursor: "pointer",
    //               // border: "none",
    //               color: "#2f2061",
    //               padding: "10px",
    //               fontSize: "1.1rem",
    //               margin: "0",
    //               fontWeight: "700",
    //               marginTop: "2px",
    //               background: "#f7f7f7",
    //               boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 20%)",
    //               textAlign: "center",
    //             }}
    //           >
    //             {`${dateValue.getDate()}-${
    //               dateValue.getMonth() + 1
    //             }-${dateValue.getFullYear()}`}
    //           </p>
    //           <Backdrop
    //             className={classes.backdrop}
    //             open={open}
    //             onClick={handleClose}
    //           >
    //             <Calendar
    //               value={dateValue}
    //               defaultView="month"
    //               minDate={new Date()}
    //               onClickDay={(value) => {
    //                 setDateValue(value);
    //               }}
    //             />
    //           </Backdrop>
    //         </div>
    //         {/* ////////////////////////////////////////////////////////////// */}
    //         <div
    //           display="flex"
    //           flexDirection="row"
    //           alignItems="center"
    //           justifyContent="center"
    //           style={{ width: "100%", marginTop: "10px" }}
    //         >
    //           <h3
    //             style={{
    //               width: "100%",
    //               background: "#2f2061",
    //               textAlign: "center",
    //               fontWeight: "600",
    //               padding: "8px",
    //               color: "#f7f7f7",
    //               fontSize: "1.1rem",
    //             }}
    //           >
    //             Enter Pin
    //           </h3>

    //           <input
    //             style={{
    //               border: "none",
    //               outlineColor: "#318AF4",
    //               fontSize: "1.08rem",
    //               width: "100%",
    //               padding: "10px",
    //               color: "#2f2061",
    //               textAlign: "center",
    //               fontWeight: "700",
    //               boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 20%) ",
    //               outline: "none",
    //             }}
    //             type="tel"
    //             placeholder="Enter PIN"
    //             value={pinValue}
    //             maxLength="6"
    //             onChange={(e) => {
    //               const value = e.target.value;
    //               const char = value.slice(-1);
    //               if ((char >= "0" && char <= "9") || value === "") {
    //                 setPinValue(value);
    //               }
    //             }}
    //             onKeyUp={(e) => (e.keyCode === 13 ? searchHandler() : "")}
    //           ></input>
    //         </div>
    //         {/* ////////////////////////////////////////////////////////////////////////// */}
    //         <div style={{ textAlign: "center", marginTop: "5px" }}>
    //           <h4 className="field-error-msg">{errorMsg}</h4>
    //         </div>
    //         <div>
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             onClick={searchHandler}
    //             style={{
    //               // borderRadius: "25px",
    //               // lineHeight: "20px",
    //               // marginBottom: "12px",
    //               // borderColor: "#318AF4",
    //               boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 50%) ",

    //               color: "white",
    //             }}
    //           >
    //             Search
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </Grid>
    //   <Grid
    //     container
    //     style={{
    //       width: "50%",
    //     }}
    //   >
    //     {centers ? (
    //       centers.length === 0 ? (
    //         <h2>No Centers found at this PIN code and Date.</h2>
    //       ) : (
    //         centers.map((item, i) => (
    //           <Centers key={i} data={item} sessions={item.sessions} />
    //         ))
    //       )
    //     ) : (
    //       ""
    //     )}
    //   </Grid>
    // </div>
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
          // background:"cyan",
          flexWrap: "nowrap",
        }}
        className="hero"
      >
        <Grid
          container
          item
          xs={12}
          lg={6}
          sm={6}
          spacing={2}
          direction="column"
          // justify="space-evenly"
          // alignItems="stretch"
          style={{
            flexWrap: "nowrap",
            // background: "pink",
          }}
        >
          <Grid
            item
            xs={12}
            lg={12}
            sm={12}
            style={{
              // background: "purple",
            }}
          >
            <h3
              style={{
                width: "100%",
                background: "#2f2061",
                textAlign: "center",
                fontWeight: "600",
                padding: "8px",
                color: "#f7f7f7",
                fontSize: "1.1rem",
              }}
            >
              Select date
            </h3>
            <p
              variant="outlined"
              color="primary"
              onClick={handleToggle}
              style={{
                width: "100%",
                cursor: "pointer",
                // border: "none",
                color: "#2f2061",
                padding: "10px",
                fontSize: "1.1rem",
                margin: "0",
                fontWeight: "700",
                marginTop: "2px",
                background: "#f7f7f7",
                boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 20%)",
                textAlign: "center",
              }}
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
          <Grid
            item
            xs={12}
            lg={12}
            sm={12}
            style={{
              // background: "white",
            }}
          >
            <h3
              style={{
                width: "100%",
                background: "#2f2061",
                textAlign: "center",
                fontWeight: "600",
                padding: "8px",
                color: "#f7f7f7",
                fontSize: "1.1rem",
              }}
            >
              Enter Pin
            </h3>

            <input
              style={{
                border: "none",
                outlineColor: "#318AF4",
                fontSize: "1.08rem",
                width: "100%",
                padding: "10px",
                color: "#2f2061",
                textAlign: "center",
                fontWeight: "700",
                boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 20%) ",
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
              // background: "blue",
              textAlign:"center"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={searchHandler}
              style={{
                boxShadow: "11px 11px 11px 1px rgb(45 27 90 / 50%) ",
                color: "white",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        lg={12}
        sm={12}
        style={{
          width: "100%",
        }}
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

// App
// Grid container w-100%
// grid w-50%
// center
