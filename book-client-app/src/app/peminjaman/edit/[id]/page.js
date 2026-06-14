"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditPeminjaman(props) {
  const router = useRouter();

  const { id } = use(props.params);

  const [buku, setBuku] = useState([]);

  const [form, setForm] = useState({
    id_buku: "",
    nama_peminjam: "",
    tanggal_pinjam: "",
    is_return: false,
  });

  const getBuku = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/buku");

      setBuku(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPeminjaman = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/peminjaman/${id}`,
      );

      const data = response.data;

      setForm({
        id_buku: data.id_buku?._id || data.id_buku || "",
        nama_peminjam: data.nama_peminjam || "",
        tanggal_pinjam: data.tanggal_pinjam?.split("T")[0] || "",
        is_return: data.is_return ?? false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuku();
    getPeminjaman();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const updateData = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/peminjaman/${id}`, form);

      alert("Peminjaman berhasil diupdate");

      router.push("/peminjaman");
    } catch (error) {
      console.log(error);
      alert("Gagal update peminjaman");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Peminjaman</h2>

      <form onSubmit={updateData}>
        <div className="mb-3">
          <label>Buku</label>

          <select
            name="id_buku"
            className="form-control"
            value={form.id_buku || ""}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Buku</option>

            {buku.map((item) => (
              <option key={item._id} value={item._id}>
                {item.judul}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Nama Peminjam</label>

          <input
            type="text"
            name="nama_peminjam"
            className="form-control"
            value={form.nama_peminjam}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Tanggal Pinjam</label>

          <input
            type="date"
            name="tanggal_pinjam"
            className="form-control"
            value={form.tanggal_pinjam}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="is_return"
            className="form-check-input"
            checked={form.is_return}
            onChange={handleChange}
          />

          <label className="form-check-label">Sudah Dikembalikan</label>
        </div>

        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
}
