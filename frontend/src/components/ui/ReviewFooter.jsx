import { Button } from '@/components/ui/shadcn/button'
import { CardFooter } from '@/components/ui/shadcn/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/shadcn/dialog'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { MessageCircle, Edit, Trash2 } from 'lucide-react'

const ReviewFooter = ({
    review,
    currentReview,
    isDeleteReviewDialogOpen,
    isEditReviewDialogOpen,
    setIsDeleteReviewDialogOpen,
    setIsEditReviewDialogOpen,
    setCurrentReview,
    handleDeleteReview,
    handleEditReview
}) => {
    return (
        <CardFooter className='flex justify-between'>
            <div className='flex items-center gap-2'>
                <MessageCircle className='w-4 h-4' />
                <span className='text-sm text-gray-600'>{review.replies.length} replies</span>
            </div>
            <div className='flex gap-2'>
                <Dialog open={isEditReviewDialogOpen} onOpenChange={setIsEditReviewDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant='outline' size='sm' onClick={() => setCurrentReview(review)}>
                            <Edit className='w-4 h-4 mr-1' /> Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Review</DialogTitle>
                        </DialogHeader>
                        <Textarea
                            value={currentReview?.content}
                            onChange={(e) => setCurrentReview({ ...currentReview, content: e.target.value })}
                            rows={6}
                        />
                        <DialogFooter>
                            <Button onClick={() => handleEditReview(currentReview.id, currentReview.content)}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={isDeleteReviewDialogOpen} onOpenChange={setIsDeleteReviewDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setCurrentReview(review)}
                            className='border-red-500 text-red-700 '
                        >
                            <Trash2 className='w-4 h-4 mr-1' /> Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Review</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to delete this review? This action cannot be undone.</p>
                        <DialogFooter>
                            <Button variant='outline' onClick={() => setIsDeleteReviewDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant='destructive' onClick={() => handleDeleteReview(currentReview.id)}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </CardFooter>
    )
}

export default ReviewFooter
