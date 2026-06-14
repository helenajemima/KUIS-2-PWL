"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TambahBuku() {
  const router = useRouter();

  const [form, setForm] = useState({
    judul: "",
    author: "",
    tahun_terbit: "",
    stok: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/buku",
        form
      );

      alert("Buku berhasil ditambahkan");

      router.push("/buku");
    } catch (error) {
      console.log(error);
      alert("Gagal tambah buku");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tambah Buku</h2>

      <form onSubmit={submitData}>
        <div className="mb-3">
          <label>Judul</label>
          <input
            type="text"
            name="judul"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Tahun Terbit</label>
          <input
            type="number"
            name="tahun_terbit"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Stok</label>
          <input
            type="number"
            name="stok"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}