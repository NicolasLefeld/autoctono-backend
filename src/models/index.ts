import Customer from "./Customer";
import Product from "./Product";
import ProductSale from "./ProductSale";
import Sale from "./Sale";
import Stock from "./Stock";

// Inicializar relaciones entre los modelos
const initModels = () => {
    Customer.associate();
    Sale.associate();
    ProductSale.associate();
    Product.associate();
    Stock.associate();
};

export { initModels };
