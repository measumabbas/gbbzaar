export const conditionalRender = (condition,first,second)=>{
    if(condition){
        return first
    }else{
        return second
    }
}