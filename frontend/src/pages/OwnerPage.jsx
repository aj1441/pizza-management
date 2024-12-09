// Import necessary libraries and components for the Owner page
import ToppingsList from "../components/ToppingsList";

// Define the OwnerPage component for owners to view/manage data
const OwnerPage = () => {
// Render the structure and components of the Owner page
  return (
    <div>
      <h1>Owner's Dashboard</h1>
      <ToppingsList />
    </div>
  );
};

export default OwnerPage;
