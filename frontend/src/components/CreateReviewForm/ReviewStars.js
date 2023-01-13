import { useState } from "react"
import { AiFillStar } from "react-icons/ai"

const ReviewStars = ({ stars, setStars }) => {
  
  // variable to trigger hover status on stars
  const [hover, setHover] = useState(null)

  return (
    <div className="stars-wrapper">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1

        return (
          <label>
            <input
              type="radio"
              name="rating"
              className="rating-radio"
              value={ratingValue}
              onClick={()=>setStars(ratingValue)}
            />
            <AiFillStar
              className="star"
              color={ ratingValue <= (hover||stars) ? "#040505":"#e4e5e9"}
              size={20}
              onMouseEnter={()=>setHover(ratingValue)}
              onMouseLeave={()=>setHover(null)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default ReviewStars;
