import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (res && res.data?.success) {
        toast.success(res.data.message);
        setName("");
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Something went wrong in input form"
      );
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/getAll-categories");
      if (res && res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          "Something went wrong while getting categories"
      );
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          "Something went wrong while updating category"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/category/delete-category/${id}`);
      if (res && res.data.success) {
        toast.success(res.data.message);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          "Something went wrong while deleting category"
      );
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="mb-4">Manage Categories</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => {
                            setVisible(true),
                              setUpdatedName(c.name),
                              setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
      >
        <div className="p-3">
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
