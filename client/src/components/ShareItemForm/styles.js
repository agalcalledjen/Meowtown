const styles = theme => ({
  error: {
    fontFamily: 'Roboto, sans-serif',
    color: 'red',
    fontSize: '1rem',
    marginTop: '0.5rem'
  },
  headline: {
    fontWeight: 700,
    color: theme.palette.text.primary
  },
  subheading: {
    fontWeight: 400,
    color: 'white'
  },
  button: {
    marginTop: theme.spacing.unit * 12,
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tags: {
    textTransform: 'capitalize'
  },
  shareButton: {
    marginTop: theme.spacing.unit * 3
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
