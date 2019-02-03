import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#f9a825'
    },
    secondary: {
      main: '#212121'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        // color: 'white',
        // marginTop: theme.spacing.unit * 3,
        // fontSize: '2rem',
        // textTransform: 'uppercase',
        fontWeight: 400,
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        '&:hover': {
          // backgroundColor: '#f9a825'
        }
      }
    }
  }
});
