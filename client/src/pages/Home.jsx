import React, { useEffect } from 'react'
import HeroImage from '../assets/Images/HeroImage.png'
import InfoSection from '../components/InfoSection'
import CategorySection from '../components/CategorySection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/ProductSlice'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom' 

const Home = () => {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts()) 
  }, [dispatch])

  return (
    <div className='bg-white mt-2 px-4 md:px-6 lg:px-10'>

      <div className='container mx-auto py-4 flex flex-col md:flex-row space-x-2'>
        <div className='w-full md:9/12 mt-8 md:mt-0 h-96 relative'>
          <img src={HeroImage} alt="Hero" className='h-full w-full object-cover' />
          <div className='absolute top-16 left-8'>
            <p className='text-gray-600 mb-4'>HELLO,</p>
            <h2 className='text-3xl font-bold'>WELCOME TO E-SHOP</h2>
            <p className='text-xl mt-2.5 font-bold text-gray-800'>
              MILLIONS+ PRODUCTS
            </p>
            <Link
              to="/shop"
              className='inline-block bg-red-600 px-8 py-1.5 text-white mt-4 hover:bg-red-700 transition-transform duration-300 hover:scale-105'
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <InfoSection />
      <CategorySection />

      {/* TOP PRODUCTS */}
      <div className='container mx-auto py-12'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Top Products</h2>

        {loading ? (
          <p className='text-center'>Loading...</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer'>
            {items.slice(0, 5).map(product => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
      
      <div className="text-center mt-3 mb-3">
        <Link to="/shop" className="text-red-600 font-semibold hover:underline">
             View All Products →
        </Link>
      </div>

    </div>
  )
}

export default Home
