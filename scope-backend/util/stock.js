

//Assumes it gets an item in the  array return in   /materialscore/materialsitems


const getStockValue = (item) => {

    return item.materialsItemWarehouses.reduce((accumulator,currValue) =>{
        accumulator += (currValue.stockBalance * currValue.calculatedUnitCost.amount);
        return accumulator;
    }, 0);

}

const getItemInfo = (item) => {
    
    const info =  {};

    info.itemKey = item.itemKey;
    info.description = item.description;
    info.baseUnitDescription = item.baseUnitDescription;
    info.warehouses = [];

    
    item.materialsItemWarehouses.forEach(element => {
        const warehouse = {};
        
        warehouse.warehouseId = element.warehouseId;
        warehouse.warehouseDescription = element.warehouseDescription;
        warehouse.stock = element.stockBalance;
        warehouse.basePrice = element.calculatedUnitCost.amount;
        info.warehouses.push(warehouse);
    });
    



    return info
}



///

module.exports = {
    getStockValue,
    getItemInfo


}