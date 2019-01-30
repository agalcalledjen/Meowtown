// export default function validate(item) {
//   const error = {};

//   /**
//    * @TODO: Write the validation rules for the share form.
//    *
//    * An item title, description, and at least one tag is required for all items.
//    */

//   console.log('Validating:', item);

//   if (!item.title) {
//     error.title = 'Title is required.';
//   }
//   if (!item.description) {
//     error.description = 'Description is required.';
//   }
//   if (!item.tag) {
//     error.tag = 'At least one tag is required.';
//   }

//   return error;
// }

export const validate = (values, selectedTags, fileSelected) => {
  const error = {};

  /**
   * @TODO: Write the validation rules for the share form.
   *
   * An item title, description, and at least one tag is required for all items.
   */

  console.log('Validating:', values);

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
  console.log('VALIDATION:', error);
  return error;
};
