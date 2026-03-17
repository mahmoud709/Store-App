import React from 'react'

const LodderSpinner = () => {
  return (
     <div className="flex items-center justify-center w-full min-h-screen">
        <div
           className="border-4 border-gray-300 border-t-black rounded-full animate-spin"
           style={{ width: 40, height: 40 }}
        />
     </div>  )
}

export default LodderSpinner