/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "rr-clean",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const helloFunction = new sst.aws.Function("HelloFunction", {
      handler: "handler.hello",
      runtime: "nodejs20.x",
      url: true,
    });

    const web = new sst.aws.React("MyWeb", {
      environment: {
        HELLO_FUNCTION_URL: helloFunction.url,
      },
    });

    return {
      functionUrl: helloFunction.url,
    };
  },
});
