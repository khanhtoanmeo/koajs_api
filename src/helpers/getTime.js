export function getTime(product) {
  return new Date(product.createdAt).getTime();
}
