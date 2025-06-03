export class HelloController {
  async handle() {
    return {
      statusCode: 200,
      body: "HelloController successfully executed!",
    };
  }
}