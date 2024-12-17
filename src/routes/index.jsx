import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login";
import LazyLoad from "react-lazyload";
import Layout from "../layouts";
import ErrorPage from "../pages/error";
import ProfilePage from "../pages/profile";
import PlagiarismPage from "../pages/plagiarism";
import ClassPage from "../pages/class";
import ClassDetail from "../pages/class/details";
import CreatedForm from "../pages/class/createdClass";

const routers = createBrowserRouter([
  {
    index: true,
    element: (
      <LazyLoad>
        <LoginPage />
      </LazyLoad>
    ),
  },
  {
    path: "/user",
    element: (
      <LazyLoad>
        <Layout />
      </LazyLoad>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyLoad>
            <ProfilePage />
          </LazyLoad>
        ),
      },
      {
        path: "plagiarism",
        element: (
          <LazyLoad>
            <PlagiarismPage />
          </LazyLoad>
        ),
      },
      {
        path: "class-room",
        children: [
          {
            index: true,
            element: (
              <LazyLoad>
                <ClassPage />
              </LazyLoad>
            ),
          },
          {
            path: ":id",
            element: (
              <LazyLoad>
                <ClassDetail />
              </LazyLoad>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <LazyLoad>
        <ErrorPage />
      </LazyLoad>
    ),
  },
  {
    path: "/class-room/created",
    element: (
      <LazyLoad>
        <CreatedForm />
      </LazyLoad>
    ),
  },
]);

export default routers;
