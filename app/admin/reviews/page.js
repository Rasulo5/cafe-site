import ReviewsManager from "@/components/admin/ReviewsManager";
import { reviews } from "@/data/reviews";

export default function AdminReviewsPage() {
  return <ReviewsManager initialReviews={reviews} />;
}