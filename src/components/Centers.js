import React from "react";
// import { Grid, Paper } from "@material-ui/core";
import "./Centers.css";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Centers(props) {
  const classes = useStyles();
  console.log(props.data.name);
  // const [sessionExpanded, setSessionExpanded] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            justifyContent: "spaceAround",
            alignItems: "center",
            alignContent: "spaceBetween"
          }}
        >
          <Typography className={classes.heading}>
            <p>{props.data.name || "_"}</p>
          </Typography>
          <Typography color="secondary" className={classes.heading}>
            <h5>Available:{props.sessions[0].available_capacity}</h5>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>{props.data.address}</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Centers;
