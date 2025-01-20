if (!localStorage.getItem("user")) {
  window.location.href = "../login.html";
}

import { useFetch } from "./request.js";
import { drawUiUser, uiChatuser } from "./ui.js";
let users = document.querySelector(".users");
let chat = document.querySelector("#message");
let chat_bg = document.querySelector(".chat_bg");
let logOut = document.getElementById("logoutBtn");
let messageForm = document.getElementById("messageForm");
let open_modal = document.getElementById("open_modal");
let close_modal = document.getElementById("close_modal");
let user = JSON.parse(localStorage.getItem("user"));
let getContact = document.getElementById("getContact");
let editProfile = document.getElementById("editProfile");
let openEditModal = document.getElementById("openEditModal");
let closed_modal = document.getElementById("closed_modal");
let search = document.getElementById("search");
let content_search = document.getElementById("content_search");
const request = useFetch();
function sideBarProfie(user) {
  document.getElementById("ownAvatar").src = user.img;
  document.getElementById("userInfoBottomName").textContent = user.username;
  document.getElementById("userTel").textContent = user.phone_number;
}

request({ url: `telgram/${user.id}` }).then((data) => getData(data));

function getData(data) {
  users.innerHTML = "";
  data?.contacts?.forEach((value) => {
    let user = document.createElement("div");
    user.innerHTML = drawUiUser(value);
    users.append(user);
  });
  let user_item = document.querySelectorAll(".user_item");
  user_item.forEach((element) => {
    element.addEventListener("click", () => {
      getOneUserID(element.id);
      getMessage(element.id);
    });
  });
}
function getOneUserID(id) {
  request({ url: `telgram/${id}` }).then((data) => {
    chat_bg.style.display = "none";
    headerData(data);
  });
}
function getMessage(id) {
  request({ url: `message` }).then((data) => {
    data = data.filter(
      (value) =>
        (value.user_id === user.id && value.recerved_id === id) ||
        (value.user_id === id && value.recerved_id === user.id)
    );
    chat.innerHTML = "";
    let ms = document.createElement("div");
    ms.innerHTML = uiChatuser(data, id, user.id);
    chat.append(ms);
    let sendMessage = (e) => {
      e.preventDefault();
      sendSms({
        data,
        text: messageForm.messageText.value, // input typeing.....
        recerved_id: id,
        id: user.id,
      });
    };
    messageForm.onsubmit = sendMessage;
  });
}

function headerData(user) {
  document.getElementById("circleAvatar").src = user.img;
  document.getElementById("centerUserName").textContent = user.username;
}
sideBarProfie(user);

logOut.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../login.html";
});

open_modal.addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});
close_modal.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

function sendSms({ data, text, id, recerved_id }) {
  if (text.trim() === "") {
    return;
  }
  const newMessage = { text, recerved_id, user_id: id };

  data.push(newMessage);
  chat.innerHTML = "";
  chat.innerHTML = uiChatuser(data, recerved_id, id);
  request({
    url: "message",
    method: "POST",
    data: newMessage,
  });
  messageForm.messageText.value = "";
}

getContact.addEventListener("submit", (e) => {
  e.preventDefault();
  let phone_number = getContact.phone_number.value;
  request({ url: "telgram" }).then((data) => {
    if (user.phone_number === phone_number) {
      return alert("Siz ozingizni qo'sha olmaysiz");
    }

    let findData = data.find((value) => value.phone_number === phone_number);

    if (!findData) {
      return alert("Unday foydalunchi hali ro'yxatdan o'tmagan");
    }
    if (user.contacts.find((value) => value.phone_number === phone_number)) {
      return alert("Bunday contact mavjud !");
    }
    let newData = { ...user, contacts: [...user.contacts, findData] };
    console.log(newData);
    request({ url: `telgram/${user.id}`, method: "PUT", data: newData }).then(
      (data) => {
        getData(data);
        localStorage.setItem("user", JSON.stringify(data));
        document.getElementById("modal").style.display = "none";
      }
    );
  });
});

function editProfileValue() {
  document.getElementById("avatarImg").src = user.img;
  editProfile.editName.value = user.username;
  editProfile.editPhone.value = user.phone_number;
  editProfile.editPassword.value = user.password;
}
editProfileValue();
openEditModal.addEventListener("click", () => {
  document.getElementById("editModal").classList.toggle("hidden");
});
closed_modal.addEventListener("click", () => {
  document.getElementById("editModal").classList.add("hidden");
  console.log("salom");
});

editProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  let img = editProfile.img.files[0];
  let username = editProfile.editName.value;
  let phone_number = editProfile.editPhone.value;
  let password = editProfile.editPassword.value;
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    img = e.target.result;

    request({
      url: `telgram/${user.id}`,
      method: "PUT",
      data: { img, username, password, phone_number },
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      sideBarProfie(data);
      document.getElementById("editModal").classList.add("hidden");
    });
  };
  fileReader.readAsDataURL(img);
});

let timeoutId;

function debounce(value) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    getUsersSarch(value);
  }, 500);
}

search.addEventListener("keyup", (e) => {
  debounce(e.target.value);
});

search.addEventListener("focus", () => {
  document.getElementById("search-modal").classList.remove("hidden");
});

function getUsersSarch(value) {
  request({ url: "telgram" }).then((data) => {
    console.log();
    const findData = data.filter(
      (item) =>
        item.username.toLowerCase().includes(value.toLowerCase()) &&
        user.id !== item.id
    );
    content_search.innerHTML = "";
    if (!findData.length) {
      content_search.innerHTML = "User not found";
    } else {
      findData.forEach((value) => {
        let div = document.createElement("div");
        div.classList.add("mb-5");
        div.innerHTML = drawUiUser(value);
        content_search.append(div);
      });
    }
  });
}
