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

      console.log(response.data);

      setBuku(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Data Buku</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Author</th>
            <th>Tahun</th>
            <th>Stok</th>
          </tr>
        </thead>

        <tbody>
          {buku.map((item) => (
            <tr key={item._id}>
              <td>{item.judul}</td>
              <td>{item.author}</td>
              <td>{item.tahun_terbit}</td>
              <td>{item.stok}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}