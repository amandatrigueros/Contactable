import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import { login } from "../services/session-services.js";

function render() {
  //   const { loginError } = this.state;
  return `
    <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">Login</h1>
        <form class="flex flex-column gap-4 mb-4 js-login-form">

          ${input({
            label: "email",
            id: "email",
            name: "email",
            placeholder: "jhon@example.com",
            type: "email",
            required: true,
            // value: "test3@mail.com",
          })}


          ${input({
            label: "password",
            id: "password",
            name: "password",
            placeholder: "********",
            type: "password",
            required: true,
            // value: "123456",
          })}

          <button class="button button--primary">Login</button>
        </form>
        <a href="#" class="block text-center js-signup-link">Sign up</a>
      </section>
    </main>
  `;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const { email, password } = event.target.elements;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      const user = await login(credentials);
      //   STORE.user = user;
      //   await STORE.fetchCategories();

      console.log(user);
    } catch (error) {
      this.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}

const LoginPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
