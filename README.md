<div align="center"><h1> UnknownBox </div>
<br>

<img width="1249" alt="image" src="https://user-images.githubusercontent.com/82137004/203984236-a2dba979-06ea-4fa2-a565-531bf57478bd.png">


## :heart_eyes: 프로젝트 개요

- 무엇이 나올지 모르는 랜덤한 상품을 뽑을 수 있는 랜덤박스 커머스 서비스에요 🎁
- 근본있는 개발경험을 쌓기 위해 바닐라 자바스크립트로 SPA를 구현했어요.
- 컴포넌트 단위로 개발하는 React의 작동 원리를 이해할 수 있었어요.

<br>
  
## :rainbow: 프로젝트 구조
```
📦frontend
 ┣ 📂apis // api 호출 함수를 한 곳에서 관리
 ┣ 📂assets // 로고, 아이콘 등
 ┣ 📂components // 컴포넌트를 한 곳에서 관리
 ┣ 📂constants // 개발에 필요한 각종 상수를 한 곳에서 관리
 ┣ 📂core // 각 컴포넌트의 기본 동작을 정의한 부모 class
 ┣ 📂pages // 총 21개의 페이지
 ┣ 📂router // 라우팅을 위한 페이지 컴포넌트 배열
 ┣ 📂store // localStorage를 다루는 함수 분리
 ┣ 📂styles // Global style을 정의
 ┣ 📂utils // 재사용할 함수를 한 곳에서 관리
 ┣ 📜App.js // 라우팅을 실행하는 함수
 ┗ 📜index.html // App.js와 연결
```
<br>

## :rocket: 기술 스택

- JavaScript
- HTML/CSS


<br>

## 🛠 작성한 주요 기능

### 담당 페이지 : 로그인, 회원가입, 마이페이지, 내 주문, 주문내역수정 

### router

