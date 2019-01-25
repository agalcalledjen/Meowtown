import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import styles from './styles';
import { withStyles } from '@material-ui/core';

const ItemCard = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
      <CardMedia
        className={classes.media}
        image="https://r.hswstatic.com/w_907/gif/tesla-cat.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item.title}
        </Typography>
        {item.tags.map(tag => (
          <Typography component="p">{tag.title}</Typography>
        ))}
        <Typography component="p">{item.description}</Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button variant="outlined" className={classes.button}>
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);

// put the mapping over here and grab the itemcard from components
// itemcard is a component since it is useable
