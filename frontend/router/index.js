import { Admin } from "../pages/Admin/Admin.js";
import { AdminRandomBox } from "../pages/AdminRandomBox/AdminRandomBox.js";
import { AdminOrder } from "../pages/AdminOrder/AdminOrder.js";
import { AdminOrderEdit } from "../pages/AdminOrderEdit/AdminOrderEdit.js";
import { AdminProduct } from "../pages/AdminProduct/AdminProduct.js";
import { AdminQna } from "../pages/AdminQna/AdminQna.js";
import { Cart } from "../pages/Cart/Cart.js";
import { Detail } from "../pages/Detail/Detail.js";
import { Login } from "../pages/Login/Login.js";
import { KakaoCallback } from "../pages/KakaoCallback/KakaoCallback.js";
import { Main } from "../pages/Main/Main.js";
import { MyOrder } from "../pages/MyOrder/MyOrder.js";
import { MyOrderEdit } from "../pages/MyOrderEdit/MyOrderEdit.js";
import { MyPage } from "../pages/MyPage/MyPage.js";
import { NotFound } from "../pages/NotFound/NotFound.js";
import { Payment } from "../pages/Payment/Payment.js";
import { Recipt } from "../pages/Recipt/Recipt.js";
import { SignIn } from "../pages/SignIn/SignIn.js";
import { RandomBox } from "../pages/RandomBox/RandomBox.js";
import { QnaBoard } from "../pages/QnaBoard/QnaBoard.js";
import { Rank } from "../pages/Rank/Rank.js";

const routes = [
  { path: "/", view: Main, isPublic: true },
  { path: "/signin", view: SignIn, isPublic: true },
  { path: "/login", view: Login, isPublic: true },
  { path: "/login/kakao/callback", view: KakaoCallback, isPublic: true },
  { path: "/mypage", view: MyPage, isPublic: false },
  { path: "/mypage/order", view: MyOrder, isPublic: false },
  { path: "/mypage/order/:id", view: MyOrderEdit, isPublic: false },
  { path: "/detail/:id", view: Detail, isPublic: true },
  { path: "/cart", view: Cart, isPublic: true },
  { path: "/order/payment", view: Payment, isPublic: false },
  { path: "/order/recipt", view: Recipt, isPublic: false },
  { path: "/qnaboard/:mode", view: QnaBoard, isPublic: true },
  { path: "/rank", view: Rank, isPublic: true },
  { path: "/admin", view: Admin, isPublic: false, isAdmin: true },
  {
    path: "/admin/randombox",
    view: AdminRandomBox,
    isPublic: false,
    isAdmin: true
  },
  {
    path: "/admin/product",
    view: AdminProduct,
    isPublic: false,
    isAdmin: true
  },
  { path: "/admin/order", view: AdminOrder, isPublic: false, isAdmin: true },
  {
    path: "/admin/order/:id",
    view: AdminOrderEdit,
    isPublic: false,
    isAdmin: true
  },
  { path: "/admin/qna", view: AdminQna, isPublic: true, isAdmin: true },
  { path: "/qnaboard", view: QnaBoard, isPublic: true },
  {
    path: "/randombox/:orderId/:randomboxId/:newboxId",
    view: RandomBox,
    isPublic: false
  },
  { path: "/404", view: NotFound, isPublic: true }
];

export default routes;
