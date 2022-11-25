import {
  getEmailConfirmVerified,
  postEmailConfirmSend,
  postSignIn
} from "../../apis/index.js";
import Form from "../../components/Form/Form.js";
import Toast from "../../components/Toast/Toast.js";
import Component from "../../core/Component.js";
import {
  validateEmail,
  validateName,
  validatePasswordConfirm,
  validatePassword,
  qs,
  validateEmailVerified
} from "../../utils/index.js";
import style from "./signIn.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class SignIn extends Component {
  template() {
    return `<div id="signin_contaniner">
            <div id="signin_section">
            <H1>회원가입</H1>
            <div id="signin-form_section"></div>
            <button class="signin_signin_btn form_btn">회원가입</button>
            </div>
            </div>
            `;
  }

  setup() {
    this.state = { isEmailConfirmVerified: false };
  }

  mounted() {
    const formChildren = [
      {
        id: "name",
        title: "성함",
        type: "text"
      },
      {
        id: "email",
        title: "이메일",
        type: "text"
      },
      {
        id: "emailConfirmSend",
        title: "인증코드 발송",
        type: "button"
      },
      {
        id: "emailConfirm",
        title: "인증코드 입력",
        type: "text"
      },
      {
        id: "emailConfirmVerified",
        title: "인증확인",
        type: "button"
      },
      {
        id: "password",
        title: "비밀번호",
        type: "password"
      },
      {
        id: "passwordConfirm",
        title: "비밀번호 확인",
        type: "password"
      }
    ];
    new Form(qs("#signin-form_section"), { formChildren });
  }

  setEvent() {
    qs(".form-email_container").classList.add("form_input-margin-none");
    qs(".form-emailConfirm_container").classList.add("form_input-margin-none");

    qs(".signin_signin_btn").addEventListener("click", e => {
      this.handleSignIn(e);
    });

    qs(".form-emailConfirmSend-btn").addEventListener("click", e => {
      this.handleEmailConfirmSend(e);
    });

    qs(".form-emailConfirmVerified-btn").addEventListener("click", e => {
      this.handleEmailConfirmVerified(e);
    });
  }

  handleSignIn(e) {
    e.preventDefault();

    if (
      validateName(qs("#name")) &&
      validateEmail(qs("#email")) &&
      validatePassword(qs("#password")) &&
      validatePasswordConfirm(qs("#password"), qs("#passwordConfirm")) &&
      validateEmailVerified(
        this.state.isEmailConfirmVerified,
        qs("#emailConfirm")
      )
    ) {
      postSignIn(Form.getFormData());
    }
  }

  async handleEmailConfirmSend(e) {
    e.preventDefault();
    if (validateEmail(qs("#email"))) {
      const email = qs('[name="email"]');
      const response = await postEmailConfirmSend(email.value);
      if (response.message === "fail") {
        new Toast("이미 가입된 이메일입니다.");
      } else {
        new Toast("인증코드가 이메일로 발송되었습니다.");
      }
    }
  }

  async handleEmailConfirmVerified(e) {
    e.preventDefault();
    const email = qs('[name="email"]');
    const emailConfirm = qs('[name="emailConfirm"]');
    const response = await getEmailConfirmVerified(
      email.value,
      emailConfirm.value
    );
    if (response.message === "fail") {
      new Toast("인증코드가 잘못되었습니다.");
    } else {
      new Toast("인증되었습니다.");
      this.setState({ isEmailConfirmVerified: true });
      email.setAttribute("readonly", true);
      emailConfirm.disabled = true;
      qs(".form-emailConfirmVerified-btn").disabled = true;
      qs(".form-emailConfirmSend-btn").disabled = true;
    }
  }
}
