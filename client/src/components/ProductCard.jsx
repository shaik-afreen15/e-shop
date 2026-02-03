import React from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { addToCart } from '../redux/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../redux/wishlistSlice'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const reduxUser = useSelector((state) => state.auth.user)
  const storedUser = JSON.parse(localStorage.getItem("currentUser"))
  const user = reduxUser || storedUser

  const userId = user?.id;

  const wishlist = useSelector((state) =>state.wishlist.itemsByUser[userId]) ||  [];

  const isWishlisted = wishlist.some(
   (item) => item._id === product._id
  );

  const handleWishlist = (e) => {
    e.stopPropagation()

    if (!userId) {
      toast.warning("Please login to use wishlist")
      return
    }

     if (isWishlisted) {
    toast.info("Removed from Wishlist");
  } else {
    toast.success("Added to Wishlist");
  }

  dispatch(
    toggleWishlist({
      userId,
      product,
    })
  );
};
  

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch(addToCart(product))
    toast.success("Product added to cart 🛒")
  }

  return (
    <div className='bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105'>
      
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 text-xl z-10"
      >
        <FaHeart
          className={isWishlisted ? "text-red-600" : "text-gray-300"}
        />
      </button>

      <img
        src={product.image}
        alt={product.title}
        className='w-full h-48 object-contain mb-4'
      />

      <h3 className='text-lg font-semibold'>{product.title}</h3>
      <p className='text-gray-500'>${product.price}</p>

      <div className='flex items-center mt-2'>
        <FaStar className='text-yellow-500' />
        <FaStar className='text-yellow-500' />
        <FaStar className='text-yellow-500' />
        <FaStar className='text-yellow-500' />
      </div>

      <div
        className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all duration-100'
        onClick={handleAddToCart}
      >
        <span className='group-hover:hidden'>+</span>
        <span className='hidden group-hover:block'>Add to cart</span>
      </div>
    </div>
  )
}

export default ProductCard
