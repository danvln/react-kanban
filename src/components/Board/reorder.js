// @flow
import { cloneDeep } from "lodash";
import type { DraggableLocation } from "react-beautiful-dnd";
import type { GroupType } from "../../types";

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

type ReorderQuoteMapArgs = {|
  cardMap: GroupType[],
  source: DraggableLocation,
  destination: DraggableLocation
|};

export type ReorderQuoteMapResult = {|
  quoteMap: GroupType[]
|};

export const reorderCard = ({ cardMap, source, destination }: ReorderQuoteMapArgs) => {
  const current: ?GroupType = cardMap.find(
    (cm: GroupType) => cm.id === source.droppableId
  );
  const next: ?GroupType = cardMap.find(
    (cm: GroupType) => cm.id === destination.droppableId
  );

  if (current && current.cards && next && next.cards) {
    const target = current.cards[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(current.cards, source.index, destination.index);
      const index = cardMap.findIndex((cm) => cm.id === source.droppableId);
      cardMap[index].cards = cloneDeep(reordered);
      return cardMap;
    }

    // moving to different list

    // remove from original
    current.cards.splice(source.index, 1);
    // insert into next
    next.cards.splice(destination.index, 0, target);

    const result: GroupType[] = cardMap.map((cm) => {
      if (cm.id === next.id) {
        return next;
      }
      if (cm.id === current.id) {
        return current;
      }
      return cm;
    });

    return cloneDeep(result);
  }

  return cardMap;
};
