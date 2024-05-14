// Components
import MyJobsNav from "components/organisms/MyJobsNav/MyJobsNav";
// Router
import { Outlet } from "react-router-dom";

const MyJobs = () => {
    return (
        <section>
            <MyJobsNav />
            <article>
                <Outlet />
            </article>
        </section>
    );
};

export default MyJobs;
