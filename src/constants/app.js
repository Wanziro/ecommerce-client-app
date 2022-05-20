const APP_MODE = 'dev'; //production or dev
const CONFIG = {
  dev: {
    backendUrl: 'http://192.168.43.55/RN/cyizere/client',
    imageUrl: 'http://192.168.43.55/RN/cyizere/uploads/products/',
    // backendUrl: 'http://192.168.1.94/RN/cyizere/supplier',
    // imageUrl:
    //   'http://192.168.1.94/RN/cyizere/supplier/uploads/products/',
  },
  production: {
    backendUrl: 'https://cyizere.rw/api/supplier',
    imageUrl: 'https://cyizere.rw/uploads/products/',
  },
};

module.exports = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
  imageUrl: CONFIG[APP_MODE].imageUrl,
};
