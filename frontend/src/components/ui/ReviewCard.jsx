import { Card, CardContent } from '@/components/ui/shadcn/card'
import ReviewHeader from './ReviewHeader'
import ReviewFooter from './ReviewFooter'

const ReviewContentText = ({ review }) => {
    return <p className='ml-5 mb-7 mr-5 text-gray-700 text-sm'>{review.review}</p>
}

const ReviewContentGrid = ({ review }) => {
    return (
        <div
            className={`p-4 grid gap-2 ${
                review.media.length === 1
                    ? 'grid-cols-2' // Still allow two columns even if there's one image
                    : review.media.length === 2
                      ? 'grid-cols-2'
                      : 'grid-cols-2 sm:grid-cols-4'
            }`}
        >
            {review.media.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    width={400} //  to 150
                    height={300} // Set fixed height to 300
                    className='rounded-lg object-cover'
                />
            ))}
        </div>
    )
}

const Review = ({
    review,
    isEditReviewDialogOpen,
    isDeleteReviewDialogOpen,
    setIsDeleteReviewDialogOpen,
    setIsEditReviewDialogOpen,
    currentReview,
    setCurrentReview,
    handleEditReview,
    handleDeleteReview
}) => {
    return (
        <Card key={review._id} className='mb-6 p-5'>
            <ReviewHeader review={review} />
            <CardContent>
                <ReviewContentText review={review} />
                {review.media.length > 0 && <ReviewContentGrid review={review} />}
            </CardContent>
            <ReviewFooter
                isDeleteReviewDialogOpen={isDeleteReviewDialogOpen}
                isEditReviewDialogOpen={isEditReviewDialogOpen}
                currentReview={currentReview}
                review={review}
                // setters
                setCurrentReview={setCurrentReview}
                setIsDeleteReviewDialogOpen={setIsDeleteReviewDialogOpen}
                setIsEditReviewDialogOpen={setIsEditReviewDialogOpen}
                handleDeleteReview={handleDeleteReview}
                handleEditReview={handleEditReview}
            />
        </Card>
    )
}

export default Review
