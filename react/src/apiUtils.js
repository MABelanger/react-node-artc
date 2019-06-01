export function promiseFetch(url){
  return fetch(url,{
    credentials: 'include'
  })
    .then(async (response)=>{
      try {
        let jsonResponse = await response.json()
        return Promise.resolve(jsonResponse)

      } catch(e) {
        console.log('subjects.json parsing error');
        return Promise.resolve([]);
      }
    })
}

export function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        credentials: 'include'
    })
    .then(response => response.json()); // parses response to JSON
}
