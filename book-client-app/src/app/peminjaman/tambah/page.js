"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TambahPeminjaman() {
  const router = useRouter();

  const [buku, setBuku] = useState([]);

  const [form, setForm] = useState({
    id_buku: "",
    nama_peminjam: "",
    tanggal_pinjam: "",
    is_return: false,
  });

  const getBuku = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/buku"
      );

      setBuku(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/peminjaman",
        form
      );

      alert(
        "Peminjaman berhasil ditambahkan"
      );

      router.push("/peminjaman");
    } catch (error) {
      console.log(error);
      alert("Gagal tambah data");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tambah Peminjaman</h2>

      <form onSubmit={submitData}>
        <div className="mb-3">
          <label>Buku</label>

          <select
            name="id_buku"
            className="form-control"
            value={form.id_buku}
            onChange={handleChange}
            required
          >
            <option value="">
              Pilih Buku
            </option>

            {buku.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.judul}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>
            Nama Peminjam
          </label>

          <input
            type="text"
            name="nama_peminjam"
            className="form-control"
            value={
              form.nama_peminjam
            }
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>
            Tanggal Pinjam
          </label>

          <input
            type="date"
            name="tanggal_pinjam"
            className="form-control"
            value={
              form.tanggal_pinjam
            }
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

          <label className="form-check-label">
            Sudah Dikembalikan
          </label>
        </div>

        <button className="btn btn-primary">
          Simpan
        </button>
      </form>
    </div>
  );
}