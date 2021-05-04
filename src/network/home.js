import request from './network'

export default { 
  getMultiData() { 
    return request({ 
      url: '/home/multidata'
    })
  }, 
  getProductData(type, page) { 
    return request({ 
      url: '/home/data', 
      params: { 
        type, 
        page
      }
    })
  }
} 