import React from 'react'
import { Link } from 'react-router-dom'

const Root = () => {
  return (
    <div>
        <div className="flex gap-5 justify-center my-20">
            <Link className="bg-black text-white w-fit p-3 rounded-md" to="/signup">Go to signup</Link>
            <Link className="bg-black text-white w-fit p-3 rounded-md" to="/login">Go to login</Link>
            <Link className="bg-black text-white w-fit p-3 rounded-md" to="/dashboard">Go to dashboard</Link>
        </div>
    </div>
  )
}

export default Root