import React from 'react'
import './ExpandCarousel.scss'
export default function ExpandCarousel(props) {
    function urlFromDto(dto) {
        if (dto) {
            return (`https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`)
        }
        return ''
    }


    return (
        <div className='expand-container'>
            <button onClick={props.prevHandler}>back</button>

            <div className="image-container">
                <img src={urlFromDto(props.dto)} alt="" />
            </div>
            <button onClick={props.nextHandler}>next</button>

        </div>
    )
}
