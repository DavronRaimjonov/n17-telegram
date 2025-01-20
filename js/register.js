import { useFetch } from "./request.js";
import { loadingHTML } from "./ui.js";
const registerForm = document.getElementById("registerForm");
const request = useFetch();
const button = document.getElementById("register");

function loading(loading) {
  if (loading) {
    button.innerHTML = loadingHTML();
    button.disabled = true;
  } else {
    button.innerHTML = "Register";
    button.disabled = false;
  }
}
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newUser = {
    username: registerForm.username.value,
    phone_number: registerForm.phone_number.value,
    password: registerForm.password.value,
    img: "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1",
  };
  chekUserContact(newUser);
});

function chekUserContact(newUser) {
  loading(true);
  request({ url: "telgram" }).then((data) => {
    const findData = data.find(
      (value) => value.phone_number === newUser.phone_number
    );
    if (findData) {
      clearValue();
      return alert("Bunday raqam egasi mavjud");
    }
    postNewUser(newUser);
  });
}

function postNewUser(newUser) {
  loading(true);
  request({ url: "telgram", method: "POST", data: newUser })
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "../index.html";
      loading(false);

    })
    .catch((error) => {
      loading(false);
    });
}
function clearValue() {
  registerForm.username.value = "";
  registerForm.phone_number.value = "";
  registerForm.password.value = "";
}
