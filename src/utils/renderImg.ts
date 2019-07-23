import comment from '../public/images/comment.png'
import point from '../public/images/point.png'
import commentReview from '../public/images/commentReview.png'

const renderSwitchImg = (type) => {
  let path =''
  switch (type) {
    case 'POINT' : {
       path = point
      return {
        path,
      }
    }
    case 'COMMENT' : {
       path = comment
      return {
        path,
      }
    }
    case 'COMMENTREVIEW' : {
       path = commentReview
      return {
        path,
      }
    }
    default: {
      return path
    }
  }
}

export { renderSwitchImg as renderSwitchImg }
