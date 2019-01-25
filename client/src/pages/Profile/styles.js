const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
    // padding: theme.spacing.unit * 2,
    // textAlign: 'center',
    // color: theme.palette.text.secondary
  }
});

export default styles;
