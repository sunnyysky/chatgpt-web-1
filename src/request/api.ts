import {
  ProductInfo,
  RequesPrepay,
  RequestChatOptions,
  RequestImagesGenerations,
  RequestLoginParams,
  ResponseLoginData,
  SubscriptionInfo,
  TurnoverInfo,
  UserInfo
} from '@/types'
import request from '.'
import { formatTime } from '@/utils'
import { TableData } from '@/types/admin'

// 获取验证码
export function getCode(params: { source: string }) {
  return request.get('/api/send_sms', params)
}

// 登陆
export function postLogin(params: RequestLoginParams) {
  return request.post<ResponseLoginData>('/api/login', params)
}

// 获取用户信息
export function getUserInfo() {
  return request.get<UserInfo>('/api/user/info')
}

// 请求对话
export function postChatCompletions(
  params: RequestChatOptions,
  config?: {
    headers?: { [key: string]: any }
    options?: { [key: string]: any }
  }
) {
  return request.postStreams<Response>('/api/chat/completions', params, config)
}

// 请求绘画
export function postImagesGenerations(
  params: RequestImagesGenerations,
  headers?: { [key: string]: any },
  options?: { [key: string]: any }
) {
  return request.post<Array<{ url: string }>>(
    '/api/images/generations',
    { ...params },
    headers,
    options
  )
}

// 获取商品列表
export function getProduct() {
  return request.get< {
	products: Array<ProductInfo>,
	pay_types: Array<string>
  }>('/api/product')
}

// 获取用户消费记录
export function getUserTurnover(params: { page: number; pageSize: number }) {
  return request.get<{ count: number; rows: Array<TurnoverInfo> }>('/api/turnover', params)
}

// 提交订单
export function postPayPrecreate(params: RequesPrepay) {
  return request.post<{
    order_id: string
    pay_url: string
    pay_key: string
    qrcode?: string
  }>('/api/pay/precreate', params)
}

// 卡密充值
export function postUseCarmi(params: { carmi: string }) {
  return request.post('/api/use_carmi', params)
}

// 签到
export function postSignin() {
  return request.post('/api/signin')
}
