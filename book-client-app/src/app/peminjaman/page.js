"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PeminjamanPage() {
  const [peminjaman, setPeminjaman] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/peminjaman");

      console.log(response.data);

      setPeminjaman(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusPeminjaman = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/peminjaman/${id}`);

      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Data Peminjaman</h2>

      <Link href="/peminjaman/tambah" className="btn btn-primary mb-3">
        Tambah Peminjaman
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nama Peminjam</th>
            <th>ID Buku</th>
            <th>Tanggal Pinjam</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {peminjaman.length > 0 ? (
            peminjaman.map((item) => (
              <tr key={item._id}>
                <td>{item.nama_peminjam}</td>

                <td>
                  <div>
                    <strong>{item.id_buku?.judul}</strong>
                    <br />
                    <small>{item.id_buku?.author}</small>
                  </div>
                </td>

                <td>{new Date(item.tanggal_pinjam).toLocaleDateString()}</td>

                <td>{item.is_return ? "Sudah Kembali" : "Belum Kembali"}</td>

                <td>
                  <Link
                    href={`/peminjaman/edit/${item._id}`}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => hapusPeminjaman(item._id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Belum ada data peminjaman
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
