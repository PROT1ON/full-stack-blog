import Navbar from "./Components/Navbar"
import MainLayout from "./layout/mainLayout"
import HomePage from "./routes/HomePage"

const App = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-24 '>
      {/* NAVBAR */}
      <MainLayout />
      <HomePage />
     
    </div>
  )
}

export default App