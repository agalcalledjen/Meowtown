const styles = theme => ({
  error: {
    color: 'red',
    fontSize: '1rem'
    // margin: '1rem'
  },
  headline: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    fontSize: theme.typography.display3.fontSize
    // [theme.breakpoints.up('md')]: {
    //   fontSize: theme.typography.display3.fontSize
    // }
  },
  subheading: {
    fontWeight: 400,
    color: 'white'
  },
  button: {
    marginTop: theme.spacing.unit * 12,
    width: '100%',
    fontSize: '1.25rem',
    textTransform: 'uppercase',
    fontWeight: 400
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tags: {
    textTransform: 'capitalize'
  },
  shareButton: {
    marginTop: theme.spacing.unit * 3,
    fontSize: '1.25rem',
    textTransform: 'uppercase',
    fontWeight: 400,
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4
  },
  field: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  capitalize: {
    textTransform: 'capitalize'
  }
});

export default styles;
