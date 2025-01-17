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
        localStorage.setItem("user", JSON.stringify(data));
        document.getElementById("modal").style.display = "none";
      }
    );
  });
});

//  add memeber !
// register  !
//search
