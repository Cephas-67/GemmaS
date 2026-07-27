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
        width={328}
        height={92}
        className="absolute left-[17%] top-[-3.75rem] h-auto w-[30%]"
      />
      <Image
        src="/shapes/connection-arc.svg"
        alt=""
        width={328}
        height={92}
        className="absolute right-[17%] top-[9.75rem] h-auto w-[30%] rotate-180"
      />
    </div>
  );
}
