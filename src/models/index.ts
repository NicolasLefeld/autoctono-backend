import Customer from "./Customer";
import ProductSale from "./ProductSale";
import Sale from "./Sale";

// Inicializar relaciones entre los modelos
const initModels = () => {
    Customer.associate();
    Sale.associate();
    ProductSale.associate();
};

export { initModels };
