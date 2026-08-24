const defaultProducts=[
{id:1,name:"100 eFootball Coins",price:80,active:true},
{id:2,name:"200 eFootball Coins",price:150,active:true},
{id:3,name:"500 eFootball Coins",price:350,active:true}
];
function getProducts(){return JSON.parse(localStorage.getItem("products")||"null")||defaultProducts}
function saveProducts(p){localStorage.setItem("products",JSON.stringify(p))}
function renderProducts(){
 const box=document.getElementById("products"); box.innerHTML="";
 getProducts().filter(p=>p.active).forEach(p=>{
  box.innerHTML+=`<article class="product-card"><h3>⚽ ${p.name}</h3><p>eFootball Coin Top Up</p><div class="price">৳${p.price}</div><button class="primary" onclick="openOrder(${p.id})">Buy Now</button></article>`
 })
}
function openOrder(id){
 const p=getProducts().find(x=>x.id===id); if(!p)return;
 document.getElementById("selectedProduct").innerHTML=`<div class="product-card"><b>${p.name}</b><div class="price">৳${p.price}</div></div>`;
 document.getElementById("modal").classList.remove("hidden"); document.getElementById("orderForm").dataset.productId=id;
}
function closeOrder(){document.getElementById("modal").classList.add("hidden")}
document.getElementById("orderForm")?.addEventListener("submit",e=>{
 e.preventDefault();
 const id=Number(e.target.dataset.productId),p=getProducts().find(x=>x.id===id);
 const order={id:Date.now(),product:p.name,price:p.price,userId:document.getElementById("userId").value,name:document.getElementById("customerName").value,phone:document.getElementById("phone").value,payment:document.getElementById("payment").value,trx:document.getElementById("trx").value,status:"Pending",created:new Date().toLocaleString()};
 const orders=JSON.parse(localStorage.getItem("orders")||"[]"); orders.unshift(order); localStorage.setItem("orders",JSON.stringify(orders));
 alert("অর্ডার গ্রহণ করা হয়েছে।"); e.target.reset(); closeOrder();
});
renderProducts();