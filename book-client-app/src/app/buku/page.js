"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BukuPage() {
  const [buku, setBuku] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/buku"
      );

      setBuku(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusBuku = async (id) => {
    const konfirmasi = confirm(
      "Yakin ingin menghapus buku?"
    );

    if (!konfirmasi) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/buku/${id}`
      );

      alert("Buku berhasil dihapus");

      getData();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus buku");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Data Buku</h2>

        <Link
          href="/buku/tambah"
          className="btn btn-primary"
        >
          Tambah Buku
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Author</th>
            <th>Tahun</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {buku.length > 0 ? (
            buku.map((item) => (
              <tr key={item._id}>
                <td>{item.judul}</td>
                <td>{item.author}</td>
                <td>{item.tahun_terbit}</td>
                <td>{item.stok}</td>

                <td>
                  <Link
                    href={`/buku/edit/${item._id}`}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      hapusBuku(item._id)
                    }
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center"
              >
                Belum ada data buku
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}