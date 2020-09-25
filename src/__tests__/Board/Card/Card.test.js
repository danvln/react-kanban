import React from "react";
import { mount } from "enzyme";
import Card from "../../../components/Board/Card";

const props = {
  card: { id: "id", title: "title" },
  editing: true,
  isDragging: false,
  provided: { draggableProps: { style: {} } },
  style: {},
  onCardMenuClick: jest.fn()
};

const draggingProps = {
  ...props,
  isDragging: true,
  style: {
    backgroundColor: "#d1d8ff",
    borderStyle: "solid",
    borderColor: "#000099"
  }
};

describe("Card", () => {
  it("should mount with style", () => {
    const wrapper = mount(<Card {...props} />);
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it("should mount without style", () => {
    const wrapper = mount(<Card {...props} style={null} />);
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it("should mount with dragging props", () => {
    const wrapper = mount(<Card {...draggingProps} />);
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it("should handle click on menu", () => {
    const wrapper = mount(<Card {...props} />);
    const menuButton = wrapper.find(".card-menu-button").first();
    menuButton.simulate("click");
    expect(props.onCardMenuClick).toHaveBeenCalled();
  });
});
