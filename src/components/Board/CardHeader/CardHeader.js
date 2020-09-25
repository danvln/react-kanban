// @flow
/* eslint-disable react/prop-types */
import React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  "aria-labelledby": string,
  "data-rbd-drag-handle-context-id": string,
  "data-rbd-drag-handle-draggable-id": string,
  draggable: boolean,
  isDragging: boolean,
  onDragStart: (e: any) => void,
  tabIndex: number,
  title: string
};

const CardHeader = ({
  title,
  "aria-labelledby": ariaLabelledBy,
  "data-rbd-drag-handle-context-id": dataRbdDragHandleContextId,
  "data-rbd-drag-handle-draggable-id": dataRbdDragHandleDraggableId,
  draggable,
  onDragStart,
  tabIndex
}: Props) => {
  const defaultHtmlProps = {
    "aria-labelledby": ariaLabelledBy,
    "data-rbd-drag-handle-context-id": dataRbdDragHandleContextId,
    "data-rbd-drag-handle-draggable-id": dataRbdDragHandleDraggableId,
    draggable,
    onDragStart,
    tabIndex,
    className: "title"
  };

  return (
    <Typography component="h2" {...defaultHtmlProps}>
      {title}
    </Typography>
  );
};

export default CardHeader;
