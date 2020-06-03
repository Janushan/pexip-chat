//@ts-nocheck
import React from "react";

import { Grid, Typography } from "@material-ui/core";
import cx from "classnames";
import moment from "moment/moment";
import Linkify from "react-linkify";
import EdiText from "react-editext";

import styles from "./message.module.scss";

type MessageProps = {
  id: string;
  name: string;
  timeStamp: string;
  content: string;
  onEditClick: void;
  onDeleteClick: void;
  status?: boolean;
  action?: string;
  showActions: boolean;
} & typeof defaultProps;
const defaultProps = {
  status: false,
};

function Message(props: MessageProps) {
  const { name, action, timeStamp, content, status } = props;

  return (
    <Grid container className={styles.message} alignItems="center">
      <Grid container alignItems="center">
        <Grid>
          <Grid container direction="row" alignItems="center">
            <Typography variant="h5" className={styles.name}>
              {name}
            </Typography>
            <Typography variant="body1" className={styles.timeStamp}>
              {moment(timeStamp).fromNow()}
            </Typography>
          </Grid>
          <Typography
            variant="body1"
            className={cx(
              { [styles.action]: action === "DELETED" },
              { [styles.status]: status },
              styles.content
            )}
          >
            {/* Display links as a hyperlink */}
            <Linkify>{content}</Linkify>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Message;
