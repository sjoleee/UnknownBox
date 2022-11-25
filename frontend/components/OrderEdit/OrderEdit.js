import Form from "../Form/Form.js";
import Component from "../../core/Component.js";
import {
  validateDetailAddress,
  validateName,
  validatePhone,
  qs
} from "../../utils/index.js";
import { getOrderInfo, putOrderInfo } from "../../apis/index.js";
import style from "./orderEdit.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class OrderEdit extends Component {
  template() {
    const item = this.state;
    return `<H1>주문자 정보수정</H1>
            <div class="orderedit-edit-container">
              <div class="orderedit-shipping-container"></div>
              <button class="orderedit-edit-btn form_btn">수정 완료</button>
            </div>
            `;
  }

  mounted() {
    const formChildren = [
      {
        id: "orderName",
        title: "주문자명",
        type: "text",
        value: this.state.orderName
      },
      {
        id: "orderPhone",
        title: "주문자 전화번호",
        type: "text",
        value: this.state.orderPhone
      },
      { type: "address" }
    ];
    const formProps = {
      formChildren,
      orderAddress: this.state.orderAddress
    };
    new Form(qs(".orderedit-shipping-container"), formProps);
  }

  async setup() {
    const data = await getOrderInfo(this.props);
    this.state = data;
  }

  setEvent() {
    qs(".orderedit-edit-btn").addEventListener("click", e => {
      this.handleEditBtn(e);
    });
  }

  handleEditBtn(e) {
    e.preventDefault();
    if (
      validateName(qs("#orderName")) &&
      validatePhone(qs("#orderPhone")) &&
      validateDetailAddress(qs("#detailAddress"))
    ) {
      putOrderInfo(Form.getFormData(), this.props);
    }
  }
}

export default OrderEdit;
