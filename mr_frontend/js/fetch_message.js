let requestMessage = async (resolve,reject) => {

  //resolve
  resolve(
  fetch('http://localhost:3000/apiMessage',{
      method: 'GET' ,
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  }).then(function(response) {
      return response.json();
    }).then(function(message) {    
      return message;
    })
  )


  //reject
  reject("error! can't fetch message" );
}



let messagePromise = new Promise(requestMessage);

export let message =messagePromise.then(result=>{
  return result;
});