import React, { ReactNode } from "react";

import { Typography, Box } from "@material-ui/core";

import styles from "./tabPanel.module.scss";

type TabPanelProps = {
  value: any;
  index: any;
  children?: ReactNode;
  padding?: number;
} & typeof defaultProps;
const defaultProps = {
  padding: 3,
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, padding, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={styles.container}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.defaultProps = defaultProps;
export default TabPanel;
