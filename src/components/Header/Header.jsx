
import React from "react"
import{Container,Logo,LogoutBtn} from '../index'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



import { ShoppingCart, Sprout, User } from 'lucide-react';



function Header(){
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate()
    const navItems=[
        {
      name: 'Home',
      slug: "/",
      active: true
    }, 
        
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
    ]
    // return (<header className="py-3 shadow bg-gray-500">
    //      <Container>
    //         <nav className="flex">
    //             <div className="mr-4">
    //                 <Link to='/'>
    //                 <Logo width="70px"/>
    //                 </Link>
    //             </div>
    //             <ul className="flex ml-auto">
    //                 {navItems.map((item)=>
    //                 item.active ? (
    //                     <li key={item.name}>
    //                         <button
    //                         onClick={()=>navigate(item.slug)}
    //                         className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    //                         >{item.name}</button>
    //                     </li>
    //                 ):null
    //                 )}
    //                 {authStatus && (
    //                     <li>
    //                         <LogoutBtn/>
    //                     </li>
    //                 )}
    //             </ul>
    //         </nav>
    //     </Container>
    // </header> 
    return (
         <header className="navbar glass">
        <Container>
            <div className="container flex items-center justify-between">
        <Link to="/" className="brand flex items-center gap-2">
          <div className="logo-icon flex items-center justify-center">
            <Sprout size={24} color="white" />
            
          </div>
          <span className="brand-text">FarmDirect</span>
        </Link>
        
        <nav className="nav-links flex items-center gap-6">

            <ul className="flex ml-auto">
                   {navItems.map((item)=>
                    item.active ? (
                        <li key={item.name}>
                            <button className="nav-link"
                            onClick={()=>navigate(item.slug)}
                            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                            >{item.name}</button>
                        </li>
                    ):null
                    )}
                    {authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                </ul>
         
          
          <div className="flex items-center gap-4 border-l pl-4">
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingCart size={20} />
            </Link>
            {/* <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <User size={18} />
              Sign In
            </button> */}
          </div>
        </nav>
      </div>
        </Container>
      
    </header>
    )
   
}
export default Header;
