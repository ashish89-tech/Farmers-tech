

import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { Search, Filter, ShoppingCart, Container } from "lucide-react";
import '../App.css'


function PostCard({ $id, title, feturedImage }) {
  // console.log("feturedImage:", feturedImage);

  return (
    //     <div className="marketplace container">
    //   <div className="marketplace-header flex items-center justify-between">
    //     <h1>Fresh Produce Marketplace</h1>
    //     <div className="search-bar flex items-center">

    //     </div>
    //   </div>
    //     <Link to={`/post/${$id}`}>
    //         <div className='w-full bg-gray-100 rounded-xl p-4'>
    //             <div className='w-full justify-center mb-4'>
    //                 {feturedImage ? (   // ✅ only call getFilePreview if feturedImage exists
    //                     <img
    //                         src={appwriteService.getFilePreview(feturedImage)}
    //                         alt={title}
    //                         className='rounded-xl'
    //                     />
    //                 ) : (
    //                     <div className='w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center'>
    //                         <p className='text-gray-500'>No Image</p>
    //                     </div>
    //                 )}
    //             </div>
    //             <h2 className='text-xl font-bold'>{title}</h2>
    //         </div>
    //     </Link>
    //     </div>
    <>
      
      <div>
        <div className="marketplace container ">
            
          

          {/* Card */}
          <Link to={`/post/${$id}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer max-w-sm">
              {/* Image */}
              <div className="w-full h-48 bg-white">
                {feturedImage ? (
                  <img
                    src={appwriteService.getFilePreview(feturedImage)}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fresh & organic produce
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostCard;
