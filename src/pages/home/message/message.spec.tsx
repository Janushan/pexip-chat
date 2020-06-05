import React from "react";
import { shallow } from "enzyme";
import { Button } from "@material-ui/core";

import Message from ".";

describe("<Message/>", () => {
  const Props = {
    id: "256b3a6b-4639-48ec-96b5-be1943be7617",
    name: "Janu Shan",
    timeStamp: "1591307010490",
    content: "Hi there",
    onEditClick: jest.fn(),
    onDeleteClick: jest.fn(),
    status: false,
    action: "",
    showActions: true,
  };

  it("renders message WITH action buttons - edit/delete", () => {
    const props = {
      ...Props,
      showActions: true,
    };
    const wrapper = shallow(<Message {...props} />).debug();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders message WITHOUT action buttons - edit/delete", () => {
    const props = {
      ...Props,
      showActions: false,
    };
    const wrapper = shallow(<Message {...props} />).debug();

    expect(wrapper).toMatchSnapshot();
  });

  it("it should call onEditClick when save button is pressed", () => {
    const props = {
      ...Props,
      showActions: true,
    };
    const wrapper = shallow(<Message {...props} />);
    wrapper.find(Button).at(0).simulate("click");
    wrapper.find(Button).at(0).simulate("click");
    expect(Props.onEditClick).toHaveBeenCalled();
  });

  it("it should call onDeleteClick when delete button is pressed", () => {
    const props = {
      ...Props,
      showActions: true,
    };
    const wrapper = shallow(<Message {...props} />);
    wrapper.find(Button).at(1).simulate("click");
    expect(Props.onDeleteClick).toHaveBeenCalled();
  });
});
