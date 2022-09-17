let requestMessage = async (resolve,reject) => {

  //resolve
  resolve(
  fetch(process.env.UPDATEURL,{
      method: 'GET' ,
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  }).then(function(response) {
      return response.json();
    }).then(function(message) {    
      return message.message;
    })
  )


  //reject
  reject("error! can't fetch message" );
}



let messagePromise = new Promise(requestMessage);

export let message =messagePromise.then(result=>{
  return result;
});