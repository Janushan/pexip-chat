//@ts-nocheck
import React from "react";

import { Grid, Typography, Button } from "@material-ui/core";
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
  const {
    id,
    name,
    action,
    showActions,
    timeStamp,
    content,
    status,
    onEditClick,
    onDeleteClick,
  } = props;

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
            <Linkify>
              {/* Show the action buttons if showActions is true */}
              {!showActions ? (
                content
              ) : (
                <Grid container direction="row" alignItems="center">
                  {action === "EDITED" ? (
                    <EdiText
                      type="text"
                      value={`${content} (edited)`}
                      onSave={(value) => onEditClick(id, name, value)}
                      saveButtonContent="Save"
                      cancelButtonContent={<strong>Cancel</strong>}
                      editButtonContent="Edit"
                      hideIcons={true}
                      editButtonClassName={styles.editButton}
                    />
                  ) : (
                    <EdiText
                      type="text"
                      value={content}
                      onSave={(value) => onEditClick(id, name, value)}
                      saveButtonContent="Save"
                      cancelButtonContent={<strong>Cancel</strong>}
                      editButtonContent="Edit"
                      hideIcons={true}
                      editButtonClassName={styles.editButton}
                    />
                  )}

                  <Button
                    variant="outlined"
                    className={styles.deleteButton}
                    onClick={() => onDeleteClick(id, name)}
                  >
                    Delete
                  </Button>
                </Grid>
              )}
            </Linkify>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Message;
