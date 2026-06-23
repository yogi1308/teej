export default function UnderlineSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" {...props}>
      <path d="M200-120v-80h560v80H200Zm280-160q-100 0-170-70t-70-170v-320h100v320q0 58 41 99t99 41q58 0 99-41t41-99v-320h100v320q0 100-70 170t-170 70Z" />
    </svg>
  );
}
