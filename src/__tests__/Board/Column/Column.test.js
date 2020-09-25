import React from "react";
import { mount } from "enzyme";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../../../components/Board/Column";

const props = {
  index: 0,
  column: {
    id: "idCol",
    title: "col",
    cards: [
      { id: "id", title: "title" },
      { id: "id2", title: "title2" }
    ]
  },
  editing: true,
  actions: {
    onDeleteClick: Function,
    onCardMenuClick: Function,
    verifyTitle: Function,
    updateColumn: Function
  },
  deletable: true,
  columnsWidth: 150,
  cardsHeight: 50
};

const notEditableProps = {
  ...props,
  editing: false
};

describe("Column", () => {
  it("should mount - with delete button", () => {
    const wrapper = mount(
      <DragDropContext onDragEnd={() => null}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          isDropDisabled={false}
        >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="board">
              <Column {...props} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
    expect(wrapper.find(Column)).toHaveLength(1);
  });

  it("should mount - without delete button", () => {
    const wrapper = mount(
      <DragDropContext onDragEnd={() => null}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          isDropDisabled={false}
        >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="board">
              <Column {...notEditableProps} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
    expect(wrapper.find(Column)).toHaveLength(1);
    expect(wrapper.find(".delete")).toHaveLength(0);
  });
});
