import React from 'react'
import Spinner from '../styledComponents/Spinner'

// Single-use styling
const styles = {
    div: {
        background:"black",
        opacity:"0.5",
        position:"fixed",
        top:"0",
        left:"0",
        width:"100%",
        height:"100%",
        display:"block",
        zIndex:"1"
    }
}

/**
 * Shows the loader/spinner
 */
const LoaderComponent = ({
    showLoading
    }) => {
        return (
        <div style= {{display: showLoading ? "block" : "none"}}>
            <div style ={styles.div}></div>
            <Spinner />
        </div>)
    };


export default LoaderComponent