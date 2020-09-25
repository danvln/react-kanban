// @flow
import React, { memo } from "react";
import CardUI from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import type { DraggableProvided as DraggableProvidedType } from "react-beautiful-dnd";
import type { CardType, CardLocationType } from "../../../types";

type Props = {
  card: CardType,
  locked: boolean,
  isDragging: boolean,
  provided: DraggableProvidedType,
  style: Object,
  location: ?CardLocationType,
  onCardMenuClick: ({ e: any, card: CardType, location: ?CardLocationType }) => void
};

const getStyle = ({
  provided,
  style,
  isDragging
}: {
  provided: DraggableProvidedType,
  style: ?Object,
  isDragging: boolean
}) => {
  const draggingPropsStyle = isDragging
    ? {
        borderStyle: "dashed",
        borderColor: "#000099",
        borderWidth: "2px",
        borderRadius: 0,
        paddingTop: "7px"
      }
    : {};

  if (!style) {
    return {
      ...provided.draggableProps.style,
      ...draggingPropsStyle
    };
  }

  return {
    ...provided.draggableProps.style,
    ...style,
    ...draggingPropsStyle
  };
};

const Card = ({
  card,
  locked,
  isDragging,
  provided,
  style,
  location,
  onCardMenuClick
}: Props) => {
  const { id, title, content } = card;
  const { innerRef, draggableProps, dragHandleProps } = provided;
  return (
    <CardUI
      className="card"
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={id}
      style={getStyle({ provided, style, isDragging })}
    >
      <CardHeader
        className="card-header"
        disableTypography
        subheader={
          <Typography className="content" component="article">
            {content}
          </Typography>
        }
        title={
          <Typography className="title" component="h3">
            {title}
          </Typography>
        }
        action={
          <IconButton
            className="card-menu-button"
            disabled={locked}
            onClick={e => {
              onCardMenuClick({ e, card, location });
            }}
          >
            <MoreVertIcon color={!locked ? "primary" : "disabled"} />
          </IconButton>
        }
      />
    </CardUI>
  );
};

export default memo<Props>(Card);
