//@ts-nocheck
import React, { Component } from "react";

import { Grid, Tabs, Tab } from "@material-ui/core";

import TabPanel from "../../components/tabPanel";
import Header from "../../components/header";

import styles from "./home.module.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  // Used  https://material-ui.com/components/tabs/
  handleChange = (event: any, newValue: number) => {
    this.setState({
      value: newValue,
    });
  };
  a11yProps(index: number) {
    return {
      id: `tab-${index}`,
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <Header title="Status Meeting Standup" />
        <Grid>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
          >
            <Tab
              label={`Participants (1)`}
              {...this.a11yProps(0)}
              disableRipple={true}
            />
            <Tab label="Chat" {...this.a11yProps(1)} disableRipple={true} />
          </Tabs>
        </Grid>
        <TabPanel value={this.state.value} index={0}>
          tab 1{" "}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          tab 2
        </TabPanel>
      </div>
    );
  }
}

export default Home;
