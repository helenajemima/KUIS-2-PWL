"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

export default function EditBuku(props) {
  const router = useRouter();

  const { id } = use(props.params);

  const [form, setForm] = useState({
    judul: "",
    author: "",
    tahun_terbit: "",
    stok: "",
  });

  const getBuku = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/buku/${id}`
      );

      setForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateData = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/api/buku/${id}`,
        form
      );

      alert("Data berhasil diupdate");

      router.push("/buku");
    } catch (error) {
      console.log(error);
      alert("Update gagal");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Buku</h2>

      <form onSubmit={updateData}>
        <div className="mb-3">
          <label>Judul</label>
          <input
            type="text"
            name="judul"
            className="form-control"
            value={form.judul}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={form.author}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Tahun Terbit</label>
          <input
            type="number"
            name="tahun_terbit"
            className="form-control"
            value={form.tahun_terbit}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Stok</label>
          <input
            type="number"
            name="stok"
            className="form-control"
            value={form.stok}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}