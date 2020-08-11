import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import debounce from 'lodash.debounce';

import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const styles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 5),
      width: '100%',
    },
    [theme.breakpoints.up('xl')]: {
      margin: theme.spacing(0, 30),
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
      width: '100%',
      '&:focus': {
        width: '100%',
      },
      // width: "12ch",
      // "&:focus": {
      //   width: "20ch",
      // },
    },
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1, 4),
  },
}));

function Searchbar({ textSearch, searchParamsDispatch, handleDrawerOpen }) {
  const classes = styles();

  const history = useHistory();
  const location = useLocation();
  const [textSearchVal, setTextSearchVal] = useState(textSearch);

  useEffect(() => {
    setTextSearchVal(textSearch);
  }, [textSearch]);

  const sendQuery = (query) => {
    searchParamsDispatch({ type: 'TEXT', payload: query });
    if (location.pathname !== '/search') {
      history.push('/search');
    }
  };

  const delayedQuery = useCallback(
    debounce((q) => sendQuery(q), 1000),
    []
  );

  const onChange = (e) => {
    setTextSearchVal(e.target.value);
    delayedQuery(e.target.value);
  };

  const onClick = () => {
    console.log(location.pathname);
    if (location.pathname === '/search') {
      handleDrawerOpen();
    }
    if (location.pathname !== '/search') {
      handleDrawerOpen();
      history.push('/search');
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        autoFocus
        placeholder="Search for recipes . . ."
        fullWidth={true}
        value={textSearchVal}
        onChange={onChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        endAdornment={
          <Button
            className={classes.button}
            variant="outlined"
            size="small"
            color="inherit"
            onClick={onClick}
          >
            Advanced
          </Button>
        }
      />
    </div>
  );
}

export default Searchbar;
