const SUPABASE_URL = "https://spwhqftndqntkgqjczil.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZJYOQTotkhcF7Zlaeypx4w_L2gNHaya";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const defaultProducts = [
    { id: 1, name: "100 eFootball Coins", price: 80, active: true },
    { id: 2, name: "200 eFootball Coins", price: 150, active: true },
    { id: 3, name: "500 eFootball Coins", price: 350, active: true }
];

function getProducts() {
    return JSON.parse(localStorage.getItem("products") || "null") || defaultProducts;
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
    const box = document.getElementById("products");

    if (!box) return;

    box.innerHTML = "";

    getProducts()
        .filter(p => p.active)
        .forEach(p => {
            box.innerHTML += `
                <article class="product-card">
                    <h3>⚽ ${p.name}</h3>
                    <p>eFootball Coin Top Up</p>
                    <div class="price">৳${p.price}</div>

                    <button
                        class="primary"
                        onclick="openOrder(${p.id})">
                        Buy Now
                    </button>
                </article>
            `;
        });
}

function openOrder(id) {
    const product = getProducts().find(p => p.id === id);

    if (!product) return;

    document.getElementById("selectedProduct").innerHTML = `
        <div class="product-card">
            <b>${product.name}</b>
            <div class="price">৳${product.price}</div>
        </div>
    `;

    document
        .getElementById("modal")
        .classList.remove("hidden");

    document
        .getElementById("orderForm")
        .dataset.productId = id;
}

function closeOrder() {
    document
        .getElementById("modal")
        .classList.add("hidden");
}


/* =========================
   SUPABASE ORDER SUBMIT
========================= */

document.getElementById("orderForm")?.addEventListener("submit", async (e) => {

    e.preventDefault();

    const productId = Number(e.target.dataset.productId);

    const product = getProducts().find(
        p => p.id === productId
    );

    if (!product) {
        alert("Product পাওয়া যায়নি।");
        return;
    }

    const customerName =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const playerId =
        document.getElementById("userId").value.trim();

    const paymentMethod =
        document.getElementById("payment").value;

    const transactionId =
        document.getElementById("trx").value.trim();


    if (!customerName || !phone || !playerId || !paymentMethod || !transactionId) {
        alert("সব তথ্য পূরণ করুন।");
        return;
    }


    /* Supabase orders table */

    const { data, error } = await supabaseClient
        .from("orders")
        .insert([
            {
                product_id: product.id,
                customer_name: customerName,
                customer_contact: phone,
                player_id: playerId,
                payment_method: paymentMethod,
                transaction_id: transactionId,
                status: "Pending"
            }
        ])
        .select();


    if (error) {

        console.error("Supabase Order Error:", error);

        alert(
            "অর্ডার জমা হয়নি।\n\n" +
            error.message
        );

        return;
    }


    console.log("Order created:", data);

    alert("✅ অর্ডার সফলভাবে গ্রহণ করা হয়েছে।");

    e.target.reset();

    closeOrder();

});


renderProducts();
