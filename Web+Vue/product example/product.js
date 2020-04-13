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
        onSale: true
    }
});