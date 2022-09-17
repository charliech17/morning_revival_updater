let requestData = async (resolve,reject) => {

    //resolve process.env.UPDATEURL
    resolve(
    fetch(process.env.UPDATEURL,{
        method: 'GET' ,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(function(response) {
        return response.json();
      }).then(function(data) {
    
        return data.data;
      })
    )


    //reject
    reject("error! can't fetch data" );
}


let dataPromise = new Promise(requestData);


export let data = dataPromise.then(result =>{
  return result;
});