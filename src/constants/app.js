const APP_MODE = 'production'; //production or dev
const CONFIG = {
  dev: {
    backendUrl: 'http://192.168.43.55/RN/cyizere/supplier',
    productImageUrl:
      'http://192.168.43.55/RN/cyizere/supplier/uploads/products/',
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
