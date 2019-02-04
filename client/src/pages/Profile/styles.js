const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 12
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 12,
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 6
  },
  paper: {
    padding: theme.spacing.unit * 6
  },
  userName: {
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    marginRight: theme.spacing.unit * 2,
    width: 50,
    height: 50
  },
  gravatar: {
    borderRadius: 50,
    width: 50,
    height: 50
  },
  share: {
    marginLeft: theme.spacing.unit * 12
  }
});

export default styles;
