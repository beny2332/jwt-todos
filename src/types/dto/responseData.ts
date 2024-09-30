export default interface ResponseData<T> {
  err: boolean
  message?: string
  data?: T
  status?: number
}
