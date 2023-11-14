const logErrorOccurred = (filePath:any, err:any) => {
    console.log(filePath);
    console.log("Inside Catch ************* Problem:" + err.message);
    console.log("Inside Catch ************* Problem:" + err.stack);
    console.log("Inside Catch ************* Problem:" + err);
  };
  export default logErrorOccurred