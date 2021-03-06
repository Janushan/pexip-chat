//@ts-nocheck
import React, { Component } from "react";

import { Grid, Tabs, Tab } from "@material-ui/core";

import TabPanel from "../../components/tabPanel";
import Header from "../../components/header";
import Participant from "./participant";
import Message from "./message";
import ChatInput from "./chatInput";

import { uuid } from "uuidv4";

import { nameList } from "../../helpers/nameList";
import {
  URL,
  MEETING_BOT,
  MESSAGE_EDITED,
  MESSAGE_DELETED,
} from "../../constants";

import styles from "./home.module.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: nameList[Math.floor(Math.random() * nameList.length)],
      messages: [],
      participants: [],
      value: 0,
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log(`${this.state.name} CONNECTED`);
      this.submitMessage(
        this.onSubmitClick(`${this.state.name} joined.`, MEETING_BOT, true)
      );
    };

    this.ws.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      this.addMessage(message);
      this.checkNewParticipant(message);
    };

    this.ws.onclose = () => {
      this.submitMessage(
        this.onSubmitClick(`${this.state.name} left.`, MEETING_BOT, true)
      );
      console.log(`${this.state.name} DISCONNECTED`);
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      });
    };
  }

  // add message to the list of messages
  addMessage = (message) => {
    message.showActions = message.name === this.state.name;

    // update message if edited/deleted
    if (
      message.action === MESSAGE_DELETED ||
      message.action === MESSAGE_EDITED
    ) {
      const messages = this.state.messages.map((msg) => {
        if (msg.id === message.id) {
          msg = message;
        }
        return msg;
      });

      this.setState({
        messages: messages,
      });
    } else {
      this.setState((state) => ({ messages: [...state.messages, message] }));
    }
  };

  // on submitting the ChatInput form, send the message, add it to the list and reset the input
  submitMessage = (message) => {
    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
    this.checkNewParticipant(message);
  };

  // checks if the participant is new and then decides whether they should be added/removed
  checkNewParticipant(message) {
    let person = message.content;
    const lastIndex = person.lastIndexOf(" ");

    person = person.substring(0, lastIndex);

    if (message.name === MEETING_BOT && message.content.includes("joined.")) {
      this.addParticipant(person);
    } else if (
      message.name === MEETING_BOT &&
      message.content.includes("left.")
    ) {
      this.removeParticipant(person);
    }
  }

  // creates and adds participant to the participant list
  addParticipant = (name) => {
    const person = { id: uuid(), name: name };
    this.setState((state) => ({
      participants: [person, ...state.participants],
    }));
  };

  // removes participant from participant list
  removeParticipant = (name) => {
    const targetParticipant = this.state.participants.map((person, index) => {
      if (person.name === name) {
        return index;
      }
      return index;
    });

    const participants = this.state.participants.splice(targetParticipant, 1);
    this.setState({
      participants: participants,
    });
  };

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

  // when message delete button is clicked then change the message and update the state
  onDeleteClick(id, name) {
    const messages = this.state.messages.map((message) => {
      if (message.id === id && message.name === name) {
        message.action = MESSAGE_DELETED;
        message.showActions = false;
        message.content = "This message was deleted";
        this.submitMessage(message);
      }
      return message;
    });

    this.setState({
      messages: messages,
    });
  }

  // when message edit button is clicked then display the message differently
  onEditClick(id, name, content) {
    const messages = this.state.messages.map((message) => {
      if (message.id === id && message.name === name) {
        message.action = MESSAGE_EDITED;
        message.content = `${content} (edited)`;
        this.submitMessage(message);
      }
      return message;
    });

    this.setState({
      messages: messages,
    });
  }

  // construct new message
  onSubmitClick = (messageString, name, status) => {
    const message = {
      id: uuid(),
      name: name ?? this.state.name,
      content: messageString,
      timeStamp: Date.now(),
      status: status ?? false,
      action: null,
      showActions: name === this.state.name,
    };

    return message;
  };

  // renders chat and chat input
  renderChat = () => {
    return (
      <>
        {" "}
        {this.state.messages.map((message, index) => (
          <Message
            key={index}
            id={message.id}
            action={message.action}
            showActions={message.showActions}
            content={message.content}
            name={message.name}
            timeStamp={message.timeStamp}
            status={message.status}
            onDeleteClick={this.onDeleteClick}
            onEditClick={this.onEditClick}
          />
        ))}{" "}
        <ChatInput
          ws={this.ws}
          onSubmitMessage={(messageString) =>
            this.submitMessage(
              this.onSubmitClick(messageString, this.state.name)
            )
          }
        />
      </>
    );
  };

  // render list of participants
  renderParticipants = () => {
    return (
      <>
        {this.state.participants.map((person, index) => (
          <Participant key={index} name={person.name} />
        ))}
      </>
    );
  };

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
              label={`Participants (${this.state.participants.length})`}
              {...this.a11yProps(0)}
              disableRipple={true}
            />
            <Tab label="Chat" {...this.a11yProps(1)} disableRipple={true} />
          </Tabs>
        </Grid>
        <TabPanel value={this.state.value} index={0}>
          {this.renderParticipants}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {this.renderChat()}
        </TabPanel>
      </div>
    );
  }
}

export default Home;
