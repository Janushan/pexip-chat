import React, { Component } from "react";

import { TextField, Grid, Button, IconButton, Modal } from "@material-ui/core";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import styles from "./chatInput.module.scss";

type InputProps = {
  onSubmitMessage: any;
};
type InputState = {
  message: string;
  showEmojis: boolean;
};

class ChatInput extends Component<InputProps, InputState> {
  state: InputState = {
    message: "",
    showEmojis: false,
  };

  // Adds emoji to the message with a space
  addEmoji = (event: any) => {
    let emoji = event.native;
    this.setState({
      message: `${this.state.message} ${emoji} `,
    });
  };

  // Adds the message
  addInputMessage = (event: any) => {
    this.setState({
      message: event.target.value,
    });
  };

  // Shows the emoji menu
  showEmojis = (event: any) => {
    this.setState(
      {
        showEmojis: true,
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  // Closes the emoji menu
  closeMenu = (event: any) => {
    //@ts-ignore
    if (this.emojiPicker !== null && !this.emojiPicker.contains(event.target)) {
      this.setState(
        {
          showEmojis: false,
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };

  // Renders the emoji selecter if the state is true
  emojiOption() {
    return (
      <Grid>
        {this.state.showEmojis ? (
          <Grid
            //@ts-ignore
            ref={(el) => (this.emojiPicker = el)}
          >
            <Modal open={this.state.showEmojis} onClose={this.closeMenu}>
              <Picker
                onSelect={(event) => this.addEmoji(event)}
                emojiTooltip={true}
                title="Pexip Chat"
              />
            </Modal>
          </Grid>
        ) : (
          <IconButton color="primary" onClick={this.showEmojis}>
            <EmojiEmotionsIcon />
          </IconButton>
        )}
      </Grid>
    );
  }

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
          {this.emojiOption()}
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
