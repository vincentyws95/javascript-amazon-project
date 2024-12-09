/*
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev");
xhr.send();
*/

//18a XMLHttpRequest
/*
const greeting = new XMLHttpRequest();

greeting.addEventListener("load", () => {
  console.log(greeting.response);
});

greeting.addEventListener("error", (err) => {
  console.log("Caught err", err);
});

greeting.open("GET", "https://supersimplebackend.dev/greeting");
// greeting.send();
*/

//18b fetch

/*
fetch("https://supersimplebackend.dev/greeting")
  .then((response) => response.text())
  .then((data) => console.log(data));
*/

//18c async await with fetch

// async function fetchAsync() {
//   const res = await fetch("https://supersimplebackend.dev/greeting");

//   const data = await res.text();

//   console.log(data);
// }

//  fetchAsync();

//18d async await fetch POST

async function fetchAsync(requestBody) {
  try {
    const res = await fetch(
      "https://supersimplebackend.dev/greeting",
      requestBody
    );

    if (res.status === 200) console.log(res);
    else {
      throw res;
    }
    // const data = await res.json();
  } catch (err) {
    if (err.status === 400) console.log("fetchAsync2 err:", await err.json());
    else console.log("Network error. Please try again later");
  }
}

/*
fetchAsync({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "vincent",
  }),
});
*/

fetchAsync({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

/*
fetch("https://amazon.com").catch((err) => {
  console.log("CORS error. Your request was blocked by the backend", err);
});
*/
