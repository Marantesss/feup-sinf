

//Assumes it gets an item in the  array return in   /materialscore/materialsitems
const getStockQuantity = (item) => {

    return item.materialsItemWarehouses.reduce((accumulator, currValue) => {
        accumulator += currValue.stockBalance;
        return accumulator;
    }, 0);

}
    // Gets an average if for some reason the warehouses have a different unit price 
const getUnitPrice = (item) =>{
    return (item.materialsItemWarehouses.reduce((accumulator, currValue) => {
        accumulator += currValue.calculatedUnitCost.amount;
        return accumulator;
    }, 0) / item.materialsItemWarehouses.length);
}

///

module.exports = {
    getStockQuantity,
    getUnitPrice


}