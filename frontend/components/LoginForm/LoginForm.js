import { postLogin } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { validateEmail, validatePassword, qs } from "../../utils/index.js";

class LoginForm extends Component {
  template() {
    return `<form id="loginForm" method="POST">
              <label for="email">이메일</label>
              <input type="text" id="email" name="email"/>
              <label for="password">비밀번호</label>
              <input type="password" id="password" name="password"/>
              <input type="submit" id="loginBtn" value="로그인"/>
            </form>
            <a href=https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=86c7682643aad4626e8d5822b0107da9&redirect_uri=http://kdt-sw3-team11.elicecoding.com/api/auth/kakao/callback>카카오 로그인</a>
            <button id="signInBtn">회원가입하기</button>
            <button id="logoutBtn">로그아웃하기</button>`;
  }

  setEvent() {
    qs("#signInBtn").addEventListener("click", () => {
      window.location = "/signin";
    });

    qs("#loginForm").addEventListener("submit", e => {
      this.handleLogin(e);
    });

    qs("#logoutBtn").addEventListener("click", e => {
      this.handleLogout(e);
    });
  }

  handleLogout(e) {
    e.preventDefault();

    function deleteCookie(token) {
      document.cookie = token + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    localStorage.removeItem("role");
  }

  handleLogin(e) {
    e.preventDefault();
    const [email, password] = Array.from(e.target).map(item => item.value);

    if (validateEmail(email) && validatePassword(password)) {
      const loginData = {
        email,
        password
      };
      postLogin(loginData);
    }
  }
}

export default LoginForm;
