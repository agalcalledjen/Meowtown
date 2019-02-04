const styles = theme => ({
  card: {
    paddingBottom: theme.spacing.unit * 1.5
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  title: {
    color: theme.palette.text.primary
  },
  capitalize: {
    textTransform: 'capitalize'
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
  owner: {
    marginBottom: theme.spacing.unit * 6
  }
});

export default styles;
