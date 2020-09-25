// @flow
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";
import type { DropResult, DroppableProvided } from "react-beautiful-dnd";
import type { GroupType, CardType, CardLocationType } from "../../types";
import Column from "./Column/Column";
import CardMenu from "./Card/CardMenu";
import reorder, { reorderCard } from "./reorder";

type Props = {|
  groups: GroupType[],
  locked: boolean,
  updatedDatas: any,
  columnsWidth?: number,
  cardsHeight?: number,
  columnsAction?: any => void
|};

const Board = ({
  groups,
  locked,
  updatedDatas,
  columnsWidth = 150,
  cardsHeight = 60,
  columnsAction = null
}: Props) => {
  const [columns, setColumns] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const [cardMenuStyle, setCardMenuStyle] = useState();
  const [cardMenuOpen, setCardMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    setColumns(cloneDeep(groups));
    setOrdered(groups.map(group => group.id));
  }, [groups]);

  useEffect(() => {
    updatedDatas(cloneDeep(columns));
  }, [columns]);

  // Open card menu at the correct position
  const setMenuAnchor = anchorEl => {
    const rect = anchorEl.getBoundingClientRect();
    const style = {
      transform: `translate(${rect.left}px, ${rect.top + rect.height - 25}px)`
    };
    setCardMenuStyle(style);
    setCardMenuOpen(true);
  };

  // Set anchor of card menu && retrieve informations of selected card
  const onCardMenuClick = ({
    e,
    card,
    groupId,
    location
  }: {
    e: any,
    card: CardType,
    groupId: string,
    location: CardLocationType
  }) => {
    setMenuAnchor(e.currentTarget);
    setSelectedCard({
      card,
      groupId,
      location
    });
  };

  const onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const { source } = result;
    const { destination } = result;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const newOrdered: string[] = reorder(ordered, source.index, destination.index);

      setOrdered(newOrdered);

      return;
    }

    // reordering card
    const data = reorderCard({
      cardMap: columns,
      source,
      destination
    });

    setColumns([...data]);
  };

  const moveCard = ({ newGroup }: { newGroup: GroupType }) => {
    if (selectedCard) {
      const { location }: { location: CardLocationType } = selectedCard;

      const destination = {
        droppableId: newGroup.id,
        index: 0
      };
      // Reordering card
      const data = reorderCard({
        cardMap: columns,
        source: location,
        destination
      });

      // Update displayed data
      setColumns([...data]);

      // Close card menu
      setCardMenuOpen(false);
    }
  };

  const board = (
    <>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided: DroppableProvided) => (
          <>
            <div ref={provided.innerRef} {...provided.droppableProps} className="board">
              {ordered.map((id: string, index: number) => {
                const groupId = id;
                const column: ?GroupType = columns.find(
                  (col: GroupType) => col.id === id
                );
                const actions = {
                  onCardMenuClick: ({ e, card, location }) =>
                    onCardMenuClick({ e, card, groupId, location })
                };
                if (column) {
                  return (
                    <Column
                      key={id}
                      index={index}
                      groups={columns}
                      column={column}
                      locked={locked}
                      actions={actions}
                      columnsWidth={columnsWidth}
                      cardsHeight={cardsHeight}
                      columnsAction={columnsAction}
                    />
                  );
                }
                return <></>;
              })}
            </div>

            <CardMenu
              open={cardMenuOpen}
              style={cardMenuStyle}
              setOpen={setCardMenuOpen}
              handleMoveToClick={({ newGroup }) => moveCard({ newGroup })}
              groups={columns}
              selectedCard={selectedCard}
            />
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </>
  );

  return <DragDropContext onDragEnd={onDragEnd}>{board}</DragDropContext>;
};

export default Board;
