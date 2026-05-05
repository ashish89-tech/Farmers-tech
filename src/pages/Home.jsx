import React , {useEffect,useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, TrendingUp, ShieldCheck } from 'lucide-react';
import './Home.css'


function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

     
  
    // if (posts.length === 0) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to read posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
    return (
         <div className="home   bg-[#FAFAF8] min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in-up mt-8 md:mt-0">
            <h1 className="hero-title ">Fresh from the Farm,<br/>Direct to Your Table.</h1>
            <p className="hero-subtitle">
              Skip the middlemen. Farmers get higher profits, and you get the freshest produce at better prices.
            </p>
            <div className="hero-actions flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/all-posts" className="btn btn-primary w-full sm:w-auto">
                Shop Fresh Produce
                <ArrowRight size={18} />
              </Link>
              <Link to="/DashBoard" className="btn btn-outline w-full sm:w-auto" style={{ backgroundColor: 'white' }}>
                I am a Farmer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container py-12 md:py-20 px-6">
        <h2 className="text-center text-3xl md:text-5xl font-serif text-primary mb-8 md:mb-12">Why Choose FarmDirect?</h2>
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon"><TrendingUp size={32} color="var(--color-primary)" /></div>
            <h3>Fair Prices & Higher Profits</h3>
            <p>Farmers earn up to 40% more by eliminating wholesale intermediaries, while buyers enjoy farm-gate prices.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon"><Leaf size={32} color="var(--color-primary)" /></div>
            <h3>Peak Freshness</h3>
            <p>Produce travels straight from the soil to your kitchen, ensuring maximum nutrition and taste.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon"><ShieldCheck size={32} color="var(--color-primary)" /></div>
            <h3>Transparent & Secure</h3>
            <p>Know exactly who grew your food and how. Secure payments guarantee trust on both sides.</p>
          </div>
        </div>
      </section>
    </div>
    )
}

export default Home