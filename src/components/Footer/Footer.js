/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://sarthak-bhatt-portfolio.s3.amazonaws.com/index.html" className={classes.block} target="_blank">
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://sarthak-bhatt314.medium.com/100-days-in-data-d5a6813213a2" className={classes.block} target="_blank">
                Medium Article
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://github.com/sarthak-314" className={classes.block} target="_blank">
                Github
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            Made with {" "}
            <a
              href="https://www.creative-tim.com?ref=mdr-footer"
              target="_blank"
              className={classes.a}
            >
              Creative Tim
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
