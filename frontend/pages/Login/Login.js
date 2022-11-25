import { postLogin } from "../../apis/index.js";
import Form from "../../components/Form/Form.js";
import Toast from "../../components/Toast/Toast.js";
import Component from "../../core/Component.js";
import { validateEmail, validatePassword, qs } from "../../utils/index.js";
import style from "./login.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class Login extends Component {
  template() {
    return `
    <div id="login_contaniner">
      <div id="login_section">
        <H1>로그인</H1>
        <div id="login-form_section"></div>
        <button class="login-signin_btn form_btn">아직 회원이 아니신가요?</button>
        <button class="login-login_btn form_btn">로그인</button>
        <button class="login-kakao-login_btn form_btn">카카오 로그인</button>
      </div>
    </div>`;
  }

  mounted() {
    const formChildren = [
      {
        id: "email",
        title: "이메일",
        type: "text"
      },
      {
        id: "password",
        title: "비밀번호",
        type: "password"
      }
    ];
    new Form(qs("#login-form_section"), { formChildren });
  }

  setEvent() {
    qs(".login-signin_btn").addEventListener("click", () => {
      window.location = "/signin";
    });

    qs(".login-login_btn").addEventListener("click", e => {
      this.handleLogin(e);
    });

    qs(".login-kakao-login_btn").addEventListener("click", () => {
      window.location =
        "https://kauth.kakao.com/oauth/authorize?client_id=6637eb959da098fc61370452cb5af5d1&redirect_uri=http://kdt-sw3-team11.elicecoding.com/api/auth/kakao/callback&response_type=code";
    });
  }

  async handleLogin(e) {
    e.preventDefault();

    if (validateEmail(qs("#email")) && validatePassword(qs("#password"))) {
      const response = await postLogin(Form.getFormData());
      new Toast(response.message);
    }
  }
}
