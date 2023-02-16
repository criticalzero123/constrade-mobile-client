export const deleteItem = (itemList, item) => {
  const newItem = itemList.filter((_item) => _item !== item);

  return newItem;
};
