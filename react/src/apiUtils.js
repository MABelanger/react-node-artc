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

export function postData(url = ``, data = []) {
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

// https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
export function handleDownload (fileName, data) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    let json = JSON.stringify(data);
    let blob = new Blob([json], {type: "octet/stream"});
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

export function handlePost(jsonName, data) {
  const url = '/' + jsonName;
  postData(url, data)
    .then((response) => {
      console.log('bibi ok')
    }) // JSON-string from `response.json()` call
    .catch((error) => {
      console.error(error)
    });
}
