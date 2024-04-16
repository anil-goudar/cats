/* eslint-disable react/prop-types */
const CrossIcon = ({
  width = 24,
  height = 24,
  color = "currentColor",
  strokeWidth = 2,

  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      stroke={color}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M18 6L6 18M6 6l12 12' />
    </svg>
  );
};

export default CrossIcon;
