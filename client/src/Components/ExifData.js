import React from 'react'

const ExifData = ({make, focalLength, location, model, iso, speed, width, height, aperture, date, views}) => {
    return (
        <>
            <ul>
                <li className="options-btn">
                    Make: {make ? make : "-"}
                </li>

                <li className="options-btn">
                    Focal Length: {focalLength ? focalLength : "-"}
                </li>

                <li className="options-btn">
                    Model: {model ? model : "-"}
                </li>

                <li className="options-btn">
                    ISO: {iso ? iso : "-"}
                </li>

                <li className="options-btn">
                    Shutter Speed: {speed ? `${speed}s` : "-"}
                </li>

                <li className="options-btn">
                    Dimensions: {`${width} x ${height}`}
                </li>

                <li className="options-btn">
                    Aperture: {aperture ? `f/${aperture}` : "-"}
                </li> 
                
                <li className="options-btn">
                    Date: {date ? date.toLocaleDateString() : "-"}
                </li>

                <li className="options-btn">
                    Views: {views ? views.toLocaleString() : "-"}
                </li>
            </ul>

            <div className={`${location ? "show-location" : "hide-location"}`}>
                <i className="fas fa-globe-americas" style={{marginRight: "2px"}}></i> {location ? location : ""}
            </div>

        </>
    )
}

export default ExifData
