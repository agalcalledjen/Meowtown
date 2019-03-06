const styles = theme => ({
  container: {
    height: '100vh',
    background: theme.palette.secondary.main
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  progress: {
    position: 'absolute',
    top: -16,
    zIndex: 1
  },
  catQuote: {
    padding: theme.spacing.unit * 6
  }
});

export default styles;
