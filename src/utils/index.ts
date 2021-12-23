
// 获取用户信息，判断用户登录
export const getCurrentUserInfo =() =>{
    let customer_infl_storage = localStorage.getItem('customer_infl') || ''
    if(customer_infl_storage){
       return  customer_infl_storage
    }
    return ''
}