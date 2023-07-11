import { Result } from 'antd'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useThemeCtx } from 'vite-pages-theme-doc'
const Component404 = () => {
	return <Result status="404" title="404 NOT FOUND" />
}

export default Component404
