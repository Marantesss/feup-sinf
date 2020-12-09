

//Assumes it gets an item in the  array return in   /materialscore/materialsitems
const getStockQuantity = (item) => {

    return item.materialsItemWarehouses.reduce((accumulator, currValue) => {
        accumulator += currValue.stockBalance;
        return accumulator;
    }, 0);

}



module.exports = {
    getStockQuantity


}