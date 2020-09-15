import React, { useEffect, useState, forwardRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import MaterialTable from 'material-table';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom, Typography, Button, 
        // Box, Table, TableBody, TableContainer, TableRow, TableCell, Paper, TableHead, IconButton 
      } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

// import RecipeCard from '../recipe/RecipeCard';

import { getUserRecipes } from '../../actions/userRecipes';
import { setRecipe, deleteRecipe } from '../../actions/recipes';
import { setDashboardComponent } from '../../actions/dashboard';
import { 
  UPDATE_RECIPE,
  RECIPE_ACTION,
  CURRENT_COMPONENT,
} from '../../actions/types';


const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(7)
  },
  rowFlexEnd: {
    padding: 7,
    display: 'flex',
    direction: 'row',
    justifyContent: 'flex-end'
  },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        transition: 'all 0.25s ease-in-out 0s',
        '&:hover': {
            transform: 'scale(1.12)'
      }
    }
}));

const UserRecipes = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const columns = [
      { title: 'Image', field: 'image', render: rowData => 
        <img src={rowData.image ? rowData.image : require('../../shared/images/recipe-default.png')} 
        style={{width: 120, height: 110}}/>,
        cellStyle: { minWidth: 100,textAlign: "center" }, headerStyle: { minWidth: 100}},
      { title: 'Title', field: 'title', cellStyle: { minWidth: 100, textAlign: "center" }, headerStyle: { minWidth: 100} },
      { title: 'Servings', field: 'servings', type: 'numeric', cellStyle: { minWidth: 100, textAlign: "center" }, headerStyle: { minWidth: 100} },
      { title: 'Preparation time', field: 'readyInMinutes', type: 'numeric', cellStyle: { minWidth: 100, textAlign: "center" }, headerStyle: { minWidth: 100} },
      { title: 'Healthy', field: 'veryHealthy', type: 'boolean', cellStyle: { minWidth: 100, textAlign: "center" }, headerStyle: { minWidth: 100} },
    ]

  const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} style={{color: "4caf50"}} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} color="error" />),
      Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <ClearIcon {...props} color="error" ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
  
  const { 
    recipes,
    user : { _id },
    getUserRecipes,
    setRecipe,
    deleteRecipe,
    setDashboardComponent,
  } = props;

  useEffect(() => {
    getUserRecipes(_id);
  }, [_id]);

  useEffect(() => {
    setLoading(false);
  }, []);



  const handleEdit = (recipe) => {
    setRecipe(RECIPE_ACTION, 'Update');
    setRecipe(UPDATE_RECIPE, recipe);
    setDashboardComponent(CURRENT_COMPONENT, 'New recipe');
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {!loading ? (
           recipes.length !== 0 ? (
              <Zoom in={true} >
                <Grid item xs={12}>
                <MaterialTable
                  icons={tableIcons}
                  // title="My recipes"
                  columns={columns}
                  data={recipes}
                  
                  editable={{
                    // onRowAdd: (newData) =>
                    //   new Promise((resolve) => {
                    //     setTimeout(() => {
                    //       resolve();
                    //       setState((prevState) => {
                    //         const data = [...prevState.data];
                    //         data.push(newData);
                    //         return { ...prevState, data };
                    //       });
                    //     }, 600);
                    //   }),
                    // onRowUpdate: () => handleEdit(),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          setTimeout(() => {
                            resolve();
                            deleteRecipe(_id, oldData._id);
                            return recipes;
                        }, 700);
                      })
                  }}
                  actions={[
                    {
                      icon: VisibilitySharpIcon,
                      tooltip: 'Preview',
                      onClick: (event, rowData) => history.push(`/recipe/${rowData._id}`)
                    },
                    {
                      icon: Edit,
                      tooltip: 'Edit',
                      onClick: (event, rowData) => handleEdit(rowData)
                    },
                    // rowData => ({
                    //   icon: DeleteIcon,
                    //   tooltip: 'Delete recipe',
                    //   onClick: (event, rowData) => {//window.confirm("You want to delete " + rowData.title); 
                    //   deleteRecipe(_id, rowData._id)},
                    // }),
                  ]}
                  options={{
                    emptyRowsWhenPaging: false,
                    actionsColumnIndex: -1,
                    search: true,
                    rowStyle: { fontSize: 18},
                    headerStyle: {textAlign:'center', fontSize: 20},
                    tableLayout: 'auto',
                    //maxBodyHeight: '70vh',
                    showTitle: false,
                    pageSize: 4,
                    pageSizeOptions: []
                      
                  }}
                  localization={{ body: { editRow: { deleteText: 'Are you sure you want to delete this recipe?' } } }}
                />
                </Grid>
              </Zoom>
              )
               // <Grid key={recipe._id} item xs={12} sm={6} md={4} lg={3}>
                  // <TableContainer component={Paper}>
                  //   <Table size="small" >
                  //     <TableHead>
                  //       <TableRow>
                  //         <TableCell>
                  //           <Box className={classes.rowFlexEnd}>
                  //             <IconButton onClick={() => handleEdit(recipe)}>
                  //               <EditIcon />
                  //             </IconButton>
                  //             <IconButton>
                  //               <DeleteIcon />
                  //             </IconButton>
                  //           </Box>
                  //         </TableCell>
                  //       </TableRow>
                  //     </TableHead>
                  //     <TableBody>
                  //       <TableRow>
                  //         <TableCell padding="none">
                  //           <RecipeCard recipe={recipe} />
                  //         </TableCell>
                  //       </TableRow>
                  //     </TableBody>
                  //   </Table>
                  // </TableContainer>
              //   </Grid>
              // </Zoom> 
           : (
            <Zoom in={true}>
              <div className={classes.loading}>
                <Typography style={{padding: 7}} variant="h5">You haven't created any recipes yet.</Typography>
                <Typography style={{padding: 7}} variant="h5">Let's change that!</Typography>
                <Button className={classes.button}
                        variant="contained" 
                        color="secondary" 
                        onClick={() => setDashboardComponent(CURRENT_COMPONENT, 'New recipe')}>
                          Create recipe
                  </Button>
              </div>
            </Zoom>
          )
        ) : (
          <div className={classes.loading}>
            <h1>Loading...</h1>
          </div>
        )}
      </Grid>

      {/* {!loading && pager.pages !== 1 && <OptionsToolbar pagination />} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: state.userRecipes.recipes,
  user: state.auth.user
});

export default connect(mapStateToProps, 
  { getUserRecipes,
    setRecipe,
    deleteRecipe,
    setDashboardComponent })(UserRecipes);
