import { HttpRequest, HttpResponse } from '@interface/network/Http'
import { z, ZodType } from 'zod'
import { fromZodError } from 'zod-validation-error'

export default abstract class Controller<ReqSchema extends ZodType<any, any>, ResSchema extends ZodType<any, any, any>> {
  constructor(private requestSchema: ReqSchema, private outputSchema: ResSchema) {}

  abstract handleImplementation(request: z.infer<ReqSchema>): Promise<z.infer<ResSchema>>

  async handle(request: HttpRequest): Promise<HttpResponse<z.infer<ResSchema> | string>> {
    try {
      const parsedRequest = this.requestSchema.parse(request)
      const data = await this.handleImplementation(parsedRequest)
      const validatedData = this.outputSchema.parse(data)

      return {
        statusCode: 200,
        body: {
          status: 'success',
          data: validatedData
        }
      }
    } catch (e) {
      let errorMessage = 'An error occurred'
      if (e instanceof z.ZodError) {
        errorMessage = fromZodError(e).message
      } else if (e instanceof Error) {
        errorMessage = e.message
      }

      return {
        statusCode: 400,
        body: {
          status: 'error',
          data: errorMessage
        }
      }
    }
  }
}
