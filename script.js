let unspashJson;
let page = 1;
var query = "nice";
let loading = false;

// const new = JrHjw4NH-IvdN-TNILP3E6beTnyOEwWRx-JMG2oshvk

const api = "wuq1Fw10R6HLmkRHRy-aMA1Dqn2iBxRHWOF_RG8X_H8";

const images = document.getElementById("image-collection");

const onSearch = async (query, page) => {
  console.log(query);
  console.log(page);
  fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${api}`
  ).then((res) =>
    res.json().then((res) => {
      console.log(res);
      unspashJson = res;

      if (unspashJson.results.length === 0) {
        console.log("no results found");
        const single = images.appendChild(document.createElement("div"));
        const desc = single.appendChild(document.createElement("p"));
        desc.innerHTML = "no results found";
        desc.classList = "image-desc";
      }

      unspashJson.results.map((image) => {
        const single = images.appendChild(document.createElement("div"));
        const imageUrl = single.appendChild(document.createElement("img"));
        const desc = single.appendChild(document.createElement("p"));

        imageUrl.src = image.urls.regular;
        desc.innerHTML = image.alt_description;
        imageUrl.classList = "image";
        desc.classList = "image-desc";
        single.classList = "single-container";
        loading = false;
      });
    })
  );
};

document
  .getElementById("search")
  .addEventListener("click", () =>
    onSearch(document.getElementById("query").value)
  );

const mySubmitFunction = (e) => {
  e.preventDefault();
  return false;
};

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const callApi = () => {
  page = 0;
  images.innerHTML = "";
  query = document.getElementById("query").value;
  onSearch(query, page);
};

const textChange = debounce(() => callApi());

onSearch(query, 1);

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 200
  ) {
    if (loading === false) {
      page++;
      onSearch(query, page);
    }
    loading = true;
  }
});
