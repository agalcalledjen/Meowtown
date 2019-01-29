// Actions - we have 3...
const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_ITEM = 'RESET_ITEM';
const RESET_ITEM_IMG = 'RESET_ITEM_IMG';

// Action Creators
export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetItem = () => ({
  type: RESET_ITEM
});

export const resetItemImg = () => ({
  type: RESET_ITEM_IMG
});

// Initial States
const initialState = {
  title: 'Name your item',
  description: 'Describe your item',
  tags: [], // should not be null bc it will complain that it cannot map over an empty array
  imageurl: 'http://via.placeholder.com/350x250?text=Please select an image',
  itemowner: {},
  created: new Date()
};

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM: {
      return { ...state, ...action.payload };
      // we're copying all the properties of the obj and then we're manipulating all of the properties of payload
    }
    case RESET_ITEM: {
      return { ...initialState };
      // we want to reset the item so we need to copy the initial state
    }
    case RESET_ITEM_IMG: {
      return { ...state, imageurl: initialState.imageurl };
      // we are grabbing the state since we don't want all the other properties changed
      // we only want to reset the image url
    }
    default:
      return state;
  }
};
