import React from 'react'
import { FcNumericalSorting12, FcNumericalSorting21 } from 'react-icons/fc'

const NumberSorting = ({ order }) => {
    return (
        <>
            {order === "asc" ? (
                <FcNumericalSorting12 size={22} />
            ) : (
                <FcNumericalSorting21 size={22} />
            )}
        </>
    )
}

export default NumberSorting