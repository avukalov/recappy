import React, { useState, memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  activeProfileList: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  activeAccountList: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  activeIcon: {
    color: 'white',
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const { profileList, accountList, handleIcon, currentComp } = props;

  return (
    <>
      <Divider />
      <List>
        {profileList.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => handleIcon(text)}
            className={currentComp === text ? classes.activeProfileList : null}
          >
            <ListItemIcon>
              {index % 3 === 0 ? (
                <AddCircleOutlineIcon
                  className={currentComp === text ? classes.activeIcon : null}
                />
              ) : index % 3 === 1 ? (
                <ViewListIcon
                  className={currentComp === text ? classes.activeIcon : null}
                />
              ) : (
                <FavoriteIcon
                  className={currentComp === text ? classes.activeIcon : null}
                />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {accountList.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => handleIcon(text)}
            className={currentComp === text ? classes.activeAccountList : null}
          >
            <ListItemIcon>
              <SettingsIcon
                className={currentComp === text ? classes.activeIcon : null}
              />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default memo(Sidebar);
