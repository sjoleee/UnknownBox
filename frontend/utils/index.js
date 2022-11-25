import Toast from "../components/Toast/Toast.js";

export function qs(selector) {
  return document.querySelector(selector);
}

export function qsAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export function isClassContained(dom, selector) {
  return dom.classList.contains(selector);
}

export function createDom(tagName, attr = {}, children = []) {
  const dom = document.createElement(tagName);

  for (let [key, value] of Object.entries(attr)) {
    dom[key] = value;
  }
  children.forEach(child => dom.append(child));

  return dom;
}

export const MODAL = {
  Form(attr, children) {
    return createDom("form", attr, children);
  },
  Input(attr) {
    return createDom("input", attr);
  },
  Span(attr, children) {
    return createDom("span", attr, children);
  },

  Div(attr, children) {
    return createDom("div", attr, children);
  },
  Textarea(attr, children) {
    return createDom("textarea", attr, children);
  }
};

export function createEditForm(elementList) {
  return MODAL.Form(
    {},
    elementList.map(({ className, title, attr = {} }) =>
      MODAL.Div({ className: className }, [
        MODAL.Span({}, [title]),
        MODAL.Input({ ...attr })
      ])
    )
  );
}

export function validateEmail(email) {
  const RegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!email.value) {
    new Toast("이메일 주소를 입력해주세요.");
    email.focus();
    return false;
  }
  if (!RegExp.test(email.value)) {
    new Toast("올바른 이메일 형식이 아닙니다.");
    email.focus();
    return false;
  }

  return true;
}

export function validateEmailVerified(isEmailConfirmVerified, targetInput) {
  if (!isEmailConfirmVerified) {
    new Toast("이메일을 인증해주세요.");
    targetInput.focus();
    return false;
  }

  return true;
}

export function validatePassword(password) {
  const RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  if (!password.value) {
    new Toast("비밀번호를 입력해주세요.");
    password.focus();
    return false;
  }
  if (!RegExp.test(password.value)) {
    new Toast("비밀번호는 8~16자의 영문자+숫자+특수문자로 입력해주세요.");
    password.focus();
    return false;
  }

  return true;
}

export function validateNewPassword(password, newPassword) {
  if (password.value === newPassword.value) {
    new Toast("현재 비밀번호와 다른 비밀번호를 입력해주세요.");
    newPassword.focus();
    return false;
  }

  return true;
}

export function validatePasswordConfirm(password, passwordConfirm) {
  if (!passwordConfirm.value) {
    new Toast("비밀번호 확인을 입력해주세요.");
    passwordConfirm.focus();
    return false;
  }
  if (password.value !== passwordConfirm.value) {
    new Toast("비밀번호가 일치하지 않습니다.");
    passwordConfirm.focus();
    return false;
  }

  return true;
}

export function validateName(name) {
  const RegExp = /^[가-힣]{2,15}$/;

  if (!name.value) {
    new Toast("성함를 입력해주세요.");
    name.focus();
    return false;
  }
  if (!RegExp.test(name.value)) {
    new Toast("올바른 성함을 입력해주세요.");
    name.focus();
    return false;
  }

  return true;
}

export function validatePhone(phone) {
  const RegExp = /^010[1-9][0-9]{3}[0-9]{4}$/;

  if (!phone.value) {
    new Toast("휴대전화 번호를 입력해주세요.");
    phone.focus();
    return false;
  }
  if (!RegExp.test(phone.value)) {
    new Toast("올바른 휴대전화 번호를 입력해주세요.");
    phone.focus();
    return false;
  }

  return true;
}

export function validateDetailAddress(detailAddress) {
  if (!detailAddress.value) {
    new Toast("상세주소를 입력해주세요.");
    detailAddress.focus();
    return false;
  }

  return true;
}
