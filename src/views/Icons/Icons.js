/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProjectCard from './Card'

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  return (<>
    <h3> <b>My Top 3 Projects :</b>  </h3>
  <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
    </GridContainer>
    <br/>
    <br/>
    <h3> <b>My Top 3 Articles :</b>  </h3>
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
    </GridContainer>
    <br/>
    <br/>
    <h3> <b>My Top 3 Machine Learning Mini-Projects :</b>  </h3>
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
      <ProjectCard/>
      </GridItem>
    </GridContainer>
  
    </>
  );
}
