import React from 'react'
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from 'react-icons/fc'

const StringSorting = ({ order }) => {
    return (
        <>
            {order === "asc" ? (
                <FcAlphabeticalSortingAz size={22} />
            ) : (
                <FcAlphabeticalSortingZa size={22} />
            )}
        </>
    )
}

export default StringSorting