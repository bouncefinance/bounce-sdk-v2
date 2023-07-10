import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useThemeCtx } from 'vite-pages-theme-doc'
const Component404 = () => {
	// return <Navigate to="/" replace />
	const data = useThemeCtx()
	const n = useNavigate()
	return 404
}

export default Component404
