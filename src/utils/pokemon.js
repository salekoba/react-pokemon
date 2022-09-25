export const getAllPokemon=(URL)=>{
    return new Promise((resolve,reject)=>{
        fetch(URL).then((res)=>res.json()).then((data)=>resolve(data));

    })

}

export const getPokemon = (URL) =>{
    return new Promise((resolve,reject) =>{
        fetch(URL).then((res)=>res.json()).then((data) =>
        {//console.log(data);
        resolve(data)});
    })

}