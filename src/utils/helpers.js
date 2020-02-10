export function checkItemIncluded(checkedItem, array) {
  return array.some(item => item.value === checkedItem.value);
}

export function sliceText(text, maxLength) {
  if (text.length >= maxLength) {
    return text.slice(0, maxLength);
  } else {
    return text;
  }
}
