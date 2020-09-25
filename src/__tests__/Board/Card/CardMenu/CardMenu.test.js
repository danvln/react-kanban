import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import CardMenu from "../../../../components/Board/Card/CardMenu";

const props = {
  open: false,
  groups: [
    {
      id: "group1",
      title: "group1"
    }
  ],
  selectedCard: {
    card: {
      id: "card1",
      title: "card1"
    },
    groupId: "group1"
  }
};

const openProps = {
  ...props,
  open: true
};

describe("Card Menu", () => {
  it("should mount - close", () => {
    const wrapper = mount(<CardMenu {...props} />);
    expect(wrapper.find(CardMenu)).toHaveLength(1);
    // should be closed
    expect(wrapper.find(Dialog).props().open).toBeFalsy();
  });

  it("should mount - open", () => {
    const wrapper = mount(<CardMenu {...openProps} />);
    // should be opened
    expect(wrapper.find(Menu).props().open).toBeTruthy();
  });

  it("should handle onClose", () => {
    const setOpen = jest.fn();
    const wrapper = mount(<CardMenu {...openProps} setOpen={setOpen} />);
    act(() => {
      wrapper
        .find(Menu)
        .props()
        .onClose();
    });
    wrapper.update();
    expect(setOpen).toHaveBeenCalled();
  });
});
