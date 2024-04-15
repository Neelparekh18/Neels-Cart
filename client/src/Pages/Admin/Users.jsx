import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";

const Users = () => {
  return (
    <Layout title="Dashboard - All Users">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="mb-4">Manage Users Page</h1>
            <p>
              This is the page where you can manage all users in the system.
              You can perform various operations like view, edit, or delete
              users from here.
            </p>
            {/* Add your user management functionality here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
