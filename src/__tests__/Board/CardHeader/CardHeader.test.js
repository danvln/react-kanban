import React from "react";
import { mount } from "enzyme";
import TextField from "@material-ui/core/TextField";
import CardHeader from "../../../components/Board/CardHeader";

const props = {
  title: "col1",
  "aria-labelledby": "ariaLabelledBy",
  "data-rbd-drag-handle-context-id": "dataRbdDragHandleContextId",
  "data-rbd-drag-handle-draggable-id": "dataRbdDragHandleDraggableId",
  draggable: true,
  onDragStart: () => null,
  tabIndex: 0,
  groups: [],
  updateColumn: () => null
};

describe("Card Header", () => {
  let wrapper;

  it("should mount", () => {
    wrapper = mount(<CardHeader {...props} />);
    expect(wrapper.find(CardHeader)).toHaveLength(1);
    expect(wrapper.find(TextField).first()).toHaveLength(0);
  });
});
