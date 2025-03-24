'use client'

import { useState } from 'react'

const DeleteUserButton = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const deleteUser = async () => {
    setLoading(true)
    setError(null) 

    try {
      const response = await fetch('/api/deleteUser', {
        method: 'DELETE',
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message) 
      } else {
        const data = await response.json()
        setError(data.error) 
      }
    } catch (err) {
      console.error('Error deleting user:', err)
      setError('An error occurred while deleting the user.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={deleteUser}
        disabled={loading}
        className="bg-red-500 shadow-[3px_3px_5px_0.5px_#fff6af] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28  hover:scale-110 hover:shadow-[-3px_3px_5px_0.5px_#fff6af]"
      >
        Delete
      </button>

      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default DeleteUserButton
