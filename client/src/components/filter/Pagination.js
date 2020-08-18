import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setPager } from '../../actions/search/query';
import { UPDATE_CURRENT_PAGE } from '../../actions/types';

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
    setPager,
  } = props;

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handleChange = (event, value) => {
    if (currentPage === value) return;
    setPager(UPDATE_CURRENT_PAGE, value);
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
  setPager: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pager: state.pager,
});

export default connect(mapStateToProps, { setPager })(PaginationComponent);
