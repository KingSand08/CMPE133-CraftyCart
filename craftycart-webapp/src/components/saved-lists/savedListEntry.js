
//get list data from DB

import Image from "next/image"
import PropTypes from 'prop-types';

SavedListEntry.propTypes = {
    title: PropTypes.string.isRequired,
    firstItem: PropTypes.string.isRequired,
    secondItem: PropTypes.string.isRequired,
    thirdItem: PropTypes.string.isRequired,
  };

  SavedListEntry.defaultProps = {
    title: "No Name",
    firstItem: "N/A",
    secondItem: "N/A",
    thirdItem: "N/A",
  }

///    SLE({ entrydata,   })

export default function SavedListEntry({ title, firstItem, secondItem, thirdItem }) {
    return (
        <div>
            <div className = " m-2 p-4 w-96 flex flex-row grow box-border rounded-md shadow-md bg-[color:var(--white)] text-[color:var(--black)]">
                <div className = "flex flex-col grow m-4">
                    <p className = "text-green-500 text-4xl my-4">{title}</p>

                    <li className = "mx-2">{firstItem}</li>
                    <li className = "mx-2">{secondItem}</li>
                    <li className = "mx-2">{thirdItem}</li>   
                </div>
        
                <button className = "mx-4 mb-10"><Image src = "/plus.svg" width="60" height="60"></Image></button> 
            </div>
        </div>
    )
}