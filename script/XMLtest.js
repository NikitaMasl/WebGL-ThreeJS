var URL ='https://jsonplaceholder.typicode.com/users';

function XMLtest(method, url){
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest;
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = () =>{
        if(xhr.status>=400){reject(xhr.response)}
        else{resolve(xhr.response)}
}
xhr.send();
    })
}

XMLtest('GET', URL)
    .then(date => console.log(date))
    .catch(err => console.log(err))
