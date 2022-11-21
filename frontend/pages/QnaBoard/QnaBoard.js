import QnaList from "../../components/QnaList/QnaList.js";
import QnaWrite from "../../components/QnaWrite/QnaWrite.js";
import QnaView from "../../components/QnaView/QnaView.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class QnaBoard extends Component {
  template() {
    return `
        <section class="qnaboard-title">
            <h2>Q&A 게시판</h2>
            <h5>자유롭게 문의 남겨주세요~</h5>
        </section>
        <section id="qna-container"></section>`;
  }

  mounted() {
    if (this.props[0] === "list") {
      new QnaList(qs("#qna-container"));
    } else if (this.props[0] === "write") {
      new QnaWrite(qs("#qna-container"));
    } else {
      new QnaView(qs("#qna-container"));
    }
  }
}
