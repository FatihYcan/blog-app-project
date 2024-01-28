import { Disclosure } from "@headlessui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Disclosure as="nav" className="bg-gray-800 text-center py-2">
      <p className="text-gray-300 flex items-center justify-center">
        Developed by Fatih Ycan
      </p>
      <p className="text-gray-300 flex items-center justify-center">
        Copyright © {currentYear}
      </p>
    </Disclosure>
  );
}
