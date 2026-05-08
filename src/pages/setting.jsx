import React from 'react'
import { useSelector } from 'react-redux'
import { LogoutBtn } from '../components'

function Setting() {
    const userData=useSelector((state)=>state.auth.userData)
  return (
    <div className="rounded-2xl bg-[#e8d9c0] p-6 shadow-lg border border-gray-100">
  
  <h2 className="mb-6 text-2xl font-bold text-gray-800">
    ⚙️ Account Settings
  </h2>

  <div className="space-y-4">

    <div className="rounded-xl bg-[#f3ebde]  p-4">
      <p className="text-sm text-gray-500">Name</p>
      <h3 className="text-lg font-semibold text-gray-800">
        {userData?.name || "Not Available"}
      </h3>
    </div>

    <div className="rounded-xl bg-[#f3ebde] p-4">
      <p className="text-sm text-gray-500">Email</p>
      <h3 className="text-lg font-semibold text-gray-800">
        {userData?.email || userData?.emailVerification || "Not Available"}
      </h3>
    </div>

    <div className="rounded-xl bg-[#f3ebde] p-4">
      <p className="text-sm text-gray-500">User ID</p>
      <h3 className="text-lg font-semibold text-gray-800 break-all">
        {userData?.$id || "Not Available"}
      </h3>
    </div>

    <div className="rounded-xl bg-[#f3ebde] p-4">
      <p className="text-sm text-gray-500">Phone</p>
      <h3 className="text-lg font-semibold text-gray-800">
        {userData?.phone || "Not Available"}
      </h3>
    </div>

    <div className="rounded-xl bg-[#f3ebde] p-4">
      <p className="text-sm text-gray-500">Account Status</p>

      <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
        Active
      </span>
      
    </div>
    <div className="rounded-xl bg-[#f3ebde] p-4">
      <LogoutBtn/>
    </div>
  </div>
</div>
  )
}

export default Setting