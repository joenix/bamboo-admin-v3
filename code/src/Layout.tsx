import {
  Layout as RALayout,
  CheckForApplicationUpdate,
  Breadcrumbs,
  Link,
  Typography,
  RouterLink,
  useLocation,
} from "./utils/dep";

export const Layout = ({ children }: { children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <RALayout>
      {/* 面包屑 */}
      {/* <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          padding: "20px 10px",
          background: " #fff",
          marginBottom: "10px",
        }}
      >
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography color="textPrimary" key={to}>
              {value}
            </Typography>
          ) : (
            <Link color="inherit" component={RouterLink} to={to} key={to}>
              {value}
            </Link>
          );
        })}
      </Breadcrumbs> */}
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
};
