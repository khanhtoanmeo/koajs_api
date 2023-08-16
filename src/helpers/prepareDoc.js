export function prepareDoc(doc, id = null) {
  if (id) return { ...doc, id };
  return {
    ...doc.data(),
    id: doc.id,
  };
}
