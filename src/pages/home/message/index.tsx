//@ts-nocheck
import React, { useState } from "react";

import { Grid, Typography, Button, TextField } from "@material-ui/core";
import cx from "classnames";
import moment from "moment/moment";
import Linkify from "react-linkify";

import { MESSAGE_DELETED } from "../../../constants";

import styles from "./message.module.scss";

export type MessageProps = {
  id: string;
  name: string;
  timeStamp: string;
  content: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
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

  const [isEditing, setEditing] = useState(false);
  const [isEdited, setEdited] = useState(false);
  const [editedMessage, setMessage] = useState(content);

  // Renders edit/delete buttons if the user is not editing OR message has been deleted
  const renderEditDeleteButtons = () => {
    if (isEditing || editedMessage === "This message was deleted") {
      return null;
    } else {
      return (
        <>
          <Button
            variant="outlined"
            className={styles.button}
            onClick={() => setEditing(!isEditing)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            className={styles.deleteButton}
            onClick={() => {
              onDeleteClick(id, name);
              setMessage("This message was deleted");
            }}
          >
            Delete
          </Button>
        </>
      );
    }
  };

  // Renders the message in edit mode (showing a text field)
  const renderEditMode = () => {
    return (
      <>
        <TextField
          label=""
          placeholder=""
          multiline
          value={editedMessage}
          onChange={(event) => setMessage(event.target.value)}
          variant="outlined"
        />
        <Grid container>
          <Button
            variant="outlined"
            className={styles.saveButton}
            onClick={() => {
              setMessage(`${editedMessage} (edited)`);
              setEditing(false);
              setEdited(true);
              onEditClick(id, name, editedMessage);
            }}
          >
            Save
          </Button>
          {/* Display whether edited or not depending on whether the message has been edited */}
          {isEdited ? (
            <Button
              variant="outlined"
              className={styles.cancelButton}
              onClick={() => {
                setMessage(content);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outlined"
              className={styles.cancelButton}
              onClick={() => {
                setMessage(content);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          )}
        </Grid>
      </>
    );
  };

  // Renders the body of the message with appropriate styling
  const renderMessageBody = (body) => {
    return (
      <Typography
        variant="body1"
        className={cx(
          { [styles.action]: action === MESSAGE_DELETED },
          { [styles.status]: status },
          styles.content
        )}
      >
        {body}
      </Typography>
    );
  };

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

          {/* Display links as a hyperlink */}
          <Linkify>
            {/* Show the action buttons if showActions is true */}
            {!showActions ? (
              renderMessageBody(content)
            ) : (
              <Grid container direction="row" alignItems="center">
                <Grid container>
                  {isEditing
                    ? renderEditMode()
                    : renderMessageBody(editedMessage)}
                </Grid>
                {renderEditDeleteButtons()}
              </Grid>
            )}
          </Linkify>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Message;
