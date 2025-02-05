import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import App from "./App";
import "./index.css";

// Loader component for Suspense fallback
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
  </div>
);

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetailPage"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Wishlist = lazy(() => import("./pages/Wishlist"));
// const Profile = lazy(() => import("./pages/Profile"));
// const SignIn = lazy(() => import("./pages/SignIn"));
// const SignUp = lazy(() => import("./pages/SignUp"));
// const Contact = lazy(() => import("./pages/Contact"));
// const About = lazy(() => import("./pages/About"));

// Router configuration
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      // {
      //   path: "/cart",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Cart />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/wishlist",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Wishlist />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/profile",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Profile />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/signin",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <SignIn />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/signup",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <SignUp />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/contact",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Contact />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/about",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <About />
      //     </Suspense>
      //   ),
      // },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);