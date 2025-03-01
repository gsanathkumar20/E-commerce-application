import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout-confirmation",
        element: <CheckoutConfirmation />,
      },
    ],
  },
]);

export default Routes;

// import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
// import HomePage from "./pages/HomePage";
// import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/CartPage";
// import CheckoutConfirmation from "./pages/CheckoutConfirmation";

// const Routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "product/:productId",
//         element: <ProductPage />,
//       },
//       {
//         path: "cart",
//         element: <CartPage />,
//       },
//       {
//         path: "checkout-confirmation",
//         element: <CheckoutConfirmation />,
//       },
//     ],
//   },
// ]);

// export default Routes;

// // import { createBrowserRouter } from "react-router-dom";
// // import App from "./App";
// // import HomePage from "./pages/HomePage";
// // import ProductPage from "./pages/ProductPage";
// // import CartPage from "./pages/CartPage";
// // import CheckoutConfirmation from "./pages/CheckoutConfirmation";

// // const Routes = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <App />,
// //     children: [
// //       {
// //         index: true,
// //         element: <HomePage />,
// //       },
// //       {
// //         index: true,
// //         path: "product/:productId",
// //         element: <ProductPage />,
// //       },
// //       {
// //         path: "cart",
// //         element: <CartPage />,
// //       },
// //       {
// //         path: "checkout-confirmation",
// //         element: <CheckoutConfirmation />,
// //       },
// //     ],
// //   },
// // ]);

// // export default Routes;
