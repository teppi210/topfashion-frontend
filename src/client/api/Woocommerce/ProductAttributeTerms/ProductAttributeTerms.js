import request from '../../request';

export default async function ProductAttributeTerms(idAttribute) {
  return request(`/wp-json/wc/v3/products/attributes/${idAttribute}/terms`, {});
}
