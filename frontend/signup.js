const form = document.querySelector("#signup-form");

function checkPassword() {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");
  if (password1 === password2) {
    return true;
  }
  return false;
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);
  const div = document.querySelector("#info");
  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data === "200") {
      //   div.innerText = "회원가입에 성공했습니다.";
      //   div.style.color = "blue";
      alert("회원가입에 성공했습니다.");
      window.location.pathname = "frontend/login.html";
    }
  } else {
    div.innerText = "비밀번호가 같지 않습니다.";
    div.style.color = "red";
  }
};
form.addEventListener("submit", handleSubmit);