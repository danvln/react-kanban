// @flow
import React from "react";
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import CardMenuMoveItem from "./CardMenuMoveItem";
import type { GroupType, SelectedCardType } from "../../../../types";

type Props = {
  open: boolean,
  style: any,
  groups: GroupType[],
  selectedCard: ?SelectedCardType,
  handleMoveToClick: (e: any) => void,
  setOpen: boolean => void
};

const CardMenu = ({
  open,
  style,
  setOpen,
  handleMoveToClick,
  groups,
  selectedCard
}: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {selectedCard && (
        <Dialog onClose={handleClose} open={open}>
          <Menu
            className="card-menu"
            id="card-menu"
            open={open}
            style={style}
            onClose={handleClose}
            anchorEl={document.getElementsByTagName("body")[0]}
          >
            <span tabIndex={0}>
              <CardMenuMoveItem
                groups={groups}
                selectedCard={selectedCard}
                handleMoveToClick={handleMoveToClick}
              />
            </span>
          </Menu>
        </Dialog>
      )}
    </>
  );
};

export default CardMenu;
