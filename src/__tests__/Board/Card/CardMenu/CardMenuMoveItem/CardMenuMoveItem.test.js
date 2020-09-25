import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import AutoComplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CardMenuMoveItem from "../../../../../components/Board/Card/CardMenu/CardMenuMoveItem";

const props = {
  groups: [
    {
      id: "group1",
      title: "group1",
      cards: [
        {
          id: "card1",
          title: "card1"
        }
      ]
    },
    {
      id: "group2",
      title: "group2",
      cards: []
    }
  ],
  selectedCard: {
    card: {
      id: "card1",
      title: "card1"
    },
    groupId: "group1"
  },
  handleMoveToClick: () => null,
  setInputText: () => null
};

describe("Card Menu Move Item", () => {
  it("should mount", () => {
    const wrapper = mount(<CardMenuMoveItem {...props} />);
    expect(wrapper.find(CardMenuMoveItem)).toHaveLength(1);
  });

  it("should handle error", () => {
    const wrapper = mount(<CardMenuMoveItem {...props} />);

    act(() => {
      wrapper
        .find(AutoComplete)
        .props()
        .onChange({}, {});
    });
    wrapper.update();

    const moveButton = wrapper.find(".move-to-button").first();
    moveButton.simulate("click");

    // No group selected --> display error
    expect(wrapper.find(TextField).props().error).toBeTruthy();

    act(() => {
      wrapper
        .find(AutoComplete)
        .props()
        .onChange({}, { id: "group2", title: "group2", cards: [] });
    });
    wrapper.update();
    moveButton.simulate("click");

    // Group selected --> no error
    expect(wrapper.find(TextField).props().error).toBeFalsy();
  });
});
