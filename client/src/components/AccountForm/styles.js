const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%'
  },
  formButton: {
    marginTop: theme.spacing.unit * 2
  },
  formToggle: {
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  accountForm: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  error: {
    fontFamily: 'Roboto, sans-serif',
    color: 'red',
    fontSize: '1rem',
    marginTop: theme.spacing.unit / 2
  }
});

export default styles;
