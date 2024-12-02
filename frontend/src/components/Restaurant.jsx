import RestaurantHeader from '@/components/ui/RestaurantPage/RestaurantHeader';
import ReviewSection from '@/components/ui/RestaurantPage/ReviewSection';
import AmenitiesSection from '@/components/ui/RestaurantPage/Amenities';
import { Separator } from "@/components/ui/shadcn/separator";
import { Button } from "@/components/ui/shadcn/button";
import { MapPin, Phone, Globe, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from "@/components/Header";
import Review from './ui/ReviewCard'
import ReviewDialog from './ui/ReviewDialog';


const Restaurant = () => {
  const { id } = useParams();  

  const url = import.meta.env.VITE_PRODUCTION === "true" ? import.meta.env.VITE_PRODUCTION_BACKEND_URL : import.meta.env.VITE_BACKEND_URL
  
  const [isEditReviewDialogOpen, setIsEditReviewDialogOpen] = useState(false)
  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState([])

  const [restaurant, setRestaurant] = useState(null);  // State for a single restaurant
  const [reviews, setReviews] = useState(null);  // State for a single restaurant
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleEditReview = (id, newContent) => {
    setReviews(
        reviews.map((review) => (review.id === id ? { ...review, content: newContent, editedAt: new Date().toISOString() } : review))
    )
    setIsEditReviewDialogOpen(false)
  }

  const handleDeleteReview = (id) => {
      setReviews(reviews.filter((review) => review.id !== id))
      setIsDeleteReviewDialogOpen(false)
  }



  const fetchRestaurant = async () => {
    try {
      console.log('Fetching restaurant...');
      const response = await fetch(`${url}/api/restaurants/${id}`);
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Received data:', data);
        setRestaurant(data);
        setReviews(data.reviews)
        
      } else {
        console.error('Failed to fetch restaurant:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    } 
  };
  

  useEffect(() => {
    if (!restaurant) {
      fetchRestaurant();
      setIsAuthenticated(localStorage.getItem('token') ? true : false)
    }

  }, []); 

  useEffect(() => {
    if (restaurant) {
      console.log('Updated restaurant reviews:', reviews);
      console.log('Updated restaurant reviews:', reviews.length);
    }
  }, [reviews]); // This effect will run whenever the `restaurant` state is updated
  
  console.log('Current restaurant state:', restaurant);

  return (
    <div>
      <Header/>
      <main className="min-h-screen bg-white">
        {restaurant ? (
          <>
            <RestaurantHeader restaurant={restaurant} reviewCount={restaurant.reviews.length} />
            <div className="max-w-5xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Recommended Reviews</h2>
                    {/* Conditionally render the "Write a Review" button based on auth status */}
                    <Button onClick={() => setIsEditReviewDialogOpen(true)} disabled={!isAuthenticated}>Write a Review</Button>
                  </div>
                  <ReviewSection
                    rating={restaurant.averageRating}
                    reviewCount={restaurant.reviews.length}
                    reviews={reviews}
                  />
                  <Separator className="my-8" />
                  <AmenitiesSection amenities={restaurant.amenities} />
                  <Separator className="my-8" />
                  <h2 className='text-2xl font-bold mb-4'>Reviews</h2>

                  {
                    reviews && reviews.length > 0 ? (
                      reviews.map((review) => (
                        <Review
                            key={review._id} // Make sure to include a unique key for each review
                            isEditReviewDialogOpen={isEditReviewDialogOpen}
                            setIsEditReviewDialogOpen={setIsEditReviewDialogOpen}
                            isDeleteReviewDialogOpen={isDeleteReviewDialogOpen}
                            setIsDeleteReviewDialogOpen={setIsDeleteReviewDialogOpen}
                            currentReview={currentReview}
                            setCurrentReview={setCurrentReview}
                            handleEditReview={handleEditReview}
                            handleDeleteReview={handleDeleteReview}
                            review={review}
                        />
                      ))
                    ) : (
                      <p>No reviews available.</p>
                    )
                  }
                </div>

                <div>
                  <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Restaurant Info</h2>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-2 mt-1 text-gray-600" />
                        <p>{restaurant.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-gray-600" />
                        <p>{restaurant.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-gray-600" />
                        <a href={restaurant.website} className="text-blue-600 hover:underline">{restaurant.website}</a>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 mr-2 mt-1 text-gray-600" />
                        <p>{restaurant.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Render placeholders or empty elements while waiting for the data
          <>
            <RestaurantHeader restaurant={{}} />
            <div className="max-w-5xl mx-auto px-4 py-8">
              <p>Loading content...</p>
            </div>
          </>
        )}
      </main>

        {/* Add the ReviewDialog component */}
        <ReviewDialog
        isOpen={isEditReviewDialogOpen}
        onClose={() => setIsEditReviewDialogOpen(false)}
        onSave={(newReview) => {
          setReviews([...reviews, newReview]);  
          setIsEditReviewDialogOpen(false);  
        }}
        dialogType="add"
        restaurantId={id}  
      />

    </div>
  );
};

export default Restaurant;
