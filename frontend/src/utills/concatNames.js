export const concatNames = (first,second)=>{
    if(!second){
        return first
    }
    return `${first} ${second}`
}