
const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list (options = {}) {
    const { offset = 0, limit = 25, tag} = options
    const data = await fs.readFile(productsFile)
  
    return JSON.parse(data)
    .filter(products => {
        if (!tag) {
           return products
        }
        return products.tags.find(( { title }) => title == tag)
      })
      .slice(offset, offset + limit) 
  }
async function get (id) {
    const products = JSON.parse( await fs.readFile(productsFile))
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i]
      }
    }
    return null;
}
async function deleteProduct(id) {
    console.log(`Product with ID ${id} deleted`);
    return { success: true };  
}
async function updateProduct(id, newProductData) {
    console.log(`Product with ID ${id} updated with data:`, newProductData);
    return { success: true };  
}


module.exports = {  
    list,
    get,
    deleteProduct,
    updateProduct
  }