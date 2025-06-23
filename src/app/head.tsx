export default function Head() {
  return (
    <>
      <title>Groskart Admin</title>
      <meta name="description" content="Manage Groskart" />
      
      {/* Light mode favicon */}
      <link
        rel="icon"
        href="/icon/icon-light.png"
        media="(prefers-color-scheme: light)"
        type="image/png"
      />

      {/* Dark mode favicon */}
      <link
        rel="icon"
        href="/icon/icon-dark.png"
        media="(prefers-color-scheme: dark)"
        type="image/png"
      />
    </>
  );
}
