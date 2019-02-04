export const validate = (values, selectedTags, fileSelected) => {
  const error = {};

  if (!fileSelected) {
    error.imageurl = 'Image is required.';
  }
  if (!values.title) {
    error.title = 'Title is required.';
  }
  if (!values.description) {
    error.description = 'Description is required.';
  }
  if (!selectedTags || selectedTags.length < 0) {
    error.tags = 'At least one tag is required.';
  }

  return error;
};
