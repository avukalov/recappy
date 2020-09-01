import React, { useState, memo} from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewListIcon from '@material-ui/icons/ViewList';
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';


const Sidebar = (props) => {
  return (
    <>
        <Divider />
        <List>
          {props.profileList.map((text, index) => (
            <ListItem button key={text} onClick={() => props.handleIcon(text)}>
              <ListItemIcon>
                {index % 3 === 0 ? <AddCircleOutlineIcon /> : 
                (index % 3 === 1 ? <ViewListIcon /> : <FavoriteIcon />)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {props.accountList.map((text, index) => (
            <ListItem button key={text} onClick={() => props.handleIcon(text)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
    </>
  );
};
export default memo(Sidebar);
