function calcTime(timestamp) {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second >= 0) return `${second}초 전`;
  else return "방금 전";
}

function renderData(data) {
  const main = document.querySelector("main");

  data
    .sort((a, b) => b)
    .forEach(async (obj) => {
      const itemListDiv = document.createElement("div");
      itemListDiv.className = "item-list";

      const imgDiv = document.createElement("div");

      imgDiv.className = "item-list__img";

      const img = document.createElement("img");
      const res = await fetch(`/images/${obj.id}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      img.src = url;

      const itemListInfoDiv = document.createElement("div");
      itemListInfoDiv.className = "item-list__info";

      const itemListInfoTitleDiv = document.createElement("div");
      itemListInfoTitleDiv.className = "item-list__info-title";
      itemListInfoTitleDiv.innerText = obj.title;

      const itemListInfoMetaDiv = document.createElement("div");
      itemListInfoMetaDiv.className = "item-list__info-meta";
      itemListInfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

      const itemListInfoPriceDiv = document.createElement("div");
      itemListInfoPriceDiv.className = "item-list__info-price";
      itemListInfoPriceDiv.innerText = obj.price;
      imgDiv.appendChild(img);
      itemListInfoDiv.appendChild(itemListInfoTitleDiv);
      itemListInfoDiv.appendChild(itemListInfoMetaDiv);
      itemListInfoDiv.appendChild(itemListInfoPriceDiv);
      itemListDiv.appendChild(imgDiv);
      itemListDiv.appendChild(itemListInfoDiv);
      main.appendChild(itemListDiv);
    });
}

const fetchList = async () => {
  const accessToken = window.localStorage.getItem("token");
  const res = await fetch("/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 401) {
    alert("로그인 필요");
    window.location.pathname = "frontend/login.html";
    return;
  }
  const data = await res.json();
  renderData(data);
};
fetchList();
