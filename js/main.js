var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/img/socks-green.png',
    link: 'https://shop.googlemerchandisestore.com/Google+Redesign/Apparel/Mens/Mens+T+Shirts',
    inventory: 11,
    onSale: true,
    details: ['80% cotton', '20& polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 1,
        variantColor: 'green',
        variantImage: './assets/img/socks-green.png',
      },
      {
        variantId: 2,
        variantColor: 'blue',
        variantImage: './assets/img/socks-blue.png',
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
    updateProduct(variantImage) {
      this.image = variantImage
    },
  },
});