import React from "react";

import { Grid, Typography } from "@material-ui/core";

import styles from "./participant.module.scss";

type ParticipantProps = {
  name: string;
};

function Participant(props: ParticipantProps) {
  const { name } = props;
  return (
    <Grid container className={styles.participant} alignItems="center">
      <Typography variant="body1" className={styles.name}>
        {name}
      </Typography>
    </Grid>
  );
}

export default Participant;
