import Component from "../../core/Component.js";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.js";
import {
  validateDetailAddress,
  validateName,
  validatePhone,
  qs,
  qsAll
} from "../../utils/index.js";
import Form from "../../components/Form/Form.js";
import { cart } from "../../store/cart.js";
import { getUserInfo, postPayment } from "../../apis/index.js";
import style from "./payment.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class Payment extends Component {
  async setup() {
    const userInfo = await getUserInfo();

    if (userInfo.orderPhone) {
      this.state = {
        cartList: cart.getCartList(),
        buttonEvent: this.handleClickPayment.bind(this),
        userInfo
      };

      return;
    }

    this.state = {
      cartList: cart.getCartList(),
      buttonEvent: this.handleClickPayment.bind(this)
    };
  }

  template() {
    return `<section id="payment_container">
      <h2 class="payment_title">주문 결제</h2>
      <div class="payment_content"></div>
    </section>`;
  }

  mounted() {
    const formProps = this.setUserInfo();

    new Form(qs(".payment_content"), formProps);
    new PaymentInfo(qs(".payment_content"), this.state);
  }

  handleClickPayment(event) {
    const { target } = event;
    const clickedElClassName = target.classList.value;

    if (clickedElClassName !== "paymentInfo_button") {
      return;
    }

    const products = {
      products: this.parsePaymentProductName(".paymentInfo_product-name"),
      randomboxes: this.parsePaymentProductQuantity(
        ".paymentInfo_product-quantity"
      ),
      boxesPrice: this.parsePaymentProductsPrice(".paymentInfo_product-price"),
      deliveryPrice: this.parsePaymentPriceInfo(".paymentInfo_delivery-price"),
      totalPrice: this.parsePaymentPriceInfo(".paymentInfo_total-price")
    };

    this.handleEditBtn(event, products);
  }

  parsePaymentProductName(selector) {
    return Array.from(qsAll(selector)).map(product => {
      const [productName] = product.innerText.split(",");

      return productName;
    });
  }

  parsePaymentProductQuantity(selector) {
    return Array.from(qsAll(selector)).map(product => {
      const [productQuantityText] = product.innerText.split("개");

      return {
        randombox: product.dataset.randombox,
        count: Number(productQuantityText)
      };
    }, 0);
  }

  parsePaymentProductsPrice(selector) {
    return Array.from(qsAll(selector)).map(product => {
      const [productPriceUnitText] = product.innerText.split("원");
      const productPriceText = productPriceUnitText.split(",").join("");

      return Number(productPriceText);
    }, 0);
  }

  parsePaymentPriceInfo(selector) {
    const regex = /\d/g;
    return Number(qs(selector).innerText.match(regex).join(""));
  }

  async handleEditBtn(event, products) {
    event.preventDefault();
    if (
      validateName(qs("#orderName")) &&
      validatePhone(qs("#orderPhone")) &&
      validateDetailAddress(qs("#detailAddress"))
    ) {
      await postPayment(Form.getFormData(), products);

      cart.initCartItem();
      return (window.location = "/order/recipt");
    }
  }

  setUserInfo() {
    let formProps;

    if (this.state.userInfo) {
      const formChildren = [
        {
          id: "orderName",
          title: "주문자명",
          type: "text",
          value: this.state.userInfo.orderName
        },
        {
          id: "orderPhone",
          title: "주문자 전화번호",
          type: "text",
          value: this.state.userInfo.orderPhone
        },
        { type: "address" }
      ];
      formProps = {
        formChildren,
        orderAddress: {
          postalcode: this.state.userInfo.orderAddress.postalcode,
          roadAddress: this.state.userInfo.orderAddress.roadAddress,
          jibunAddress: this.state.userInfo.orderAddress.jibunAddress,
          detailAddress: this.state.userInfo.orderAddress.detailAddress,
          extraAddress: this.state.userInfo.orderAddress.extraAddress
        }
      };
    } else {
      const formChildren = [
        {
          id: "orderName",
          title: "주문자명",
          type: "text"
        },
        {
          id: "orderPhone",
          title: "주문자 전화번호",
          type: "text"
        },
        { type: "address" }
      ];
      formProps = {
        formChildren,
        orderAddress: {
          postalcode: "",
          roadAddress: "",
          jibunAddress: "",
          detailAddress: "",
          extraAddress: ""
        }
      };
    }

    return formProps;
  }
}
