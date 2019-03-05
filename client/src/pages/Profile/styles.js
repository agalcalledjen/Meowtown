const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 12,
    background: theme.palette.secondary.main,
    height: '100vh'
  },
  root: {
    padding: theme.spacing.unit * 12,
    paddingTop: 0
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
  shareWrapper: { background: theme.palette.secondary.main },
  share: {
    marginLeft: theme.spacing.unit * 12
  }
});

export default styles;
