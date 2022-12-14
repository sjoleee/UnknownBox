import Component from "../../core/Component.js";

export default class QnaItem extends Component {
  template() {
    const { boardNum, qnaboardId, title, author, createdAt } = this.props;
    return `
            <tr onclick="location.href='/qnaboard/view?qnaboardId=${qnaboardId}'">
                <td>${boardNum }</td>
                <td>${title} 🔒</td>
                <td>${author}</td>
                <td>${createdAt.slice(0, 10)}</td>
            </tr>
        `;
  }

  render() {
    this.target.innerHTML += this.template();
  }
}
