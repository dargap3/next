import "./global.css";

export default function Layout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {props.modal}
        {props.children}
      </body>
    </html>
  );
}
