import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className='pt-8 max-w-7xl mx-auto'>
        <Outlet></Outlet>
      </div>
      <div className='relative'>
        <Footer></Footer>
      </div>
    </div>
  )
}
