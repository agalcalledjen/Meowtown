const styles = theme => ({
  container: {
    flexGrow: 1,
    height: '100%',
    background: theme.palette.primary.main
    // padding: theme.spacing.unit * 5,
    // [theme.breakpoints.up('md')]: {
    //   padding: theme.spacing.unit * 20
    // }
  },
  heading: {
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 20
    },
    background: theme.palette.primary.main
  },

  headline: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    fontSize: theme.typography.display3.fontSize,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.display4.fontSize
    }
  },
  subheading: {
    fontWeight: 400,
    color: 'white'
  },
  account: {
    padding: theme.spacing.unit * 5,
    background: theme.palette.primary.main
  }
});

export default styles;
