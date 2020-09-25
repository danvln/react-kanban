// @flow
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import type { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import CardList from "../CardList";
import Title from "../CardHeader";
import type { GroupType } from "../../../types";

type Props = {
  groups: GroupType[],
  column: GroupType,
  index: number,
  locked: boolean,
  actions: any,
  cardsHeight: number,
  columnsWidth: number,
  columnsAction: GroupType => void
};

const getStyle = ({ isDragging }: { isDragging: boolean }) => {
  if (isDragging) {
    return {
      borderStyle: "dashed",
      borderColor: "#000099",
      borderWidth: "2px",
      backgroundColor: "rgb(227, 227, 227)"
    };
  }
  return {
    backgroundColor: "rgb(227, 227, 227)"
  };
};

const Column = ({
  index,
  groups,
  column,
  locked,
  actions,
  cardsHeight,
  columnsAction,
  columnsWidth
}: Props) => {
  const { title, cards, id } = column;
  const { onCardMenuClick } = actions;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          id={id}
          className="column"
        >
          <div
            style={{
              ...getStyle(snapshot)
            }}
            className="header"
          >
            <Title
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              title={title}
              editable={!locked}
              groups={groups}
            />
            {columnsAction && columnsAction(column)}
          </div>
          <CardList
            listId={id}
            cards={cards}
            locked={locked}
            onCardMenuClick={onCardMenuClick}
            cardsHeight={cardsHeight}
            columnsWidth={columnsWidth}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Column;
