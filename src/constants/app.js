const APP_MODE = 'dev'; //production or dev
const CONFIG = {
  dev: {
    backendUrl: 'http://192.168.1.70/RN/cyizere/client',
    productImageUrl: 'http://192.168.1.70/RN/cyizere/uploads/products/',
    // backendUrl: 'http://192.168.1.94/RN/cyizere/supplier',
    // productImageUrl:
    //   'http://192.168.1.94/RN/cyizere/supplier/uploads/products/',
  },
  production: {
    backendUrl: 'https://cyizere.rw/api/supplier',
    productImageUrl: 'https://cyizere.rw/uploads/products/',
  },
};

module.exports = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
  productImageUrl: CONFIG[APP_MODE].productImageUrl,
};