페이지 이동 
| --- 
| ![Monosnap screencast 2022-11-21 18-43-38](https://user-images.githubusercontent.com/82137004/203986248-4d71422d-45f8-461d-849c-fcae9944033e.gif)


- 자세한 내용은 블로그에 기록하였습니다 👉 <a href="https://velog.io/@sjoleee_/VanillaJS-%EB%B0%94%EB%8B%90%EB%9D%BCJS%EB%A1%9C-SPA-%EC%BB%A4%EB%A8%B8%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0">[블로그 글 보러가기]</a>
```js
// frontend/App.js

// 개발자는 미리 pathname과 페이지 컴포넌트(console.log로 대체)를 배열로 구성합니다.
const routes = [
  { path: "/", view: ()=>{console.log("메인화면입니다.")} },
  { path: "/mypage", view: ()=>{console.log("마이페이지입니다.")} }
];

// 새로운 html을 불러오지 않고 뒤로가기와 앞으로가기를 구현하기 위해 history API를 사용했습니다.
// 뒤로가기와 앞으로가기시 발생하는 popstate 이벤트를 감지하여 라우팅을 실행합니다.
window.addEventListener("popstate", App);

// a tag를 click시 해당하는 href로 이동하기 위한 함수입니다.
const navigate = url => {
  window.history.pushState(null, null, url);
  App();
};

const App = async () => {
  
  // 위에서 선언한 routes 배열에서 현재 url path와 동일한 pathname을 가진 객체를 찾아 isMatch를 true로 할당합니다. 그리고 배열을 반환합니다.
  const pageMatches = routes.map(route => {
    return {
      route: route,
      isMatch: window.location.pathname === route.path,
    };
  });
 
  // 위에서 반환한 배열에서 isMatch가 true인 객체가 가리키는 페이지 컴포넌트를 실행합니다.
  let match = pageMatches.find(pageMatch => pageMatch.isMatch);
  match.route.view();
}

// DOM이 그려지면 콜백함수를 실행합니다.
document.addEventListener("DOMContentLoaded", () => {
  
  // click 이벤트가 발생하면, target에서 가장 가까운 a tag를 찾습니다.
  document.body.addEventListener("click", e => {
    const target = e.target.closest("a");
    
    // 없다면 함수를 종료합니다.
    if (!(target instanceof HTMLAnchorElement)) return;
    
    // a tag의 기본 동작을 막고, 페이지 이동을 위한 navigate 함수를 실행합니다.
    e.preventDefault();
    navigate(target.href);
  });
  
  App();
});
```
- 프로젝트에서 필수적인 router의 동작 방식을 정의하였습니다.
- 위 코드는 작동 원리를 설명하기 위한 코드입니다. 실제 프로젝트에 적용된 코드는 동적 라우팅, routes 배열 분리 등 추가 작업이 이루어진 상태입니다.
- 유저가 요청한 url path와 개발자가 지정한 pathname이 일치하면 해당하는 페이지 컴포넌트를 보여줍니다.
- 뒤로가기/앞으로가기는 popstate 이벤트를 감지하여 렌더링해주는 방식으로 구현하였습니다.
- click 이벤트 발생 시 해당하는 a tag를 찾아, href값으로 이동시키는 함수 navigate를 작성하였습니다.
- 위 내용에서 추가로, 정규표현식을 사용하여 동적 라우팅을 구현하였으며, localStorage를 사용하여 private route를 구현하였습니다.



### class Component

- 자세한 내용은 블로그에 기록할 예정입니다.

```js
// frontend/core/Component.js

// 모든 컴포넌트가 상속받아 사용하게 될 core Component class 작성
export default class Component {

  // 클래스필드 정의
  state;
  
  // target이 될 DOM 객체, 컴포넌트에서 사용할 props를 인수로 전달받음.
  constructor(target, props) {
    if (!target) throw new Error("no element");
    this.target = target;
    this.props = props;
    
    this.run();
  }

  // 아래 정의된 setup, render, setEvent 메서드를 순차적으로 호출함.
  async run() {
    await this.setup();
    await this.render();
    await this.setEvent();
  }

  // componentWillMount의 역할
  setup() {}

  // render 직후 실행할 메서드
  mounted() {}

  // 템플릿 리터럴로 DOM을 반환하는 메서드
  template() {
    return "";
  }

  // template이 반환한 DOM을 target에 그리고, mounted함수를 호출
  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
  
  // 이벤트를 바인딩
  setEvent() {}

  // state를 업데이트하는 메서드. 상태를 업데이트하면 리렌더링 되도록 설정
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

```
- 컴포넌트 단위로 개발하면서 컴포넌트의 동작을 강제하고, 유지보수를 편하게 하기 위해 core component를 작성했습니다.
- 모든 컴포넌트는 위 class를 상속받아 작성하며, 오버라이딩을 통해 메서드를 재정의합니다. 
- React 컴포넌트의 동작 방식과 유사하게 설계하였습니다.



### Toast Component

|Toast
| --- 
|![Monosnap screencast 2022-11-26 02-17-57](https://user-images.githubusercontent.com/82137004/204032328-630ae2f5-1436-4f1f-8f58-644c12e87e9a.gif)

- 선언적으로 사용할 수 있는 Toast 컴포넌트를 작성하였습니다.
- 필요한 곳에서 new Toast("text") 로 원하는 텍스트를 손쉽게 Toast로 보여줄 수 있습니다.
- 내부 로직은 다음과 같습니다.
```js
class Toast {
  constructor(text) {
    this.text = text || "확인";
    this.render();
  }

  render() {
  
    // container가 없다면 새로 생성하고, 있다면 기존의 container를 사용합니다.
    if (!qs(".toast-container")) {
      this.container = document.createElement("div");
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    } else {
      this.container = qs(".toast-container");
    }
    
    // toast로 사용할 div를 생성하고, container의 가장 상단에 insert합니다.
    this.toast = document.createElement("div");
    this.toast.className = "toast";
    this.container.insertAdjacentElement("afterbegin", this.toast);

    // toast에 들어갈 문구를 생성하고 toast에 append합니다.
    const text = document.createElement("span");
    text.innerText = this.text;
    this.toast.appendChild(text);

    // 2초 후에 DOM에서 제거합니다.
    setTimeout(() => {
      this.toast.parentNode?.removeChild(this.toast);
    }, 2000);
  }
}
```

### validation 함수

| 로그인 페이지| 회원가입 페이지
| --- | ---
|![로그인검증](https://user-images.githubusercontent.com/82137004/204030995-5e235ae3-8464-42a2-aa59-7798d5bc6ae0.gif)|![회원가입로직](https://user-images.githubusercontent.com/82137004/204031008-1508822d-5a0f-4263-b4e0-e32387fd4a48.gif)

- 총 8개의 유효섬 검사를 위한 함수를 작성하였습니다.
  - validateEmail : 이메일이 형식에 맞는지 검사
  - validateEmailVerified : 이메일을 인증하였는지 검사
  - validatePassword : 비밀번호가 형식에 맞는지 검사
  - validatePasswordConfirm : 비밀번호 확인이 비밀번호와 일치하는지 검사
  - validateNewPassword : 새 비밀번호가 현재 비밀번호와 불일치하는지 검사
  - validateName : 이름이 형식에 맞는지 검사
  - validatePhone : 전화번호가 형식에 맞는지 검사
  - validateDetailAddress : 상세주소를 입력하였는지 검사
- 모든 함수는 boolean을 반환하며, 통과하지 못할 경우 Toast와 함께 해당하는 input으로 focus를 옮깁니다.

### Form component



- input, button, AddressForm, ImageUploadForm을 선언적으로 생성할 수 있는 Form 컴포넌트를 작성하였습니다.
- getFormData 메서드를 호출하여 Form 컴포넌트에 입력된 값을 FormData로 반환받을 수 있습니다.
- 로그인, 회원가입, 결제, 주문, 주문정보수정 페이지에서 사용했습니다.
- 사용방법은 아래와 같습니다.

```js
//Form 사용방법

// 1. Form 컴포넌트를 사용하고자 하는 곳에서 어떤 유형의 input이 필요한지 객체배열로 선언.
// type에는 text, password, button, address(다음 주소 API를 활용한 주소 입력 form), image(image 업로드 form)이 있음.
  const formChildren = [
      {
        id: "example",
        title: "예시",
        type: "text",
        value: "예시입니다"
      }
    ];

// 2. 적어준 내용을 props로 전달하며 Form 컴포넌트 생성
    new Form(document.querySelector("#container"), {formChildren});

// 3. 첫 번재 인자로 넘긴 document.querySelector("#container") 하위에 아래와 같은 Form 컴포넌트가 그려짐.
   <label for="example">예시<label>
   <input id="example" type="text" name="예시" value="예시입니다" />

// 4. Form 컴포넌트는 내부에 getFormData라는 formData를 반환하는 함수를 갖고있음
// 작성한 곳에서 Form.getFormData()로 호출하여 Form이 생성하는 formData를 반환받을 수 있음.
```

<br>

## :calendar: 프로젝트 기간

- 22.10.31 ~ 22.11.12

<br>

## :construction_worker: 함께한 사람들

### 프론트엔드

|                 이상조(Leader)                  |                    김유범                             |              고나현             |         조혜인    |
| :-------------------------------------------: | :--------------------------------------------------: |:--------------------------------------------------: |:--------------------------------------------------: |
|     [@sjoleee](https://github.com/sjoleee)    |    [@ubububububub](https://github.com/ubububububub)  |   [@nahyyun](https://github.com/nahyyun)  |   [@chi0518](https://github.com/chi0518)  |

### 백엔드

|                                    김지택                                    
| :------------------------------------------------------------------------: 
|              [@Salmambo](https://github.com/Salmambo)              
