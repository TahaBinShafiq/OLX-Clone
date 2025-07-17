let cardElement = document.getElementById("cards");


async function getData() {
    let response = await fetch('https://dummyjson.com/products');
    let data = await response.json();
    console.log(data)
    let {products} = data
    products.map((product) => {

        let {title , description , category , images , price} = product;

        cardElement.innerHTML += `  <div class="card">
            <div class="badge">HOT SALE</div>
            <div class="tilt">
                <div class="img"><img
                        src="${images[0]}"
                        alt="Premium Laptop"></div>
            </div>
            <div class="info">
                <div class="cat">${category}</div>
                <h2 class="title">${title}</h2>
                <p class="desc">${description}</p>
                <div class="bottom">
                    <div class="price">
                        <span class="new">${price}</span>
                    </div>
                    <button class="btn">
                        <span>Add to Cart</span>
                        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
`

    })

}

getData();