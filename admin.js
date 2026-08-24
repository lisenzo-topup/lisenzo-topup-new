function getProducts(){return JSON.parse(localStorage.getItem("products")||"null")||[{id:1,name:"100 eFootball Coins",price:80,active:true},{id:2,name:"200 eFootball Coins",price:150,active:true},{id:3,name:"500 eFootball Coins",price:350,active:true}]}
function saveProducts(p){localStorage.setItem("products",JSON.stringify(p))}
function render(){
 const ps=getProducts(),pb=document.getElementById("adminProducts"); pb.innerHTML="";
 ps.forEach((p,i)=>pb.innerHTML+=`<div class="admin-item"><span>${p.name} — ৳${p.price}</span><button onclick="removeProduct(${i})">Delete</button></div>`);
 const orders=JSON.parse(localStorage.getItem("orders")||"[]"),ob=document.getElementById("orders"); ob.innerHTML=orders.length?"":"<p class='muted'>কোনো order নেই</p>";
 orders.forEach(o=>ob.innerHTML+=`<div class="admin-item"><span><b>${o.product}</b><br>${o.name} • ${o.phone}<br>UID: ${o.userId}<br>TRX: ${o.trx}</span><span>${o.status}</span></div>`);
}
function removeProduct(i){const p=getProducts();p.splice(i,1);saveProducts(p);render()}
document.getElementById("productForm").addEventListener("submit",e=>{e.preventDefault();const p=getProducts();p.push({id:Date.now(),name:pName.value,price:Number(pPrice.value),active:true});saveProducts(p);e.target.reset();render()});
render();