// @flow

export type Card = {|
  id: string,
  title: string,
  content?: string
|};

export type CardLocation = {|
  droppableId: string,
  index: number
|};

export type SelectedCard = {
  card: Card,
  groupId: string,
  location: CardLocation
};

export type Group = {|
  id: string,
  title: string,
  cards: Card[],
  editing?: boolean
|};
