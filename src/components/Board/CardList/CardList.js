// @flow
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FixedSizeList as List, areEqual } from "react-window";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DraggableRubric,
  DroppableStateSnapshot
} from "react-beautiful-dnd";
import Card from "../Card";
import useWindowSize from "../../../Hooks/useWindowSize";
import useDebounce from "../../../Hooks/useDebounce";
import type { CardType, WindowSizeType } from "../../../types";

const getBackgroundColor = (isDraggingOver: boolean, isDraggingFrom: boolean): string => {
  if (isDraggingOver) {
    return "rgba(39, 174, 96, 0.7)";
  }
  if (isDraggingFrom) {
    return "rgba(231, 76, 60, 0.7)";
  }
  return "rgb(227, 227, 227)";
};

type RowProps = {
  data: CardType[],
  index: number,
  style: Object
};

type Props = {
  listId: string,
  cards: CardType[],
  locked: boolean,
  onCardMenuClick: (e: any) => void,
  cardsHeight: number,
  columnsWidth: number
};

const CardList = ({
  listId,
  cards,
  locked,
  onCardMenuClick,
  cardsHeight,
  columnsWidth
}: Props) => {
  let columnIndex;
  const Row = React.memo(({ data, index, style }: RowProps) => {
    columnIndex = index;
    const card: ?CardType = data[index];

    if (!card) {
      return null;
    }

    // Faking some nice spacing around the items
    const patchedStyle = {
      ...style,
      left: style.left + 8,
      top: style.top + 8,
      width: `calc(${style.width} - ${8 * 2}px)`,
      height: style.height - 8,
      padding: 0
    };

    return (
      <Draggable
        draggableId={card.id}
        index={index}
        key={card.id}
        isDragDisabled={locked}
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Card
            provided={provided}
            card={card}
            locked={locked}
            isDragging={snapshot.isDragging}
            style={patchedStyle}
            location={{
              droppableId: listId,
              index: columnIndex
            }}
            onCardMenuClick={onCardMenuClick}
            height={cardsHeight}
          />
        )}
      </Draggable>
    );
  }, areEqual);

  const { height }: WindowSizeType = useDebounce({
    value: useWindowSize(),
    delay: 50
  });

  return (
    <Droppable
      droppableId={listId}
      isDropDisabled={locked}
      mode="virtual"
      renderClone={(
        provided: DraggableProvided,
        snapshot: DraggableStateSnapshot,
        rubric: DraggableRubric
      ) => (
        <Card
          provided={provided}
          isDragging={snapshot.isDragging}
          card={cards[rubric.source.index]}
          locked={locked}
          style={{ margin: 0, padding: 0, height: `${cardsHeight + 1}px` }}
          location={null}
          onCardMenuClick={onCardMenuClick}
        />
      )}
    >
      {(droppableProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
        const itemCount: number = cards.length;

        let heightItems = itemCount * cardsHeight + 8;

        if (heightItems > height - 250) {
          heightItems = height - 250;
        }
        if (heightItems === 0) {
          heightItems = 50;
        }

        return (
          <List
            width={columnsWidth}
            height={heightItems}
            itemCount={itemCount}
            itemSize={cardsHeight}
            outerRef={droppableProvided.innerRef}
            style={{
              backgroundColor: getBackgroundColor(
                snapshot.isDraggingOver,
                Boolean(snapshot.draggingFromThisWith)
              ),
              transition: "background-color 0.2s ease",
              // We add this spacing so that when we drop into an empty list we will animate to the correct visual position.
              padding: "2px",
              overflow: "auto"
            }}
            itemData={cards}
          >
            {Row}
          </List>
        );
      }}
    </Droppable>
  );
};

export default CardList;
