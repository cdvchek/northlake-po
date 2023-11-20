import MyExpenses from "./Pages/MyExpenses";
import Manage from "./Pages/Manage";
import Options from "./Pages/Options";



// PageHandler Component
export default function PageHandler({ userInfo, viewedPage, setViewedPage }) {

    // Conditional Rendering for handling different pages after login
    switch (viewedPage) {

        // My Expenses (home) Page
        case 'my-expenses':
            return <MyExpenses userInfo={userInfo} setViewedPage={setViewedPage} />;

        // Manage (admin) Page
        case 'manage':
            return <Manage userInfo={userInfo} />;

        // Options Page
        case 'options':
            return <Options userInfo={userInfo} setViewedPage={setViewedPage} />;

        // Default to My Expenses (home) Page
        default:
            return <MyExpenses userInfo={userInfo} setViewedPage={setViewedPage} />;
    }
}