import React from "react";

import { Grid, Typography } from "@material-ui/core";

import styles from "./header.module.scss";

type HeaderProps = {
  title: string;
};

function Message(props: HeaderProps) {
  const { title } = props;

  return (
    <Grid container className={styles.container} justify="center">
      <header>
        <Typography variant="h4">{title}</Typography>
      </header>{" "}
    </Grid>
  );
}

export default Message;
