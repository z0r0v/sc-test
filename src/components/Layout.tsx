import { Outlet, Link } from "react-router-dom";
const Layout = (): JSX.Element => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/UserList">UserList</Link>
          </li>
          <li>
            <Link to="/SendMessage">SendMessage</Link>
          </li>
          <li>
            <Link to="/SendItem">SendItem</Link>
          </li>
          <li>
            <Link to="/ManageReviews">ManageReviews</Link>
          </li>
          <li>
            <Link to="/AuditeLog">AuditeLog</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
