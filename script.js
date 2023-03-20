class Product {tProductsFromApi
  constructor(title, description, price, image) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

// some variables xd
let Cart = [];
let Products = [];
let ProductsJson = [];
let ProductsLastSearched = [];
let ProductsInCart = [];
let Searchinput = "";
GetProductsFromApi();

function GetProductsFromApi() {
  $.ajax({
    url: "https://fakestoreapi.com/products",
    type: "GET",

    success: function (data) {
      data.forEach((element) => {
        let product = new Product(
          element.title,
          element.description,
          element.price,
          element.image
        );
        ProductsJson.push(element);
        Products.push(product);
      });
    },

    // Error handling
    error: function (error) {
      console.log("Dupa niestety");
    },
  });
}
function GetAllProducts() { 
      CreateProductsTableBody(Products);
}
function Test() {
  alert("no i po co ci to?");
}
function SearchProducts() {
  const input = document.getElementById("search-input");
  const searchInp = document.querySelector("#search-input");
  const filter = searchInp.value.toLowerCase().trim();

  searchInput = filter.toLowerCase().replace(/\s+/g, "")
  CreateProductsTableBody(Products, searchInput);
}
function CreateProductsTableBody(Data, filtr = true) {
  let tableData = "";
  if (filtr != true) {
    Data.forEach((element) => {
      if (element.title.toLowerCase().replace(/\s+/g, "" ).includes(filtr.toLowerCase().replace(/\s+/g, ""))
      || element.description.toLowerCase().replace(/\s+/g, "").includes(filtr.toLowerCase().replace(/\s+/g, ""))) {
        
        tableData += `<tr>
            <td class="row-data">${element.title}</td>
            <td class="row-data">${element.description}</td>
            <td class="row-data">${element.price}</td>
            <td><img src="${element.image}" style="width:100px;" /></td>
            <td><button class="btnSelectAdd btn btn-success" onclick="AddToCart()">Zapisz</button>
                 <button class="btnSelectRemove btn btn-danger" style="margin-top: 25px;" onclick="DeleteFromCart()">Usuń</button></td>
          </tr>`;
      }
      
      let searchBar = `<div class="container-fluid text-white py5" style="background-color: #1d2630,margin">
      <h1 class="text-center" style="font-weight: 560;color:#1d2630">Wyszukiwarka</h1>
      <h5 class="text-center" style="color:darkgray">Sprawdź dostępność produktu</h5>
  </div>
  
  <div class="container col-6 mt-5">
      <input type="text" class="form-control mb-5 p-3" placeholder="Wyszukaj co chcesz...." id="search-input">
      <button class="btn btn-dark"  onclick="SearchProducts()">Wyszukaj</button>
  </div>`
        
    let content = ``;
    if(tableData != "") {
     content = `${searchBar}
                    <br><div class="container">
                    <table class="table table-bordered" id="products_table">
                    <thead class="table-dark" style="background">
                    <tr>
                        <th scope="col"  onclick="sort(1)">Tytuł</th>
                        <th scope="col"  onclick="sort(2)">Opis</th>
                        <th scope="col"  onclick="sort(3)">Cena</th>
                        <th scope="col" >Zdjęcie</th>
                        <th scope="col" >Baza Danych</th>
                    </tr>
                    </thead>
                    <tbody style="background-color: white;">
                    ${tableData}
                    </tbody>
                    </table>
                    </div>`;
    }
    else {
      content = `${searchBar}<br><div class="container" style="background-color: white; width: 800px;">
      <h2><strong>Podana fraza nie występuje w tytule ani opisie!</strong></h2>
      </div>`;
    }

      document.getElementById("content").innerHTML = content;
    });
  } else {
    Data.forEach((element) => {
      let tmp = 0;
      tableData += `<tr>
            <td class="row-data">${element.title}</td>
            <td class="row-data">${element.description}</td>
            <td class="row-data">${element.price}</td>
            <td><img src="${element.image}" style="width:100px;" /></td>
            <td><button class="btnSelectAdd btn btn-success" onclick="AddToCart()">Zapisz</button>
                 <button class="btnSelectRemove btn btn-danger" style="margin-top: 25px;" onclick="DeleteFromCart()">Usuń</button></td>
          </tr>`;
    });
    let content = `
                    <div class="container">
                    <strong style="font-size:60px;">To wszystkie produkty!</strong>
                    <table class="table table-bordered" id="products_table">
                    <thead class="table-dark" style="background">
                    <tr>
                        <th scope="col" onclick="sort(4)">Tytuł</th>
                        <th scope="col" onclick="sort(5)">Opis</th>
                        <th scope="col" onclick="sort(6)">Cena</th>
                        <th scope="col">Zdjęcie</th>
                        <th scope="col">Baza Danych</th>
                    </tr>
                    </thead>
                    <tbody style="background-color: white;">
                    ${tableData}
                    </tbody>
                    </table>
                    </div>`;

      document.getElementById("content").innerHTML = content;
  }
}
function sort(n) {
    // sortowanie po tytule (dla wyszukiwania)
    if(n == 1) {  
      let productsTmp = Products.sort((a, b) => a.title.localeCompare(b.title));
      CreateProductsTableBody(productsTmp, searchInput);
      ProductsReset();
    }

    // sortowanie po opisie (dla wyszukiwania)
    if(n == 2) {      
      let productsTmp = Products.sort((a, b) => a.description.localeCompare(b.description));
      CreateProductsTableBody(productsTmp, searchInput);
      ProductsReset();
    }

    // sortowanie po cenie (dla wyszukiwania)
    if(n == 3) {
      let productsTmp = Products.sort((a, b) => a.price - b.price);
      CreateProductsTableBody(productsTmp, searchInput);
      ProductsReset();
    }

    // sortowanie po tytule
    if(n == 4) {
      let productsTmp = Products.sort((a, b) => a.title.localeCompare(b.title));
      CreateProductsTableBody(productsTmp);
      ProductsReset();
    }

    // sortowanie po opisie
    if(n == 5) {
      let productsTmp = Products.sort((a, b) => a.description.localeCompare(b.description));
      CreateProductsTableBody(productsTmp);
      ProductsReset();
    }

    // sortowanie po cenie
    if(n == 6) {
      let productsTmp = Products.sort((a, b) => a.price - b.price);
      CreateProductsTableBody(productsTmp);
      ProductsReset();
    }
}
function DeleteFromCart() {
  $(document).ready(function(){
    // code to read selected table row cell data (values).
    $(".btnSelectRemove").on('click',function(){
       var currentRow=$(this).closest("tr");
       var col1=currentRow.find("td:eq(0)").html();
       var col2=currentRow.find("td:eq(1)").html();
       var col3=currentRow.find("td:eq(2)").html();
       var data=col1+"\n"+col2+"\n"+col3;

       var found = ProductsJson.find(element => element.title == col1);
       for (let i = 0; i <ProductsInCart.length; i++) {
            if(ProductsInCart[i].title == col1)
            {
              var tmp = ProductsInCart.indexOf(i+1);
              const x = ProductsInCart.splice(tmp, 1);
              alert("Zabrano produkt z koszyka!!");
            }
       }
    });
  });
}
function AddToCart() {
  $(document).ready(function(){
    // code to read selected table row cell data (values).
    $(".btnSelectAdd").on('click',function(){
       var currentRow=$(this).closest("tr");
       var col1=currentRow.find("td:eq(0)").html();
       var col2=currentRow.find("td:eq(1)").html();
       var col3=currentRow.find("td:eq(2)").html();
       var data=col1+"\n"+col2+"\n"+col3;
       alert("Dodano produkt do koszyka!!");

       var found = ProductsJson.find(element => element.title == col1);
       ProductsInCart.push(found);
    });
  });
}
function ProductsReset() {
  Products.splice(0,Products.length-1);
  GetProductsFromApi();
}
function DisplayCartInConsole() {
  ProductsInCart.forEach(element => {
    console.log(element.title);
  });
}
function GenerateMyCart() {
  if(ProductsInCart[0]!=null)
  CreateProductsTableBody(ProductsInCart);
}

// function filterList() {
//   const input = document.getElementById("search-input");
//   const searchInp = document.querySelector("#search-input");
//   const filter = searchInp.value.toLowerCase().trim().replace(/\s+/g, "");
  
//   console.log(filter);
//   //CreateProductsTableBody(Products, filter.toLowerCase().replace(/\s+/g, ""));

//   //element.title.toLowerCase().replace(/\s+/g, "").includes(filter.toLowerCase().replace(/\s+/g, ""));
// }

/// ----------------------------------------------------------- Przerwa ----------------------------------------------------///


// document.getElementById("all-products-table").style.visibility="hidden"

// function GetAllProducts() {
//     $.ajax({
//             url: 'https://fakestoreapi.com/products',
//             type: "GET",

//             success: function (data) {
//                     console.log(data[0].title);
//                     let tableData="";
//                     data.map((values) => {
//                                    tableData += `<tr>
//                                                      <td>${values.title}</td>
//                                                      <td>${values.description}</td>
//                                                      <td>${values.price} $</td>
//                                                      <td><img src="${values.image}" style="width:100px;" /></td>
//                                                      <td><button class='btn btn-success'onclick='Test()'>Zapisz</button>\n
//                                                      <button class='btn btn-warning' style="margin-top: 30px" onclick='Test()'>Edytuj</button>
//                                                      <button class='btn btn-danger' style="margin-top:30px;" onclick='Test()'>Usuń</button></td>
//                                                 </tr>`;
//                                 })

//                     document.getElementById("table_body").innerHTML=tableData;
//                     document.getElementById("all-products-table").style.visibility="visible"
//             },

//             // Error handling
//             error: function (error) {
//                     console.log("Dupsko");
//             }
//     });
// }

// function Test() {
//     alert(1);
// }
