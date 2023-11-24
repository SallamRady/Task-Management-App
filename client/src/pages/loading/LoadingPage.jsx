import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingPage = () => {
    return (
        <div style={{ width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </div>
    )
}

export default LoadingPage
