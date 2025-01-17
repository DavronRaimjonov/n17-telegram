import { useFetch } from "./request.js";
const loginForm = document.getElementById("loginForm");
const request = useFetch();
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newUserObj = {
    phone_number: loginForm.phone_number.value,
    password: loginForm.password.value,
  };
  loginFunction(newUserObj);
  loginForm.phone_number.value = "";
  loginForm.password.value = "";
});

function loginFunction(user) {
  request({ url: "telgram", method: "GET" }).then((data) => {
    let finData = data.find(
      (value) =>
        value.phone_number === user.phone_number &&
        value.password === user.password
    );
    if (!finData) {
      return alert("Phone Number or password wrong");
    }
    localStorage.setItem("user", JSON.stringify(finData));
    window.location.href = "../index.html";
  });
}
