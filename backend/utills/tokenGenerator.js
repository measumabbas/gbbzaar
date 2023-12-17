exports.generateRandomToken = ()=> {
    const tokenLength = 4;
    const min = Math.pow(10, tokenLength - 1);
    const max = Math.pow(10, tokenLength) - 1;
    const randomToken = Math.floor(Math.random() * (max - min + 1) + min);
  
    return randomToken.toString();
}