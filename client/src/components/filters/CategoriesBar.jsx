import { Chip } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'

const CategoriesBar = ({ activeCategory, setActiveCategory }) => {
    
    return (
        <Container style={{ display: "flex", flexWrap: "wrap", marginTop: "5rem" }}>
            <Chip style={{ margin: '0 0.3rem' }} onClick={() => setActiveCategory("All")} label="All" color="primary" variant={activeCategory === 'All' ? 'filled' : 'outlined'} />
            <Chip style={{ margin: '0 0.3rem' }} onClick={() => setActiveCategory("Work")} label="Work" color="primary" variant={activeCategory === 'Work' ? 'filled' : 'outlined'} />
            <Chip style={{ margin: '0 0.3rem' }} onClick={() => setActiveCategory("Study")} label="Study" color="primary" variant={activeCategory === 'Study' ? 'filled' : 'outlined'} />
            <Chip style={{ margin: '0 0.3rem' }} onClick={() => setActiveCategory("Sport")} label="Sport" color="primary" variant={activeCategory === 'Sport' ? 'filled' : 'outlined'} />
            <Chip style={{ margin: '0 0.3rem' }} onClick={() => setActiveCategory("Other")} label="Other" color="primary" variant={activeCategory === 'Other' ? 'filled' : 'outlined'} />
        </Container>
    )
}

export default CategoriesBar
