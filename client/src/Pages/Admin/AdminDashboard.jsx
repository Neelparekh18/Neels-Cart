import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h3>Admin Profile</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Admin Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={auth?.user?.name}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Admin Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          value={auth?.user?.email}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Admin Contact:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={auth?.user?.mobile}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
