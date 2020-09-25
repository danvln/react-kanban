import React from "react";
import { mount } from "enzyme";
import { DragDropContext } from "react-beautiful-dnd";
import CardList from "../../../components/Board/CardList";

const props = {
  listId: "listId",
  cards: [
    { id: "id", title: "title" },
    { id: "id2", title: "title2" }
  ],
  editing: false,
  cardsHeight: 50
};

describe("Card list", () => {
  it("should mount", () => {
    const wrapper = mount(
      <DragDropContext onDragEnd={() => null}>
        <CardList {...props} />
      </DragDropContext>
    );
    expect(wrapper.find(CardList)).toHaveLength(1);
  });
});
