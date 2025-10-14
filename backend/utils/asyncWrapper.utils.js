

export default function asyncWrapper(receivedFunction)
{
    return function(req , res , next){

        Promise.resolve( receivedFunction(req , res , next)).catch( (err) => next(err));

    }   
}