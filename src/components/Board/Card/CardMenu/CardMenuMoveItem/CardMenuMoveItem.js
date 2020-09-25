// @flow
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import MoveToIcon from "@material-ui/icons/Forward";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import AutoComplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import type { GroupType, SelectedCardType } from "../../../../../types";

type Props = {
  groups: GroupType[],
  selectedCard: SelectedCardType,
  handleMoveToClick: (e: any) => void
};

const CardMenuMoveItem = ({ groups, selectedCard, handleMoveToClick }: Props) => {
  const [newGroup, setNewGroup] = useState();
  const [errorProps, setErrorProps] = useState();
  const { card, groupId } = selectedCard;

  const checkNewGroup = () => {
    const existingGroup = newGroup
      ? groups.find(group => group.id === newGroup.id)
      : undefined;
    if (existingGroup) {
      setErrorProps(undefined);
      return true;
    }
    setErrorProps({
      error: true,
      helperText: "Select a group !"
    });
    return false;
  };

  return (
    <ListItem>
      <Card className="menu-move-to">
        <CardHeader
          title={`Move ${card.title} to :`}
          action={
            <IconButton
              className="move-to-button"
              color="primary"
              onClick={() => {
                if (checkNewGroup()) {
                  handleMoveToClick({ newGroup });
                }
              }}
            >
              <MoveToIcon />
            </IconButton>
          }
        />
        <CardContent>
          <AutoComplete
            className="groups-auto-complete"
            id="groups-auto-complete"
            style={{ width: 300 }}
            options={groups}
            getOptionLabel={group => group.title}
            getOptionDisabled={group => group.id === groupId}
            onChange={(e, value) => setNewGroup(value)}
            renderInput={params => (
              <TextField
                {...params}
                {...errorProps}
                required
                label="New group"
                variant="outlined"
                fullWidth
                autoFocus
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    if (checkNewGroup()) {
                      handleMoveToClick({ newGroup });
                    }
                  }
                }}
              />
            )}
          />
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default CardMenuMoveItem;
