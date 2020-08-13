import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updatePager } from '../../actions/search/query';
import { SET_PAGE } from '../../actions/types';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationComponent = (props) => {
  const classes = useStyles();

  const {
    pager: { currentPage, pages },
    updatePager,
  } = props;

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handleChange = (event, value) => {
    // console.log(event.target);
    if (currentPage === value) return;
    updatePager(SET_PAGE, value);
  };

  return (
    <div className={classes.root}>
      {pages && (
        <Pagination
          count={pages}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      )}
    </div>
  );
};

PaginationComponent.propTypes = {
  pager: PropTypes.object.isRequired,
  updatePager: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pager: state.pager,
});

export default connect(mapStateToProps, { updatePager })(PaginationComponent);
