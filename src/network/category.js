import request from './network'


export default{ 
  getCategory() {
    return request({
      url: '/category'
    })
  }, 

  getSubcategory(maitKey) {
    return request({
      url: '/subcategory',
      params: {
        maitKey
      }
    })
  }, 
  
  getCategoryDetail(miniWallkey, type) {
    return request({
      url: '/subcategory/detail',
      params: {
        miniWallkey,
        type
      }
    })
  }
} 


export function 
