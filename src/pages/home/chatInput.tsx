import React, { Component } from "react";

import { TextField, Grid, Button, IconButton, Modal } from "@material-ui/core";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import styles from "./chatInput.module.scss";

type InputProps = {
  onSubmitMessage: any;
  inputMessage?: string;
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

  addEmoji = (event: any) => {
    let emoji = event.native;
    this.setState({
      message: `${this.state.message} ${emoji} `,
    });
  };

  addInputMessage = (event: any) => {
    this.setState({
      message: event.target.value,
      // message: `${event.target.value} ${this.props.inputMessage} `,
    });
  };

  showEmojis = (event: any) => {
    this.setState(
      {
        showEmojis: true,
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

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
