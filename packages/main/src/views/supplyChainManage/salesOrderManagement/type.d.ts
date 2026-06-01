interface basicOrders {
    goodsList:basicGoodsInfo[],
    // 订购时间
    orderTime:string,
    // 付款时间
    paymentTime:string,
    // 买家指定配送时间
    buyerDeliveryTime:string,
    // 分单时间
    splitTime:string,
    // 发货时间
    deliveryTime:string,
    // 订单号
    orderNumber:string,
    // 销售额
    salesAmount:number,
    // 实付金额
    paidAmount:number,
    // 店铺名称
    shopName:string,
    // 订单状态
    orderStatus:string,
    // 订单类型
    orderType:string,
}
interface basicGoodsInfo {
    // 产品图片
    productImageUrl:string,
    goodsName:string,
    MSKU:string,
    itemId:string,
    productName:string,
    sku:string,
    productProperty:string,
    remark:string,
    prices:number,
    count:number,
    location:string,
    //寄往地点
    destination:string,
    // 指定物流
    shippingMethod:string,
    // 跟踪号
    trackingNumber:string, 
}

/**
 * 手动修改收件人信息
 */
export interface EditLocationInfo {
    orderCode:string,
    receiverAddressArea:string,
    receiverAddressCity:string,
    receiverAddressCountry:string,
    receiverAddressCountryCode:string,
    receiverAddressDetail1:string,
    receiverAddressHouseNumber:string,
    receiverAddressPostCode:string,
    receiverAddressState:string,
    receiverAddressStreet:string,
    receiverMobilePhone:string,
    receiverName:string,
    receiverPhone:string,
}