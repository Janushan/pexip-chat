import React, { Component } from "react";

import { TextField, Grid, Button } from "@material-ui/core";

import styles from "./chatInput.module.scss";

type InputProps = {
  onSubmitMessage: any;
  inputMessage?: string;
};
type InputState = {
  message: string;
};

class ChatInput extends Component<InputProps, InputState> {
  state: InputState = {
    message: "",
  };

  addInputMessage = (event: any) => {
    this.setState({
      message: event.target.value,
    });
  };

  render() {
    const disabled = !this.state.message.length;

    return (
      <form
        action="."
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message);
          this.setState({ message: "" });
        }}
      >
        <Grid container direction="row" alignItems="center">
          <TextField
            label=""
            placeholder="Message"
            multiline
            value={this.state.message}
            onChange={(event) => this.addInputMessage(event)}
            variant="outlined"
            className={styles.input}
          />
          <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            disableElevation
            className={styles.button}
            type="submit"
          >
            Send
          </Button>
        </Grid>
      </form>
    );
  }
}

export default ChatInput;
