import Component from "../../core/Component.js";
import { qs, qsAll } from "../../utils/index.js";
import style from "./myRandomBox.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class MyRandomBox extends Component {
  template() {
    return `<div>
                <div class="myrandombox-randomboxes-container myrandombox-container">
                    <span class="myrandombox-container-title">내 랜덤박스</span>
                </div>
                <div class="myrandombox-products-container myrandombox-container">
                    <span class="myrandombox-container-title">내가 뽑은 상품</span>
                </div>
            </div>
    `;
  }

  mounted() {
    const { randomboxes, products } = this.props;
    const myrandomboxesTemplate = randomboxes.reduce((template, randombox) => {
      template += `
                    <div class="myrandombox-item myrandombox-item-randombox" id="${randombox.orderId},${randombox.randomboxId},${randombox.newboxId}">
                      <img src="${randombox.thumbnail}"/>
                      <span class="myrandombox-item-title">${randombox.randomboxName}</span>
                    </div>`;
      return template;
    }, "");
    const myproductsTemplate = products.reduce((template, product) => {
      template += `
                      <div class="myrandombox-item" id="${product.productId}">
                        <img src="${product.thumbnail}"/>
                        <span class="myrandombox-item-title">${product.productName}</span>
                      </div>`;
      return template;
    }, "");

    qs(".myrandombox-randomboxes-container").insertAdjacentHTML(
      "beforeend",
      myrandomboxesTemplate
    );
    qs(".myrandombox-products-container").insertAdjacentHTML(
      "beforeend",
      myproductsTemplate
    );
  }

  setEvent() {
    qsAll(".myrandombox-item-randombox").forEach(qs =>
      qs.addEventListener("click", e => {
        const [orderId, randomboxId, newboxId] = e.currentTarget.id.split(",");
        window.location = `/randombox/${orderId}/${randomboxId}/${newboxId}`;
      })
    );
  }
}

export default MyRandomBox;
