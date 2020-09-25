import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Board from "../../components/Board";
import Column from "../../components/Board/Column";
import CardMenu from "../../components/Board/Card/CardMenu";

const updateData = jest.fn();

const props = {
  groups: [
    {
      id: "noGroupAssigned",
      title: "Unassigned",
      cards: []
    },
    {
      id: "1",
      title: "Group1",
      cards: [
        {
          id: "EUR",
          title: "EUR"
        },
        {
          id: "USD",
          title: "USD"
        }
      ]
    },
    {
      id: "2",
      title: "Group2",
      cards: [
        {
          id: "tst",
          title: "TST"
        }
      ]
    },
    {
      id: "3",
      title: "Group3",
      cards: []
    }
  ],
  editing: false,
  updatedDatas: updateData
};
const editableProps = {
  ...props,
  editing: true
};

describe("Board", () => {
  it("should handle card menu click", () => {
    const wrapper = mount(<Board {...editableProps} />);

    const menuButton = wrapper
      .find(Column)
      .at(1)
      .find(".card-menu-button")
      .first();

    // First render --> closed by default
    expect(wrapper.find(CardMenu).props().open).toBeFalsy();
    // Should open on click
    menuButton.simulate("click");
    expect(wrapper.find(CardMenu).props().open).toBeTruthy();
  });

  it("should handle card movement", () => {
    const wrapper = mount(<Board {...editableProps} />);

    const nbCardsColumn1 = wrapper
      .find(Column)
      .at(1)
      .props().column.cards.length;

    const menuButton = wrapper
      .find(Column)
      .at(1)
      .find(".card-menu-button")
      .first();

    menuButton.simulate("click");
    // Select a new gorup for the selected card
    act(() => {
      wrapper
        .find("#groups-auto-complete")
        .first()
        .props()
        .onChange({}, { id: "3", title: "Group3", cards: [] });
    });
    const moveButton = wrapper.find(".move-to-button").first();
    moveButton.simulate("click");

    // - 1 card in column 1
    expect(
      wrapper
        .find(Column)
        .at(1)
        .props().column.cards.length
    ).toEqual(nbCardsColumn1 - 1);
    // CardMenu shoud have been closed
    expect(wrapper.find(CardMenu).props().open).toBeFalsy();
  });
});
