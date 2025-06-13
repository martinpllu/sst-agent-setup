export const hello = async (event: any, context: any) => {
  console.log("hello from Lambda");
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello from Lambda!",
      timestamp: new Date().toISOString(),
      requestId: context.requestId,
    }),
  };
}; 