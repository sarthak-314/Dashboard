import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import GitHubIcon from '@material-ui/icons/GitHub';
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DescriptionIcon from '@material-ui/icons/Description';
import WebIcon from '@material-ui/icons/Web';

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function TypographyPage() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h2 className={classes.cardTitleWhite}>100 Days in Days
        </h2>
        <h4 className={classes.cardCategoryWhite}>
          Link to the Colab Notebooks
        </h4>
        <br/>
        <svg width="24" style={{marginRight: '50px', color: 'white'}} height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm6.974 17.557v-.235l-1.092-1.072c-.096-.073-.144-.194-.124-.313v-7.874c-.02-.119.028-.24.124-.313l1.118-1.072v-.235h-3.869l-2.758 6.88-3.138-6.88h-4.059v.235l1.308 1.575c.128.115.194.285.176.457v6.188c.038.223-.032.451-.189.614l-1.471 1.784v.235h4.17v-.235l-1.471-1.784c-.158-.163-.233-.389-.202-.614v-5.352l3.66 7.985h.425l3.143-7.985v6.365c0 .17 0 .202-.111.313l-1.13 1.098v.235h5.49z"/></svg>
        <GitHubIcon style={{marginRight: '50px'}}/>
        <WebIcon/>

      </CardHeader>
      <CardBody>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #1</div>
          <h4>Data Collection</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #2</div>
          <h4>Data Cleaning</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #3</div>
          <h4>Feature Engineering</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #4.1</div>
          <h4>Data Exploration(Code)</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #4.2</div>
          <h4>Data Exploration</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #5</div>
          <h4>Data Preprocessing</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #6</div>
          <h4>Model Selection</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Notebook #7</div>
          <h4>Model Building</h4>
        </div>
        </CardBody>
    </Card>
  );
}
