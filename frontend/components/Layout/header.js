import { getMain } from "../../apis/main.js";
import Component from "../../core/Component.js";
import style from "./layout.css" assert { type: "css" };
import { qs } from "../../utils/index.js";
document.adoptedStyleSheets.push(style);

export class Header extends Component {
  template() {
    const isLogin = !!localStorage.getItem("role");
    const isAdmin = localStorage.getItem("role") === "admin";
    const cartCount = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0;
    return `<section class="header">
            <div class="header-fix">
              <div class="header-top">
                <a href="/" class="header-logo">UnknownBox</a>
                <div class="header-top-box">
                  <ul class="header-toplist">
                    <li>
                      ${
                        !isLogin
                          ? `<a href='/login'>로그인</a>`
                          : `<a href="javascript:void(0);" id='login_logout_btn'>로그아웃</a>`
                      }
                    </li>
                    <li>
                      ${
                        !isLogin
                          ? `<a href='/signin'>회원가입</a>`
                          : `<a href='/mypage'>마이페이지</a>`
                      }
                      ${isAdmin ? `<a href='/admin'>상품 등록</a>` : ``}
                    </li>
                  </ul>
                  <ul class="header-btlist">
                    <li class="box-basket">
                        <a href="/cart" id="btn-cart" class="btn-cart">
                          <span class="s_cart_cnt"> ${cartCount}</span>
                          장바구니
                        </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="header-nav-btn">
                  <span id="btn-nav-open">MENU ></span>
              </div>
            </div>
            <nav id="side-nav" class="side-nav">
              <div class="nav-inner">
                <div class="nav-header">
                  <a href="/" class="header-logo">UnknownBox</a>
                  <span id="side-nav-close">메뉴닫기</span>
                </div>
                <ul class="">
                <span class="main-nav-title">카테고리</span>
                  <li class="menu" id="side-menu"></li>
                  <li class="menu">
                    <span class="main-nav-title">고객센터</span>
                    <div class="depth2">
                      <ul>
                          <li><a href="/qnaboard/list">Q&A 게시판</a></li>
                        </ul>
                      </div>
                    </li>
                      </ul> 
                    </div>
                  </li>
                </ul> 
              </div>
            </nav>
          </section>`;
  }
  setEvent() {
    if (qs("#login_logout_btn")) {
      qs("#login_logout_btn").addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        location.reload();
      });
    }
    qs("#btn-nav-open").addEventListener("click", () => {
      qs("#side-nav").style.left = 0;
    });

    qs("#side-nav-close").addEventListener("click", () => {
      qs("#side-nav").style.left = "-450px";
    });
  }

  mounted() {
    if (getMain()) {
      getMain().then(result => {
        result.categories.map(x => {
          qs("#side-menu").innerHTML += `
                      <div class="depth2">
                        <a href="/rank?cate=${x.categoryId}">${x.categoryName}</a>
                      </div>
                    `;
        });
      });
    }
  }
}

export default Header;
