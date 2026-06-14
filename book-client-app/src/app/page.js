import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Sistem Peminjaman Buku
      </h1>

      <div className="d-flex justify-content-center gap-3">
        <Link
          href="/buku"
          className="btn btn-primary"
        >
          Kelola Buku
        </Link>

        <Link
          href="/peminjaman"
          className="btn btn-success"
        >
          Kelola Peminjaman
        </Link>
      </div>
    </div>
  );
}