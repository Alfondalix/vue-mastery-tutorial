
Vue.component('Product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: `
  <div class="product">
  <div class="product-image">
    <a :href='link' target="_blank">
      <img :src='image'>
    </a>
  </div>
  <div class="product-info">
    <h1> {{ title }} </h1>
    <p v-if='inStock'>In Stock</p>
    <p v-else :class="[!inStock ? NoStockClass : '']">Out of Stock</p>
    <p>Shipping: {{ shipping }}</p>
    <span v-if='onSale'>On Sale!</span>
    <ul>
      <li v-for='detail in details'> {{ detail }}</li>
    </ul>
    <div v-for='(variant, index) in variants' :key='variant.variantId' class="color-box"
      :style='{backgroundColor: variant.variantColor}' @mouseover='updateProduct(index)'>
    </div>
    <p>Sizes:</p>
    <ul>
      <li v-for='size in sizes' :key='size.sizeId'>{{ size.sizeLetter }}</li>
    </ul>
    <!-- <span style="display: flex"> -->
    <button @click='addToCart' :disabled='!inStock' :class='{disabledButton: !inStock}'>Add to
      Cart</button>
    <button @click='substractToCart'>Substract from Cart</button>
    <!-- </span> -->
  </div>
</div>
  `,
  data() {
    return {
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
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    substractToCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  },
});

Vue.component('ProductDetails', {
  props: {
    details: {
      type: Boolean,
      required: true,
    }
  },
  template: `
  <div>
    <p>{{ details }}</p>
  </div>
`,
  computed: {
    showDetails() {
      this.details ? 'This is a pair of socks' : '';
    },
  }
},
);

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
    details: true,
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      this.cart.pop(id)
    }
  }
})