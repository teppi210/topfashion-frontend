import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class CartUpdateProductStore {
  isProductUpdateCart

  constructor (rootStore) {
    this.rootStore = rootStore
    this.isProductUpdateCart = false
  }

  updateProduct (data) {
    const postData = {}
    postData.cart_item_key = data.cart_item_key
    postData.quantity = data.quantity
    postData.return_cart = true
    postData.refresh_totals = true
    return Api.CoCart.CartUpdateProduct(postData)
      .then(res => {
        this.setProductAfterUpdateCart(res.data)
        this.rootStore.cartInfoTotalProductsStore.getProductsCartInfoTotal()
        this.rootStore.cartCountProductsStore.getProductsCartCountItems()
        this.isProductUpdateCart = true
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  setProductAfterUpdateCart = data => {
    this.rootStore.cartProductsStore.productsCart = data
  }

  clear () {
    this.isProductUpdateCart = false
  }
}

decorate(CartUpdateProductStore, {
  isProductUpdateCart: observable,
  updateProduct: action.bound,
  setProductAfterUpdateCart: action
})