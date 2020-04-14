var app = new Vue ({
    el: '#app', //conect
    data :  {
        product: 'Socks', //calling
        description: 'A pair of warm, fuzzy socks',
        image: './images/green_socks.jpg',
        altText: 'A pair of socks',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inStock: true,
        inventory: 100,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-natural"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./images/green_socks.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./images/blue_socks.jpg"
            },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        cart: 0
        },
    methods: {
        addToCart: function(){
            this.cart += 1
        },
        updateProduct: function (variantImage){
            this.image = variantImage
        },
        removeFromCart: function(){
            this.cart -= 1
        }
    }
});