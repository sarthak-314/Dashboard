import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import AccessTime from "@material-ui/icons/AccessTime";
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import CodeIcon from '@material-ui/icons/Code';
import Code from "@material-ui/icons/Code";
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import Cloud from "@material-ui/icons/Cloud";
import ListIcon from '@material-ui/icons/List';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios'

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  sleepChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { FLASK_SERVER } from '../../constants'

const useStyles = makeStyles(styles);
export default function Dashboard() {
  const classes = useStyles();

  const [todayCode, setTodayCode] = useState(3)
  const [percentCode, setPercentCode] = useState(34)
  const [lastWeekCode, setLastWeekCode] = useState([4, 5, 6, 4, 3, 5, 4])

  const [todaySleep, setTodaySleep] = useState(8)
  const [percentSleep, setPercentSleep] = useState(-10)
  const [lastWeekSleep, setLastWeekSleep] = useState([7.5, 8, 6, 5, 6.5, 7.6, 9])

  useEffect(() => {
    axios.get(FLASK_SERVER + 'code')
    .then(res => {
      const { percentage, today, week } = res.data
      setTodayCode(today)
      setPercentCode(percentage)
      setLastWeekCode(week)
    })
    .catch(err => console.log(err))

    axios.get(FLASK_SERVER + 'sleep')
    .then(res => {
      const {percentage, today, week } = res.data
      if(today) {
        setTodaySleep(today)
      } else {
        setTodaySleep(7.5)
      }
      setPercentSleep(percentage)
      var sleepWeek = []
      var i
      for(i=0; i < week.length; i++){
        console.log(i)
        var x = week[i]
        if(x){
          sleepWeek.push(x)
        } else {
          sleepWeek.push(8)
        }
      }
      setLastWeekSleep(sleepWeek)  
    }).catch(err => console.log(err))
  }, [])


  const codeData =  {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [lastWeekCode]
  }

  const sleepData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [lastWeekSleep]
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
              <DeveloperModeIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Time Spent Coding</p>
              <h3 className={classes.cardTitle}>{todayCode} / 7 hrs</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange/>
                Total time spent coding today
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AccessibilityNewIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Predicted Target for Today</p>
              <h3 className={classes.cardTitle}>7 hrs</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <CodeIcon/>
                As predicted by the ML model
              </div>
            </CardFooter>
          </Card>
        </GridItem>
  
        
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AirlineSeatIndividualSuiteIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Sleep Last Night</p>
  <h3 className={classes.cardTitle}>{todaySleep} hrs</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Smartwatch
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"

                data={codeData}
                
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Time Spent Programming</h4>
              <p className={classes.cardCategory}>
                {percentCode > 0 ?
                <div>
                <span className={classes.successText}>
                <ArrowUpward className={classes.upArrowCardCategory} /> 
                {percentCode}
                %
              
              </span>{" "}
              increase in time since last week.
              </div>
                
                :
                <div>
                <span className={classes.dangerText}>
                <ArrowDownward className={classes.upArrowCardCategory} /> 
                {percentCode}
                %
              
              </span>{" "}
              decrease in time since last week.

              </div>
                }
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated xx minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Time Spent on Projects</h4>
              <p className={classes.cardCategory}>Time Spent on my Top 3 Projects and Leetcode</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated xx days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                
                data={sleepData}

                type="Line"
                options={sleepChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Time Spent Sleeping</h4>
              <p className={classes.cardCategory}>
                <span className={classes.dangerText}>
                  <ArrowDownward className={classes.upArrowCardCategory} /> 10%
                </span>{" "}
                descrease in time since last week.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated xx minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
       
        
        </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="TODO:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Projects",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Interview Prep",
                tabIcon: ListIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[2]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
              </GridContainer>
    </div>
  );
}
