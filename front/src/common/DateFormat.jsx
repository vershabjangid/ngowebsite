import React from 'react'

export default function DateFormat(ms) {
    let militime = Number(ms.value)
    let timemiliseconds = new Date(militime)

    let date = timemiliseconds.getDate();
    let month = timemiliseconds.getMonth() + 1;
    let year = timemiliseconds.getFullYear();
    return (
        <>
            {date === NaN && month === NaN && year === NaN ?
                "No Date Found" :
                date + '-' + month + '-' + year
            }
        </>
    )
}
