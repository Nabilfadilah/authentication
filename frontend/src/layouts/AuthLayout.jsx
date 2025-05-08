export default function AuthLayout({children}) {
  // digunakan untuk halaman yang tidak butuh sidebar/navbar (seperti login/register)
  return <div>{children}</div>;
}
