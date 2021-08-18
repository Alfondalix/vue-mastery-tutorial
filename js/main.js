var eventBus = new Vue();

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

  <product-tabs :reviews='reviews'></product-tabs>

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
      reviews: [],
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
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
});

Vue.component('Product-review', {
  template: `
    <form class='review-form' @submit.prevent='onSubmit'>
    <p>
    <label for='name'>Name:</label>
    <input id='name' v-model='name'>
    </p>
    <p>
    <label for='review'>Review:</label>
    <textarea id='review' v-model='review'></textarea>
    </p>
    <p>
    <label for='rating'>Rating:</label>
    <select id='rating' v-model.number='rating'>
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
    </select>
    </p>
    <label for='opinion'>Would you recommend this product?</label>
    <p>
    <input type="radio" id='yes' v-model="opinion" value="yes">
    <label for='yes'>Yes</label>
    <input type="radio" id='no' v-model="opinion" value="no">
    <label for='no'>No</label>
    </p>   
      <p>
        <input type='submit' value='Submit'>
      </p>
    </form class='review-form'>

  `,
  data() {
    return {
      name: null,
      review: null,
      rating: nulll,
      opinion: 'yes',
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.opinion) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          opinion: this.opinion

        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null
        this.review = this.review
        this.rating = this.rating
        this.opinion = this.opinion
      }
      else {
        if (!this.name) this.errors.push('Name required.')
        if (!this.review) this.errors.push('Review required.')
        if (!this.rating) this.errors.push('Rating required.')
        if (!this.opinion) this.errors.push('Opinion required.')
      }

    }
  }
})

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

Vue.component('product-tabs', {
  props: {
    reviews: Array,
    required: true
  },
  template: `
    <div>
    <span class='tab' :class='{ activeTab: selectedTab === tab }' v-for='(tab, index) in tabs' :key= 'index' @click='selectedTab = tab'>
      {{ tab }}
    </span>
    </div>

    <div v-show='selectedTab === "Reviews"'>
    <h2>Reviews</h2>
    <p v-if='!reviews.length'>There are no reviews yet.</p>
    <ul>
      <li v-for='review in reviews'>
        <p>{{ review.name }}</p>
        <p>{{ review.review }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>Recommend: {{ review.opinion }}</p>
      </li>
    </ul>
  </div>

  <Product-review v-show='selectedTab === "Make a Review"'/>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
})

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