async function fetchData() {
  let companyName = document.getElementById("search_box").value;

  let loader = document.getElementById("loader");
  loader.style.display = "block";

  console.log(companyName);
  
  let requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  let response;

  await fetch(
    `http://localhost:5000/getData?query_param=${companyName}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => (response = JSON.parse(result)))
    .catch((error) => console.log("error", error));

  console.log(response);

  const keys = Object.keys(response);

  console.log(keys);

  const CB = document.getElementById("content-box");
  CB.innerHTML = "";
  keys.forEach((key) => {
    const div = document.createElement("div");
    div.setAttribute(
      "class",
      "flex flex-col items-start sm:max-w-6xl sm:mx-auto space-y-4 px-5 mb-10"
    );
    div.setAttribute("id", key);

    // {
    key == "google"
      ? (div.innerHTML = '<img src="/google.png" class="h-10" />')
      : key == "twitter"
      ? (div.innerHTML = '<img src="/twitter.png" class="h-10" />')
      : (div.innerHTML = '<img src="/crunchbase.png" class="h-10" />');
    // }

    const div2 = document.createElement("div");
    div2.setAttribute("class", "flex flex-col  items-start space-y-4");

    const div3 = document.createElement("div");
    div3.setAttribute("class", "w-full border p-2 border-gray-100 rounded-md");

    response[key].forEach((element) => {
      div3.innerHTML += `<a href="${element}" target="_blank" class="text-blue-500 hover:underline break-words block w-80 sm:w-full">
          • ${element}
        </a>`;
    });

    div2.appendChild(div3);

    div.appendChild(div2);

    CB.appendChild(div);
  });

  loader.style.display = "none";
}


document.addEventListener("DOMContentLoaded", function () {


  document
    .getElementById("search_box")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.key === "Enter") {
     
        fetchData();
      }
    });

});
