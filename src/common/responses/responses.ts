function successWithData(data: any): any {
  return {
    statusCode: 200,
    data: data,
  };
}

function successWithMessage(message: string): any {
  return {
    statusCode: 200,
    message: message,
  };
}

function error(statusCode: number, message: string, data: Array<any>): any {
  return {
    statusCode: statusCode,
    message: message,
    errors: data,
  };
}

export { successWithData, successWithMessage, error };
