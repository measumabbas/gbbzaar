class CustomError extends Error {
    constructor(name,args){
        super(args);
        this.name = name
    }
}


module.exports = CustomError