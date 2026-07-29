import Image from "next/image";

export function ValuesConnector() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <Image
        src="/shapes/connection-arc.svg"
        alt=""
        width={321}
        height={84}
        className="absolute left-[22%] top-[-5.2rem] h-auto"
      />
      <Image
        src="/shapes/connection-arc.svg"
        alt=""
        width={321}
        height={84}
        className="absolute right-[22%] bottom-[-5.2rem] h-auto rotate-180 scale-x-[-1]"
      />
    </div>
  );
}
