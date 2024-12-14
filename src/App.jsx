import { RouterProvider } from "react-router-dom"
import routers from "./routes"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <RouterProvider router={routers}/>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        theme="light"
        limit={1}
      />
    </>
  )
}

export default App
