const styles = theme => ({
  // root: {
  //   display: 'flex',
  //   alignItems: 'center'
  // },
  container: {
    // flexGrow: 1,
    // marginTop: theme.spacing.unit / 8,
    // padding: theme.spacing.unit * 12,
    // paddingTop: 0,
    // paddingBottom: theme.spacing.unit * 6,
    // background: 'white',
    height: '100vh'
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  progress: {
    // margin: theme.spacing.unit * 2,
    // color: green[500],
    position: 'absolute',
    top: -16,
    // left: -6,
    // top: 0,
    // left: 0,
    zIndex: 1
  },
  catQuote: {
    padding: theme.spacing.unit * 6
  }
});

export default styles;
