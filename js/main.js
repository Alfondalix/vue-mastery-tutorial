var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    selectedVariant: 0,
    link: 'https://shop.googlemerchandisestore.com/Google+Redesign/Apparel/Mens/Mens+T+Shirts',
    onSale: true,
    NoStockClass: 'lined',
    details: ['80% cotton', '20& polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 1,
        variantColor: 'green',
        variantImage: './assets/img/socks-green.png',
        variantQuantity: 10,
      },
      {
        variantId: 2,
        variantColor: 'blue',
        variantImage: './assets/img/socks-blue.png',
        variantQuantity: 0,
      },
    ],
    sizes: [{
      sizeId: 1,
      sizeLetter: 'S'
    },
    {
      sizeId: 2,
      sizeLetter: 'M'
    },
    {
      sizeId: 3,
      sizeLetter: 'L'
    },
    {
      sizeId: 4,
      sizeLetter: 'XL'
    },
    ],
    cart: 0,
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    substractToCart() {
      this.cart -= 1
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    printed() {
      if (onSale === true) {
        return this.brand + ' ' + this.product
      }
    }
  },
});