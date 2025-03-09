const ErrorIcon = ({ size = 12, color = "black" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width={size}
    height={size}
    fill={color}
  >
    <path d="M6 .5a5.5 5.5 0 1 0 0 11A5.5 5.5 0 0 0 6 .5zM6 2c.3 0 .5.2.5.5v3.5a.5.5 0 1 1-1 0V2.5c0-.3.2-.5.5-.5zm0 7.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
  </svg>
);

export { ErrorIcon };
