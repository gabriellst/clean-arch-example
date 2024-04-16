import { Controller } from '../controllers'

export interface HttpRequest {
  url: string
  headers?: Record<string, any>
  query?: Record<string, any>
  params?: Record<string, any>
  body?: Record<string, any>
  responseType?: string
}

interface ResponseBody<T> {
  status: 'success' | 'error'
  data: T
}

export interface HttpResponse<T> {
  statusCode: number
  body: ResponseBody<T>
}

export type HttpErrorResponse = HttpResponse<string>

export type HttpSuccessResponse<T> = HttpResponse<T>

export interface HttpClient {
  post: (request: HttpRequest) => Promise<HttpResponse<any>>
  get: (request: HttpRequest) => Promise<HttpResponse<any>>
}

export interface HttpRouter {
  on(path: string, method: string, controller: Controller<any, any>): Promise<void>
  listen(port: number): void
}
